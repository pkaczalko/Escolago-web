export interface BookResponseDTO {
  id: number;
  authors: AuthorDTO[];
  genres: GenreDTO[];
  isbn: string;
  book_title: string;
  published_year: number;
  publisher: string;
  virtual: boolean;
  cover: string;
  language: string;
  pages: number;
  description: string;
  copies: BookCopyDTO[];
}
export interface UserDTO {
  id: number;
  name: string;
  surname: string;
}

export interface GenreDTO {
  id: number;
  name: string;
  englishName: string;
}

export interface LoanDTO {
  id: number;
  dateOfRental: Date;
  user: UserDTO;
}

export interface AuthorDTO {
  id: number;
  name: string;
}

export interface BookCopyDTO {
  id: number;
  link?: string;
  date_added: Date;
  rented: boolean;
  loan?: LoanDTO;
}
export interface BookInfoEdit {
  id: number;
  authors: string;
  genres: string;
  isbn: string;
  book_title: string;
  published_year: number;
  publisher: string;
  virtual: boolean;
  type?: string;
  cover: string;
  language: string;
  pages: number;
  description: string;
  copies: BookCopyDTO[];
}

export interface BookInfo {
  id: number;
  authors: string;
  genres: string;
  isbn: string;
  book_title: string;
  published_year: number;
  publisher: string;
  virtual: boolean;
  type?: string;
  cover: string;
  language: string;
  pages: number;
  description: string;
  copies: BookCopyDTO[];
}
