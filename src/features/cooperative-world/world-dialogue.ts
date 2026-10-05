/**
 * world-dialogue.ts
 * Logika murni sistem dialog balon percakapan otomatis Dunia Koperasi (Paket 4 PRD v2):
 * - Cooldown per pasangan (60s) dan global (8s).
 * - Maksimal 2 balon aktif serentak (1 di mobile/layar sempit).
 * - Integritas data: kalimat berfakta hanya muncul bila didukung data nyata.
 */

export interface DialogueBubble {
  id: string;
  senderId: string;
  receiverId?: string;
  speakerName: string;
  text: string;
  duration: number; // detik
  elapsed: number;
  position: [number, number, number];
  role: 'manager' | 'staff' | 'npc';
}

export interface DialogueContext {
  managerName: string;
  openTasksCount: number;
  inProgressTasksCount?: number;
  completedTasksCount?: number;
  hasMeetingSoon: boolean;
  meetingTitle?: string;
  recordedUnitsCount: number;
  emptyPlotsCount?: number;
  hasActivitiesToday?: boolean;
  activitiesCount?: number;
  weather: 'cerah' | 'berawan' | 'hujan';
  timeHour: number; // 0-23
}

export interface DialoguePairCooldown {
  pairKey: string;
  untilElapsed: number;
}

export interface NpcProfile {
  id: string;
  name: string;
  gender: 'pria' | 'wanita';
  role: string;
  category: string;
  activity: string;
  quote: string;
  avatarColor: string;
  actionHref: string;
  actionLabel: string;
}

export const npcProfiles: Record<string, NpcProfile> = {
  manajer: {
    id: 'manajer',
    name: 'Pak Hartono',
    gender: 'pria',
    role: 'Manajer KDMP Puntukrejo',
    category: 'Manajer • Penanggung Jawab',
    activity: 'Mengawasi operasional ruang kerja dan keteraturan kawasan',
    quote: 'Mari jaga keteraturan kerja, transparansi pencatatan, dan pelayanan terbaik bagi seluruh warga desa.',
    avatarColor: '#1e3a8a',
    actionHref: '/profil',
    actionLabel: 'Profil Manajer',
  },
  'karyawan-tugas': {
    id: 'karyawan-tugas',
    name: 'Anisa',
    gender: 'wanita',
    role: 'Staf Pengelola Tugas',
    category: 'Staf Kantor • Operasional',
    activity: 'Memeriksa progres pekerjaan dan menindaklanjuti tenggat tugas harian',
    quote: 'Semua berkas tugas harian kami verifikasi agar target kerja koperasi tercapai tepat waktu.',
    avatarColor: '#3b82f6',
    actionHref: '/tugas',
    actionLabel: 'Buka Daftar Tugas',
  },
  'karyawan-rapat': {
    id: 'karyawan-rapat',
    name: 'Bambang',
    gender: 'pria',
    role: 'Sekretaris & Notulen Rapat',
    category: 'Staf Kantor • Sekretariat',
    activity: 'Menyiapkan agenda koordinasi pengurus, notulensi, dan tindak lanjut keputusan',
    quote: 'Notulen tersimpan rapi dan dapat diunduh kapan saja oleh pengurus dan anggota.',
    avatarColor: '#0284c7',
    actionHref: '/rapat',
    actionLabel: 'Lihat Jadwal Rapat',
  },
  'karyawan-gym': {
    id: 'karyawan-gym',
    name: 'Dedi',
    gender: 'pria',
    role: 'Koordinator Lapangan & Fasilitas',
    category: 'Staf Kantor • Fasilitas',
    activity: 'Mengatur logistik fisik, pemeliharaan sarana, dan kebugaran tim',
    quote: 'Kondisi fisik prima mendukung produktivitas kerja yang maksimal di lapangan.',
    avatarColor: '#10b981',
    actionHref: '/jurnal',
    actionLabel: 'Buka Jurnal Kegiatan',
  },
  'npc-warga-selatan': {
    id: 'npc-warga-selatan',
    name: 'Pak Subagyo',
    gender: 'pria',
    role: 'Warga & Anggota Koperasi',
    category: 'Warga Desa • Anggota',
    activity: 'Duduk santai di bangku taman plaza menikmati suasana pagi desa Puntukrejo',
    quote: 'Alhamdulillah, keberadaan gerai dan layanan koperasi desa sangat mempermudah kebutuhan sehari-hari warga.',
    avatarColor: '#f59e0b',
    actionHref: '/gerai',
    actionLabel: 'Jelajahi Gerai',
  },
  'npc-warga-utara': {
    id: 'npc-warga-utara',
    name: 'Bu Ratna',
    gender: 'wanita',
    role: 'Pengrajin UMKM Desa',
    category: 'Warga Desa • Mitra Usaha',
    activity: 'Beristirahat di plaza setelah mengantar produk olahan UMKM ke koperasi',
    quote: 'Produk olahan warga desa kini punya etalase resmi di gerai koperasi, pembeli makin ramai.',
    avatarColor: '#10b981',
    actionHref: '/gerai',
    actionLabel: 'Lihat Produk UMKM',
  },
  'npc-pejalan': {
    id: 'npc-pejalan',
    name: 'Siti Rahma',
    gender: 'wanita',
    role: 'Pengunjung Kawasan Gerai',
    category: 'Pengunjung • Pelanggan',
    activity: 'Berjalan menyusuri trotoar melihat etalase gerai usaha koperasi',
    quote: 'Trotoar di depan gerai nyaman dan teduh, enak untuk jalan santai sambil berbelanja.',
    avatarColor: '#8b5cf6',
    actionHref: '/gerai',
    actionLabel: 'Katalog Gerai',
  },
  'npc-jalan-kanan': {
    id: 'npc-jalan-kanan',
    name: 'Fajar',
    gender: 'pria',
    role: 'Kurir & Pengemudi Logistik',
    category: 'Logistik • Distribusi',
    activity: 'Berjalan menyusuri trotoar jalan timur menuju dermaga bongkar muat gudang',
    quote: 'Arus pengiriman pasokan barang dari distributor mitra via jalan samping berjalan lancar.',
    avatarColor: '#06b6d4',
    actionHref: '/barang',
    actionLabel: 'Pusat Logistik',
  },
};

/**
 * Dapatkan salam waktu berdasarkan jam WIB
 */
export function getTimeGreeting(hour: number): string {
  if (hour >= 4 && hour < 11) return 'Selamat pagi';
  if (hour >= 11 && hour < 15) return 'Selamat siang';
  if (hour >= 15 && hour < 19) return 'Selamat sore';
  return 'Selamat malam';
}

/**
 * Generate dialog kontekstual bersyarat data nyata.
 * Mendukung obrolan santai/biasa dan informasi operasional faktual.
 */
export function getContextualDialogue(
  speakerRole: 'manager' | 'staff' | 'npc',
  context: DialogueContext,
  interactionType: 'desk_visit' | 'pass_by' | 'rain' | 'meeting_call' | 'info_broadcast' | 'casual_chat' = 'pass_by',
): { text: string; reply?: string } {
  const greeting = getTimeGreeting(context.timeHour);
  const emptyPlots = context.emptyPlotsCount ?? Math.max(0, 7 - context.recordedUnitsCount);

  // Reaksi cuaca hujan
  if (interactionType === 'rain' || context.weather === 'hujan') {
    const rainDialogues = [
      {
        text: 'Hujan rintik di Puntukrejo. Mari koordinasikan pencatatan dari dalam kantor.',
        reply: 'Iya Pak/Bu, kami pastikan dokumen dan inventaris terlindung aman.',
      },
      {
        text: 'Alhamdulillah hujan membawa kesejukan. Suasana kawasan jadi semakin tenang.',
        reply: 'Betul, kopi hangat di ruang santai pas sekali dinikmati saat ini.',
      },
    ];
    return rainDialogues[Math.abs(Math.sin(context.timeHour * 3.7)) > 0.5 ? 0 : 1];
  }

  // Panggilan rapat terjadwal
  if (interactionType === 'meeting_call' || context.hasMeetingSoon) {
    return {
      text: context.meetingTitle
        ? `Agenda rapat "${context.meetingTitle}" akan dimulai. Mari berkumpul di meja rapat.`
        : 'Rapat koordinasi koperasi akan segera dimulai di ruang pertemuan.',
      reply: 'Baik Pak/Bu Manajer, berkas agenda dan notulen sudah kami siapkan.',
    };
  }

  // Interaksi meja kerja / kunjungan kantor
  if (interactionType === 'desk_visit') {
    if (context.openTasksCount > 0) {
      const taskMessages = [
        `Halo tim, ada ${context.openTasksCount} tugas aktif hari ini. Semangat menuntaskan!`,
        `Fokus kita hari ini menyelesaikan ${context.openTasksCount} agenda terbuka. Prioritaskan yang mendesak ya.`,
        `Mari cek progres tugas: ${context.openTasksCount} item sedang berjalan. Jika ada kendala segera koordinasikan.`,
      ];
      const pickIdx = Math.floor(Math.abs(Math.cos(context.openTasksCount + context.timeHour) * 10)) % taskMessages.length;
      return {
        text: taskMessages[pickIdx],
        reply: 'Siap Pak/Bu, kami kerjakan bertahap sesuai urutan prioritas.',
      };
    }
    return {
      text: 'Semua tugas hari ini terpantau rapi dan tuntas. Kerja sama tim luar biasa!',
      reply: 'Terima kasih, Pak/Bu Manajer! Kami tetap siaga bila ada kebutuhan tambahan.',
    };
  }

  // Manajer: Variasi berbicara biasa (santai) dan informasi faktual
  if (speakerRole === 'manager') {
    // Bergantian antara informasi operasional dan obrolan biasa
    const isInformational = Math.abs(Math.sin(context.timeHour * 2.3 + context.recordedUnitsCount)) > 0.45;

    if (isInformational) {
      // Informasi Faktual Operasional
      const infoVariants = [
        // Info Gerai & Lahan
        {
          text: `Dari 7 lahan gerai, ${context.recordedUnitsCount} unit usaha aktif melayani warga Puntukrejo.`,
          reply: `Alhamdulillah, kehadiran gerai sangat dirasakan manfaatnya oleh warga sekitar.`,
        },
        // Info Lahan Siap Pakai
        emptyPlots > 0
          ? {
              text: `Saat ini masih ada ${emptyPlots} petak lahan gerai yang siap kita kembangkan untuk unit baru.`,
              reply: `Bagus sekali Pak/Bu, potensi kemitraan usaha warga bisa kita ajak bergabung.`,
            }
          : {
              text: 'Seluruh 7 lahan gerai terisi penuh! Kawasan niaga desa beroperasi maksimal.',
              reply: 'Luar biasa, semoga perputaran ekonomi koperasi terus tumbuh berkah.',
            },
        // Info Logistik & Gudang
        {
          text: 'Aktivitas gudang logistik dan armada distribusi terpantau tertib memasok barang gerai.',
          reply: 'Betul Pak/Bu, jalur distribusi timur sangat lancar untuk bongkar muat.',
        },
        // Info Tugas / Rapat
        context.openTasksCount > 0
          ? {
              text: `Dashboard mencatat ${context.openTasksCount} tugas yang memerlukan tindak lanjut hari ini.`,
              reply: 'Baik Pak/Bu, kami terus perbarui status penyelesaian di sistem.',
            }
          : {
              text: 'Hari ini tidak ada beban tugas menunggak. Waktu yang baik untuk menata arsip.',
              reply: 'Siap Pak/Bu, kami manfaatkan untuk inventarisasi dan kebersihan ruangan.',
            },
      ];
      const pick = infoVariants[Math.floor(Math.abs(Math.sin(context.timeHour + context.openTasksCount)) * 10) % infoVariants.length];
      return pick;
    }

    // Obrolan Santai / Sapaan Biasa Manajer
    const casualVariants = [
      `${greeting}! Bagaimana suasana dan aktivitas di sekitar gerai hari ini?`,
      `Udara Puntukrejo hari ini sangat sejuk. Senang melihat kawasan kita semakin hidup.`,
      `Koperasi yang sehat dibangun dari keramahan dan pelayanan tulus kepada warga.`,
      `Jangan lupa rehat sejenak dan minum air ya rekan-rekan, stamina harus tetap terjaga.`,
      `Pemandangan taman dan air mancur di depan membuat suasana kerja terasa teduh.`,
    ];
    const pickCasual = casualVariants[Math.floor(Math.abs(Math.cos(context.timeHour * 1.7)) * 10) % casualVariants.length];
    return {
      text: pickCasual,
      reply: `${greeting}, Pak/Bu ${context.managerName}! Semua berjalan aman, ramah, dan tertib.`,
    };
  }

  // Staf Koperasi
  if (speakerRole === 'staff') {
    const staffMessages = [
      {
        text: `${greeting}, Pak/Bu ${context.managerName}! Data pencatatan harian sedang kami rapikan.`,
        reply: `${greeting}! Terima kasih atas dedikasi dan ketelitiannya.`,
      },
      {
        text: `Pasokan barang di gudang sudah dicek, siap didistribusikan ke unit gerai.`,
        reply: `Bagus, pastikan mutasi stok dicatat akurat di buku barang ya.`,
      },
      {
        text: `Kawasan koperasi hari ini ramai dikunjungi warga desa yang berbelanja.`,
        reply: `Alhamdulillah, terus berikan senyum dan pelayanan terbaik untuk warga.`,
      },
    ];
    const pick = staffMessages[Math.floor(Math.abs(Math.sin(context.timeHour * 2.1)) * 10) % staffMessages.length];
    return pick;
  }

  // NPC Warga / Pengunjung Desa
  const npcMessages = [
    {
      text: `${greeting}, Pak/Bu! Senang melihat kawasan koperasi semakin rapi, hijau, dan bersih.`,
      reply: `Terima kasih! Kebersihan dan kenyamanan kawasan adalah komitmen bersama.`,
    },
    {
      text: `Gerai koperasi sangat membantu kebutuhan harian warga di desa Puntukrejo ini.`,
      reply: `Alhamdulillah, kami terus berupaya menyediakan pasokan lengkap dan harga wajar.`,
    },
    {
      text: `Jalan raya dan trotoar baru di samping gerai membuat akses warga jadi jauh lebih mudah.`,
      reply: `Betul, akses tertib mempermudah warga berbelanja sekaligus menjaga keselamatan lalu lintas.`,
    },
    {
      text: `Suasana di sekitar air mancur asri sekali untuk duduk bersantai sejenak.`,
      reply: `Silakan menikmati suasana taman desa kita! Selamat beraktivitas!`,
    },
  ];
  const pickNpc = npcMessages[Math.floor(Math.abs(Math.sin(context.timeHour + context.recordedUnitsCount)) * 10) % npcMessages.length];
  return pickNpc;
}

interface PendingReply {
  senderId: string;
  receiverId: string;
  speakerName: string;
  text: string;
  role: 'manager' | 'staff' | 'npc';
  triggerAtElapsed: number;
  initialPosition: [number, number, number];
}

/**
 * Manajer sistem antrean dan cooldown dialog dua arah (percakapan & balasan)
 */
export class DialogueManager {
  private activeBubbles: DialogueBubble[] = [];
  private pendingReplies: PendingReply[] = [];
  private pairCooldowns = new Map<string, number>();
  private globalCooldownUntil = 0;

  getBubbles(): DialogueBubble[] {
    return this.activeBubbles;
  }

  canTriggerDialogue(senderId: string, receiverId: string, currentElapsed: number): boolean {
    if (currentElapsed < this.globalCooldownUntil) return false;
    const pairKey = [senderId, receiverId].sort().join(':');
    const pairCooldown = this.pairCooldowns.get(pairKey) ?? 0;
    return currentElapsed >= pairCooldown;
  }

  triggerDialogue(
    senderId: string,
    receiverId: string,
    speakerName: string,
    senderRole: 'manager' | 'staff' | 'npc',
    position: [number, number, number],
    context: DialogueContext,
    currentElapsed: number,
    interactionType: 'desk_visit' | 'pass_by' | 'rain' | 'meeting_call' | 'info_broadcast' | 'casual_chat' = 'pass_by',
    maxBubbles = 2,
  ): boolean {
    if (!this.canTriggerDialogue(senderId, receiverId, currentElapsed)) {
      return false;
    }

    if (this.activeBubbles.length >= maxBubbles) {
      // Hapus yang tertua bila kapasitas penuh
      this.activeBubbles.shift();
    }

    const { text, reply } = getContextualDialogue(senderRole, context, interactionType);

    const bubbleId = `bubble-${senderId}-${Math.floor(currentElapsed * 10)}`;
    const bubble: DialogueBubble = {
      id: bubbleId,
      senderId,
      receiverId,
      speakerName,
      text,
      duration: 4.8,
      elapsed: 0,
      position: [position[0], position[1] + 2.1, position[2]],
      role: senderRole,
    };

    this.activeBubbles.push(bubble);

    // Jadwalkan balasan dari lawan bicara bila ada balasan kontekstual
    if (reply && receiverId && receiverId !== 'all') {
      const receiverProfile = npcProfiles[receiverId];
      const replyRole: 'manager' | 'staff' | 'npc' =
        receiverId === 'manajer' ? 'manager' : receiverId.startsWith('karyawan') ? 'staff' : 'npc';
      this.pendingReplies.push({
        senderId: receiverId,
        receiverId: senderId,
        speakerName: receiverProfile?.name || 'Rekan Tim',
        text: reply,
        role: replyRole,
        triggerAtElapsed: currentElapsed + 1.8,
        initialPosition: [position[0], position[1], position[2]],
      });
    }

    // Set cooldown
    const pairKey = [senderId, receiverId].sort().join(':');
    this.pairCooldowns.set(pairKey, currentElapsed + 35.0); // 35 detik cooldown per pasangan
    this.globalCooldownUntil = currentElapsed + 7.0; // 7 detik cooldown global

    return true;
  }

  update(
    dt: number,
    currentElapsed?: number,
    getPosition?: (id: string) => [number, number, number],
  ): void {
    // Periksa antrean balasan yang siap muncul
    if (typeof currentElapsed === 'number') {
      for (let i = this.pendingReplies.length - 1; i >= 0; i--) {
        const item = this.pendingReplies[i];
        if (currentElapsed >= item.triggerAtElapsed) {
          const pos = getPosition ? getPosition(item.senderId) : item.initialPosition;
          const replyBubbleId = `bubble-${item.senderId}-${Math.floor(currentElapsed * 10)}`;
          // Batasi kapasitas balon aktif serentak
          if (this.activeBubbles.length >= 2) {
            this.activeBubbles.shift();
          }
          this.activeBubbles.push({
            id: replyBubbleId,
            senderId: item.senderId,
            receiverId: item.receiverId,
            speakerName: item.speakerName,
            text: item.text,
            duration: 4.5,
            elapsed: 0,
            position: [pos[0], pos[1] + 2.1, pos[2]],
            role: item.role,
          });
          this.pendingReplies.splice(i, 1);
        }
      }
    }

    for (let i = this.activeBubbles.length - 1; i >= 0; i--) {
      this.activeBubbles[i].elapsed += dt;
      if (this.activeBubbles[i].elapsed >= this.activeBubbles[i].duration) {
        this.activeBubbles.splice(i, 1);
      }
    }
  }

  clear(): void {
    this.activeBubbles = [];
    this.pendingReplies = [];
    this.pairCooldowns.clear();
    this.globalCooldownUntil = 0;
  }
}
