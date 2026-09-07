export function slugFromPath(path: string | null | undefined): string {
  return (path ?? '').split('/').filter(Boolean).pop() ?? ''
}
