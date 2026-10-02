export function makeTaskCode(title: string, uniqueId: string) {
  const activity =
    title
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9 ]/g, ' ')
      .trim()
      .split(/\s+/)[0]
      ?.slice(0, 5)
      .toUpperCase() || 'TUGAS';
  return `${activity}-${uniqueId.replace(/-/g, '').slice(0, 12).toUpperCase()}`;
}
