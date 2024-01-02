import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookCopyRespDTO, BookResponseDTO } from '../../interfaces/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

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
}
