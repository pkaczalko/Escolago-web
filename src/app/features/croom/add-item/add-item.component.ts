import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SharedModule } from 'primeng/api';
import { TableModule, TableRowSelectEvent } from 'primeng/table';
import { BookInfoEdit, BookResponseDTO } from '../../../core/interfaces/book';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExtApiService } from '../../../core/services/extApi/ext-api.service';
import { Shared } from '../../../shared/shared';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [
    ButtonModule,
    ChipsModule,
    FileUploadModule,
    FormsModule,
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    NgIf,
    NgOptimizedImage,
    SelectButtonModule,
    SharedModule,
    TableModule,
  ],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css',
})
export class AddItemComponent {
  apiReady = false;
  emptyBook: BookInfoEdit = {
    authors: [],
    genres: [],
    isbn: '',
    book_title: '',
    publisher: '',
    virtual: false,
    cover: '',
    language: '',
    description: '',
  } as unknown as BookInfoEdit;

  newBook = { ...this.emptyBook };
  uploadedFiles: any[] = [];
  apiResponses: BookResponseDTO[] = [];
  apiBook!: BookResponseDTO;
  proposeBook!: BookResponseDTO;
  loading = false;
  showWarnings: boolean = false;
  isbnWarning: boolean = false;
  constructor(
    private ref: DynamicDialogRef,
    private extApiService: ExtApiService,
  ) {}

  onUpload(event: FileUploadEvent) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  getApiInfo(isbn: string) {
    if (isbn.length < 1) {
      this.isbnWarning = true;
      return;
    }
    this.loading = true;
    this.apiReady = false;
    this.extApiService.apiBookSearch(isbn).then((res) => {
      if (res.length === 0) {
        this.proposeBook = {
          ...this.emptyBook,
          authors: [],
          genres: [],
        } as BookResponseDTO;
        this.newBook.cover = '';
        this.apiResponses = [];
        this.apiReady = true;
        this.loading = false;
        return;
      }
      this.apiResponses = res.slice(1);
      this.proposeBook = res[0];
      this.selectBook(this.proposeBook);
      this.apiReady = true;
      this.loading = false;
    });
  }

  selectBook(book: BookResponseDTO) {
    if (book === undefined) {
      this.newBook = {
        ...this.emptyBook,
        isbn: this.newBook.isbn,
      } as unknown as BookInfoEdit;
      return;
    }
    this.newBook = {
      ...book,
      authors: book.authors?.map((author) => author.name) ?? [],
      genres: book.genres?.map((genre) => genre.name) ?? [],
    } as BookInfoEdit;
  }

  rowSelected($event: TableRowSelectEvent) {
    this.selectBook($event.data);
  }

  saveBook() {
    if (
      this.newBook.isbn.length < 1 ||
      this.newBook.book_title.length < 1 ||
      this.newBook.authors.length < 1
    ) {
      this.showWarnings = true;
      return;
    } else {
      this.ref.close({
        ...this.newBook,
        authors: Shared.TableToAuthors(this.newBook.authors),
        genres: Shared.TableToGenres(this.newBook.genres),
      } as BookResponseDTO);
    }
  }
}
