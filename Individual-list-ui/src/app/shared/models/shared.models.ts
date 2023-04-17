export interface PagedData<T> {
  total: number;
  page: number;
  pageSize: number;
  previousPage: number;
  nextPage: number;
  data: T[];
}
