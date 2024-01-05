import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { NgIf, NgOptimizedImage, UpperCasePipe } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SharedModule } from 'primeng/api';
import { TableModule, TableRowSelectEvent } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  BookInfo,
  BookInfoEdit,
  BookResponseDTO,
} from '../../../core/interfaces/book';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputGroupModule } from 'primeng/inputgroup';
import { ExtApiService } from '../../../core/services/extApi/ext-api.service';
import { Shared } from '../../../shared/shared';
import { ChipsModule } from 'primeng/chips';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    DividerModule,
    FormsModule,
    InputTextModule,
    NgIf,
    OverlayPanelModule,
    SharedModule,
    TableModule,
    UpperCasePipe,
    InputNumberModule,
    SelectButtonModule,
    FileUploadModule,
    InputTextareaModule,
    InputGroupModule,
    NgOptimizedImage,
    ChipsModule,
  ],
  providers: [DialogService],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent {
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
