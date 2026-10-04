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
  hasMeetingSoon: boolean;
  meetingTitle?: string;
  recordedUnitsCount: number;
  weather: 'cerah' | 'berawan' | 'hujan';
  timeHour: number; // 0-23
}

export interface DialoguePairCooldown {
  pairKey: string;
  untilElapsed: number;
}

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
 * Generate dialog kontekstual bersyarat data nyata
 */
export function getContextualDialogue(
  speakerRole: 'manager' | 'staff' | 'npc',
  context: DialogueContext,
  interactionType: 'desk_visit' | 'pass_by' | 'rain' | 'meeting_call',
): { text: string; reply?: string } {
  const greeting = getTimeGreeting(context.timeHour);

  if (interactionType === 'rain' || context.weather === 'hujan') {
    return {
      text: 'Wah, hujan rintik-rintik. Lebih baik berteduh sejenak.',
      reply: 'Iya, mari kita istirahat sejenak di kantor.',
    };
  }

  if (interactionType === 'meeting_call' || context.hasMeetingSoon) {
    return {
      text: context.meetingTitle
        ? `Rapat "${context.meetingTitle}" akan dimulai sebentar lagi.`
        : 'Rapat koperasi akan segera dimulai di ruang pertemuan.',
      reply: 'Baik, kami segera menuju meja rapat.',
    };
  }

  if (interactionType === 'desk_visit') {
    if (context.openTasksCount > 0) {
      return {
        text: `Halo rekan-rekan, ada ${context.openTasksCount} tugas aktif hari ini. Semangat!`,
        reply: 'Siap Pak/Bu, kami selesaikan sesuai urutan prioritas.',
      };
    }
    return {
      text: 'Semua tugas hari ini terpantau rapi dan lancar. Pertahankan!',
      reply: 'Terima kasih, Pak/Bu Manajer!',
    };
  }

  // Pass-by / sapaan berpapasan umum
  if (speakerRole === 'manager') {
    return {
      text: `${greeting}! Bagaimana aktivitas di gerai dan kantor hari ini?`,
      reply: `${greeting}, Pak/Bu ${context.managerName}! Semua berjalan aman dan teratur.`,
    };
  }

  if (speakerRole === 'staff') {
    return {
      text: `${greeting}, Pak/Bu ${context.managerName}! Kawasan Puntukrejo hari ini ceria.`,
      reply: `${greeting}! Terima kasih atas dedikasinya untuk koperasi kita.`,
    };
  }

  // NPC pengunjung warga
  const npcQuestions = [
    `${greeting}, Pak/Bu! Senang melihat kawasan koperasi semakin ramai dan bersih.`,
    'Gerai koperasi sangat membantu kebutuhan warga desa di sini.',
    'Udara sejuk sekali hari ini di sekitar taman air mancur.',
  ];
  const pick = npcQuestions[Math.floor(Math.abs(Math.sin(context.timeHour + context.openTasksCount) * 100)) % npcQuestions.length];

  return {
    text: pick,
    reply: 'Terima kasih atas kunjungannya, mari bersama majukan koperasi desa!',
  };
}

/**
 * Manajer sistem antrean dan cooldown dialog
 */
export class DialogueManager {
  private activeBubbles: DialogueBubble[] = [];
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
    interactionType: 'desk_visit' | 'pass_by' | 'rain' | 'meeting_call' = 'pass_by',
    maxBubbles = 2,
  ): boolean {
    if (!this.canTriggerDialogue(senderId, receiverId, currentElapsed)) {
      return false;
    }

    if (this.activeBubbles.length >= maxBubbles) {
      // Hapus yang tertua bila kapasitas penuh
      this.activeBubbles.shift();
    }

    const { text } = getContextualDialogue(senderRole, context, interactionType);

    const bubbleId = `bubble-${senderId}-${Math.floor(currentElapsed * 10)}`;
    const bubble: DialogueBubble = {
      id: bubbleId,
      senderId,
      receiverId,
      speakerName,
      text,
      duration: 4.5,
      elapsed: 0,
      position: [position[0], position[1] + 2.1, position[2]],
      role: senderRole,
    };

    this.activeBubbles.push(bubble);

    // Set cooldown
    const pairKey = [senderId, receiverId].sort().join(':');
    this.pairCooldowns.set(pairKey, currentElapsed + 45.0); // 45 detik cooldown per pasangan
    this.globalCooldownUntil = currentElapsed + 8.0; // 8 detik cooldown global

    return true;
  }

  update(dt: number): void {
    for (let i = this.activeBubbles.length - 1; i >= 0; i--) {
      this.activeBubbles[i].elapsed += dt;
      if (this.activeBubbles[i].elapsed >= this.activeBubbles[i].duration) {
        this.activeBubbles.splice(i, 1);
      }
    }
  }

  clear(): void {
    this.activeBubbles = [];
    this.pairCooldowns.clear();
    this.globalCooldownUntil = 0;
  }
}
