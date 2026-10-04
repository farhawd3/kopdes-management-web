import type { Item } from '../schemas';

export function isProjectHistory(project: Item): boolean {
  return ['selesai', 'diarsipkan'].includes(String(project.data.status));
}
