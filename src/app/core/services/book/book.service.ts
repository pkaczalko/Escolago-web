import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BookCopyDTO,
  BookCopyRespDTO,
  BookResponseDTO,
} from '../../interfaces/book';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  rentCopy(user_id: number, copy: BookCopyDTO) {
    return this.http.put<BookCopyDTO>(
      'http://localhost:8080/book/rent/' + user_id,
      copy,
      { observe: 'response' },
    );
  }

  returnCopy(loan_id: number, copy: BookCopyDTO) {
    return this.http.put<BookCopyDTO>(
      'http://localhost:8080/book/return/' + loan_id,
      copy,
    );
  }

  public getBook(id: string) {
    return this.http.get<BookResponseDTO>(`http://localhost:8080/book/` + id);
  }

  public editBook(book: BookResponseDTO) {
    return this.http.put<BookResponseDTO>(
      `http://localhost:8080/book/` + book.id,
      book,
      { observe: 'response' },
    );
  }

  addCopy(id: string, copies: BookCopyRespDTO[]) {
    return this.http.post(
      'http://localhost:8080/book/' + id + '/addcopy',
      copies,
      {
        observe: 'response',
      },
    );
  }

  deleteCopy(id: string) {
    return this.http.delete('http://localhost:8080/book/copy/delete/' + id);
  }

  findAuthor(name: string) {
    return this.http.get(
      'http://localhost:8080/author/' + name.trim().replace(' ', '+'),
    );
  }

  findGenre(name: string) {
    return this.http.get(
      'http://localhost:8080/genre/' + name.trim().replace(' ', '+'),
    );
  }

  addBook(book: BookResponseDTO) {
    return this.http.post<BookResponseDTO>(
      'http://localhost:8080/book/add',
      book,
    );
  }

  deleteBook(id: string) {
    return this.http.delete('http://localhost:8080/book/delete/' + id);
  }

  setCopyLink(id: number, link: string) {
    return this.http.put(
      'http://localhost:8080/book/' + id.toString() + '/setlink',
      link,
    );
  }
}
