export interface CatalogueDTO {
  id: number;
  authors: [];
  genres: [];
  isbn: string;
  book_title: string;
  cover: string;
}

export interface CatalogueTable {
  id: number;
  authors: string;
  genres: string;
  isbn: string;
  book_title: string;
  cover: string;
}

export interface CatalogueResponse {
  catalogue: CatalogueDTO[];
  totalCount: number;
}
