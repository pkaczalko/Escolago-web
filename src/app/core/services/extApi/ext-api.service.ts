import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  GoogleAPI,
  GoogleResponse,
  OpenLibraryAPI,
  OpenLibraryResponse,
} from '../../interfaces/ExtApis';
import { firstValueFrom, forkJoin } from 'rxjs';
import { BookResponseDTO } from '../../interfaces/book';
import { Shared } from '../../../shared/shared';
@Injectable({
  providedIn: 'root',
})
export class ExtApiService {
  bookInfo!: BookResponseDTO[];

  constructor(private http: HttpClient) {}

  getGoogleApi(isbn: string) {
    return this.http.get<GoogleResponse>(
      'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn,
    );
  }

  getOpenLibraryApi(isbn: string) {
    return this.http.get<any>(
      'https://openlibrary.org/api/books?bibkeys=ISBN:' +
        isbn +
        '&jscmd=data&format=json',
    );
  }

  async apiBookSearch(isbn: string): Promise<BookResponseDTO[]> {
    if (isbn.length < 1) {
      return [];
    }
    let empty = [false, false];
    let google: GoogleAPI = {} as any;
    let openLib: OpenLibraryAPI = {} as OpenLibraryAPI;
    let bookInfo: BookResponseDTO[] = [];
    try {
      const res = await firstValueFrom(
        forkJoin([this.getGoogleApi(isbn), this.getOpenLibraryApi(isbn)]),
      );
      if (res[0].totalItems !== 0) {
        let gbook = res[0].items[0];
        google.title =
          gbook.volumeInfo?.title +
            (gbook.volumeInfo.subtitle ? ' ' + gbook.volumeInfo.subtitle : '') ?? '';
        google.authors = gbook.volumeInfo?.authors ?? [];
        google.publisher = gbook.volumeInfo.publisher ?? '';
        google.publishedDate = gbook.volumeInfo?.publishedDate ?? '';
        google.pageCount = gbook.volumeInfo?.pageCount;
        google.printType = gbook.volumeInfo?.printType ?? '';
        google.isEbook = gbook.saleInfo?.isEbook ?? false;
        google.language = gbook.volumeInfo?.language ?? '';
        google.textSnippet = gbook.searchInfo?.textSnippet ?? '';
        google.imageLinks = gbook.volumeInfo?.imageLinks?.thumbnail ?? '';
        google.categories = gbook.volumeInfo?.categories ?? [];
      } else {
        empty[0] = true;
      }if (JSON.stringify(res[1]) !== '{}') {
        let response = res[1]['ISBN:' + isbn] as OpenLibraryResponse;
        let cover =
          response.cover.large ??
          response.cover.medium ??
          response.cover.small ??
          response.cover ??
          '';
        openLib.title = response?.title ?? '';
        openLib.authors =
          response.authors?.map((author: { name: any }) => author.name) ?? [];
        openLib.publish_date = this.getYear(response?.publish_date ?? '');
        openLib.publishers = response?.publishers?.map((a) => a.name) ?? [];
        openLib.cover = cover;
        openLib.number_of_pages = response?.number_of_pages;
        openLib.subjects = response?.subjects?.map((s) => s.name) ?? [];
      } else {
        empty[1] = true;
      }

      let googleToDTO: BookResponseDTO = {} as BookResponseDTO;
      if (!empty[0]) {
        googleToDTO.authors = Shared.TableToAuthors(google.authors ?? []);
        googleToDTO.genres = Shared.TableToGenres(google.categories ?? []);
        googleToDTO.book_title = google.title;
        googleToDTO.cover = google.imageLinks;
        let parser = new DOMParser();
        let dom = parser.parseFromString(google.textSnippet, 'text/html');
        googleToDTO.description = dom.body.textContent ?? '';
        googleToDTO.isbn = isbn;
        googleToDTO.language = google.language;
        googleToDTO.pages = google.pageCount;
        let year = this.getYear(google.publishedDate);
        if (year) {
          googleToDTO.published_year = +year;
        }
        googleToDTO.publisher = google.publisher;
        googleToDTO.virtual = google.isEbook;
      }
      let OpenLibToDTO: BookResponseDTO = {} as BookResponseDTO;
      if (!empty[1]) {
        OpenLibToDTO.authors = Shared.TableToAuthors(openLib.authors);
        OpenLibToDTO.genres = Shared.TableToGenres(openLib.subjects ?? []);
        OpenLibToDTO.book_title = openLib.title;
        OpenLibToDTO.cover = openLib.cover;
        OpenLibToDTO.isbn = isbn;
        OpenLibToDTO.pages = openLib.number_of_pages;
        OpenLibToDTO.published_year = <number>openLib.publish_date;
        OpenLibToDTO.publisher = Shared.tableToString(openLib.publishers);
      }

      bookInfo = this.compareBooks(googleToDTO, OpenLibToDTO);
    } catch (error) {
      console.log(error);
    }
    return bookInfo;
  }

  getYear(date: string) {
    let yearMatch = date.match(/\b\d{4}\b/);

    return yearMatch ? yearMatch[0] : null;
  }

  compareBooks(google: BookResponseDTO, openLibBook: BookResponseDTO) {
    if (JSON.stringify(google) === JSON.stringify(openLibBook) && JSON.stringify(google) === JSON.stringify({})
    ){return [];}
    let bestBook: BookResponseDTO = {} as BookResponseDTO;
    bestBook.book_title =
      openLibBook.book_title?.length > google.book_title?.length
        ? openLibBook.book_title
        : google.book_title;
    bestBook.authors =
      openLibBook.authors?.length > google.authors?.length
        ? openLibBook.authors
        : google.authors;
    bestBook.genres =
      openLibBook.genres?.length > google.genres?.length
        ? openLibBook.genres
        : google.genres;
    bestBook.publisher =
      openLibBook.publisher?.length > google.publisher?.length
        ? openLibBook.publisher
        : google.publisher;
    bestBook.cover =
      openLibBook.cover?.length > google.cover?.length
        ? openLibBook.cover
        : google.cover;
    bestBook.published_year =
      openLibBook.published_year > google.published_year
        ? openLibBook.published_year
        : google.published_year;
    bestBook.pages =
      openLibBook.pages > google.pages ? openLibBook.pages : google.pages;
    bestBook.language =
      openLibBook.language?.length > google.language?.length
        ? openLibBook.language
        : google.language;
    bestBook.description =
      openLibBook.description?.length > google.description?.length
        ? openLibBook.description
        : google.description;
    bestBook.virtual = google.virtual;
    bestBook.isbn = google.isbn;
    if (JSON.stringify(google) === JSON.stringify(openLibBook)) {
      return [bestBook, google];
    }
    return [bestBook, google, openLibBook];
  }
}
