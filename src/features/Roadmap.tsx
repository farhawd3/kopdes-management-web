'use client';
import { useState } from 'react';
import type { Workspace } from './useWorkspace';
import { TaskTimeline } from './TaskTimeline';
import { Records } from './Records';
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
          Proyek
          <select value={project} onChange={(event) => setProject(event.target.value)}>
            <option value="">Semua proyek</option>
            {data.workstreams?.map((row) => (
              <option value={row.id} key={row.id}>
                {String(row.data.title)}
              </option>
            ))}
          </select>
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
