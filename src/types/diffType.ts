export type DiffType = 'file' | 'directory'

export interface DiffRes {
  diffPath: string
  type: DiffType
}