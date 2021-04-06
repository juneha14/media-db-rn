export interface PaginatedResponse<R> {
  page: number;
  totalPages: number;
  results: R;
  totalResults: number;
}
