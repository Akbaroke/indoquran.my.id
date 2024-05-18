export interface OptionHaditsModel {
  name: string;
  slug: string;
  total: number;
}

export interface HaditsDetailModel {
  name: string;
  slug: string;
  total: number;
  pagination: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    startPage: number;
    endPage: number;
    startIndex: number;
    endIndex: number;
    pages: number[];
  };
  items: ItemsHaditsType[];
}

export type ItemsHaditsType = {
  number: number;
  arab: string;
  id: string;
};