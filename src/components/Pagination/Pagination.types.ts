export type PaginationProps = {
  current: number;
  pageSize: number;
  total: number;
  onClick: (index: number) => void;
};
