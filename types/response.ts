export interface ReturnMany<T> {
  success: boolean
  items: T[]
  count?: number
  message?: string
}

export interface ReturnOne<T> {
  success: boolean
  item: T
  message?: string
}
