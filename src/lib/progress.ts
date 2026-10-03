import type { Task, Checklist } from '@/features/schemas';
export function subtaskProgress(subtasks: readonly { done: boolean }[]): number {
  return subtasks.length
    ? Math.round((subtasks.filter((item) => item.done).length / subtasks.length) * 100)
    : 0;
}
export function taskProgress(task: Pick<Task, 'status' | 'subtasks'>): number {
  if (task.status === 'selesai') return 100;
  if (task.status === 'dibatalkan') return 0;
  return subtaskProgress(task.subtasks);
}
export function planProgress(tasks: Pick<Task, 'status'>[]): number {
  const active = tasks.filter((item) => item.status !== 'dibatalkan');
  return active.length
    ? Math.round((active.filter((item) => item.status === 'selesai').length / active.length) * 100)
    : 0;
}
export function readiness(items: Pick<Checklist, 'required' | 'status'>[]): number | null {
  const required = items.filter((item) => item.required);
  return required.length
    ? Math.round(
        (required.filter((item) => item.status === 'selesai').length / required.length) * 100,
      )
    : null;
}
export function scopeProgress(tasks: Pick<Task, 'status' | 'subtasks'>[]): number {
  const active = tasks.filter((task) => task.status !== 'dibatalkan');
  return active.length
    ? Math.round(active.reduce((sum, task) => sum + taskProgress(task), 0) / active.length)
    : 0;
}
export function isOverdue(task: Pick<Task, 'status' | 'due_date'>, date: string) {
  return (
    !!task.due_date && !['selesai', 'dibatalkan'].includes(task.status) && task.due_date < date
  );
}
export function dependencyConflict(task: Task, tasks: Task[]) {
  return task.dependencies.some((id) => {
    const dependency = tasks.find((item) => item.id === id);
    return (
      !dependency ||
      dependency.status !== 'selesai' ||
      (!!task.start_date && dependency.due_date >= task.start_date)
    );
  });
}
