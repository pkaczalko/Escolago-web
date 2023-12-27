export interface Catalogue {
  id: number;
  isbn: string;
  authors: {};
  genre: {};
  date: Date;
  status: {};
  cover: string;
  shelf: {};
}

export interface CatalogueResponse {
  catalogue: Catalogue[];
  totalRecords: number;
}
