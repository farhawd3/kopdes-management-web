'use client';
import { useState } from 'react';
import type { Workspace } from './useWorkspace';
import { TaskTimeline } from './TaskTimeline';
import { Records } from './Records';
import { Select } from '@/components/ui/Select';
export function Roadmap({ data, refresh }: { data: Workspace; refresh: () => Promise<void> }) {
  const [project, setProject] = useState('');
  return (
    <>
      <div className="module-intro">
        <div>
          <h2>Rencana yang mengikuti cara Anda bekerja.</h2>
          <p>Atur tanggal, hubungan antarpekerjaan, dan milestone dalam satu garis waktu.</p>
        </div>
        <label>
          <span>Proyek</span>
          <Select
            value={project}
            onChange={setProject}
            options={[
              { value: '', label: 'Semua Proyek' },
              ...(data.workstreams || []).map((row) => ({
                value: row.id,
                label: String(row.data.title),
              })),
            ]}
            ariaLabel="Proyek"
          />
        </label>
      </div>
      <TaskTimeline
        key={project}
        items={(data['work-items'] || []).filter(
          (row) => !project || row.data.workstream_id === project,
        )}
        workspace={data}
        refresh={refresh}
        scopeId={project || undefined}
      />
      <div className="milestone-section">
        <Records
          entity="milestones"
          workspace={data}
          refresh={refresh}
          scopeId={project || undefined}
        />
      </div>
    </>
  );
}
