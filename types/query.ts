export interface CommonQuery {
  page?: number
  pageSize?: number
  search?: string
  filter?: Record<string, unknown>
}
