export interface GoogleResponse {
  kind: string;
  totalItems: number;
  items: GoogleBook[];
}

export interface GoogleBook {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  searchInfo: SearchInfo;
}

export interface VolumeInfo {
  title: string;
  subtitle?: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  industryIdentifiers: IndustryIdentifier[];
  pageCount: number;
  printType: string;
  language: string;
  categories: string[];
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
}

export interface SaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
}

export interface IndustryIdentifier {
  type: string;
  identifier: string;
}

export interface SearchInfo {
  textSnippet: string;
}

export interface GoogleAPI {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  pageCount: number;
  printType: string;
  isEbook: boolean;
  language: string;
  textSnippet: string;
  imageLinks: string;
  categories: string[];
}

export interface OpenLibraryResponse {
  title: string;
  authors: OpenAuthor[];
  publishers?: OpenPublisher[];
  cover: OpenCover;
  publish_date: string;
  number_of_pages: number;
  subjects: openSubject[];
}

export interface openSubject {
  name: string;
  url: string;
}

export interface OpenAuthor {
  name: string;
  url: string;
}

export interface OpenPublisher {
  name: string;
}

export interface OpenCover {
  small: string;
  medium: string;
  large: string;
}

export interface OpenLibraryAPI {
  title: string;
  authors: string[];
  publishers: string[];
  cover: string;
  publish_date: number | string | null;
  number_of_pages: number;
  subjects?: string[];
}

export interface GoogleAPI {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  pageCount: number;
  printType: string;
  isEbook: boolean;
  language: string;
  textSnippet: string;
  imageLinks: string;
  categories: string[];
}
