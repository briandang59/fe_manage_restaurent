export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

// Type cho API response thực tế
export interface ApiPagination {
  page: number;
  page_size: number;
  total: number;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T[];
  pagination: ApiPagination;
} 