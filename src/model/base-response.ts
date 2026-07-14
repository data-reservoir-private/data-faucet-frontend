export type BaseResponse<T> = {
  message: string,
  data: T,
  statusCode: number
}
export type BasePaginationResponse<T> = BaseResponse<T[]> & {
  currentPage: number,
  pageSize: number,
  totalData: number,
  data: T[]
}
export type BadRequestResponse = BaseResponse<Record<string, string[]>>;