export interface HttpResponse<T> {
  code: number;
  msg: string;
  data: T;
}

export interface PageResult<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
}

export interface PageInfinite<T> {
  items: T[];
  size: number;
  page: number;
  has_more: boolean;
  next_cursor: number;
}
