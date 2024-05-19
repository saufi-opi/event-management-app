export interface CommonQuery {
  page?: number
  pageSize?: number
  search?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter?: Record<string, any>
}
