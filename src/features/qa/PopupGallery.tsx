'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Editor } from '../Editor';
import { TaskDetailDrawer } from '../tasks/TaskDetailDrawer';
import { SprintModal } from '../projects/SprintModal';
import { RecursiveScheduleModal } from '../tasks/RecursiveScheduleModal';
import { ManagerActionModal } from '@/components/layout/ManagerActionModal';
import { Records } from '../Records';
import { Dashboard } from '../dashboard/Dashboard';
import { Reports } from '../reports/Reports';
import { reportSnapshot } from '../reports/report-snapshot';
import { popupEntities, popupLabels, popupWorkspace } from './popup-fixtures';
import type { Entity } from '../schemas';
const sampleReports = [{ id: 'qa-report', title: 'Laporan contoh pemeriksaan', period_start: '2026-10-01', period_end: '2026-10-04', snapshot: { ...reportSnapshot(popupWorkspace, '2026-10-01', '2026-10-04'), notes: 'Catatan contoh pemeriksaan', status: 'draft' as const } }];

export function PopupGallery() {
  const [entity, setEntity] = useState<Entity>('work-items');
  const [popup, setPopup] = useState('');
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const previous = { dark: root.classList.contains('dark'), theme: root.getAttribute('data-theme'), colorScheme: root.style.colorScheme };
    root.classList.toggle('dark', dark);
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    root.style.colorScheme = dark ? 'dark' : 'light';
    return () => {
      root.classList.toggle('dark', previous.dark);
      root.style.colorScheme = previous.colorScheme;
      if (previous.theme === null) root.removeAttribute('data-theme'); else root.setAttribute('data-theme', previous.theme);
    };
  }, [dark]);
  const close = () => setPopup('');
  return <main className="ui-gallery">
    <h1>Pemeriksaan popup</h1>
    <p>Data contoh lokal. Semua permintaan API pada halaman ini diblokir; tidak ada penyimpanan database.</p>
    <Button onClick={() => setDark(!dark)}>{dark ? 'Tema terang' : 'Tema gelap'}</Button>
    <Select ariaLabel="Domain contoh" value={entity} onChange={value => setEntity(value as Entity)} options={popupEntities.map(value => ({value, label: popupLabels[value]}))} />
    <div className="ui-gallery-row">
      {['Tambah', 'Ubah', 'Tugas cepat', 'Detail tugas', 'Sprint baru', 'Sprint terisi', 'Jadwal berulang', 'Pusat aksi', 'Daftar dan CSV', 'Dashboard dan rutinitas', 'Laporan terisi'].map(label => <Button key={label} onClick={() => setPopup(label)}>{label}</Button>)}
    </div>
    {(popup === 'Tambah' || popup === 'Ubah' || popup === 'Tugas cepat') && <Editor
      entity={popup === 'Tugas cepat' ? 'work-items' : entity}
      item={popup === 'Ubah' ? popupWorkspace[entity]?.[0] : undefined}
      workspace={popupWorkspace} quick={popup === 'Tugas cepat'} draftScope="qa-popup"
      onClose={close} onSaved={async () => {}} />}
    {popup === 'Detail tugas' && <TaskDetailDrawer task={popupWorkspace['work-items']![0]} workspace={popupWorkspace} onClose={close} onUpdated={async () => {}} onPrev={() => {}} onNext={() => {}} onFullEdit={() => setPopup('Ubah')} onDelete={() => {}} />}
    {(popup === 'Sprint baru' || popup === 'Sprint terisi') && <SprintModal sprint={popup === 'Sprint terisi' ? popupWorkspace.sprints?.[0] : undefined} onClose={close} onSaved={async () => {}} />}
    {popup === 'Jadwal berulang' && <RecursiveScheduleModal currentType="mingguan" onClose={close} onSave={() => {}} />}
    <ManagerActionModal open={popup === 'Pusat aksi'} onClose={close} />
    {popup === 'Daftar dan CSV' && <Records entity={entity} workspace={popupWorkspace} refresh={async () => {}} scopeId="qa-popup" />}
    {popup === 'Dashboard dan rutinitas' && <Dashboard data={popupWorkspace} preferenceScope="qa-popup:" />}
    {popup === 'Laporan terisi' && <Reports previewReports={sampleReports} />}
  </main>;
}
