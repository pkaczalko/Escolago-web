import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BookService } from '../../../core/services/book/book.service';
import {
  BookCopyDTO,
  BookInfo,
  BookInfoEdit,
  BookResponseDTO,
} from '../../../core/interfaces/book';
import { Shared } from '../../../shared/shared';
import { CommonModule, NgIf, UpperCasePipe } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-single-book',
  standalone: true,
  imports: [
    CardModule,
    DividerModule,
    TableModule,
    ButtonModule,
    NgIf,
    UpperCasePipe,
    RippleModule,
    ToastModule,
    MenuModule,
    DialogModule,
    OverlayPanelModule,
    InputTextModule,
    FormsModule,
  ],
  templateUrl: './single-book.component.html',
  styleUrl: './single-book.component.css',
})
export class SingleBookComponent implements OnInit {
  id!: string;
  bookData: BookInfo = {} as BookInfo;
  bookCopies: BookCopyDTO[] = [];
  editMode: boolean = false;
  loading: boolean = false;
  edit!: BookInfoEdit;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.id = <string>this.route.snapshot.paramMap.get('id');

    this.bookService.getBook(this.id).subscribe((data) => {
      console.log(data);
      this.bookData = {
        ...data,
        authors: Shared.authorsToString(data.authors),
        genres: Shared.generesToString(data.genres),
        type: this.bookType(data.virtual),
      } as BookInfo;
      this.bookCopies = data.copies;
    });
  }

  bookType(bool: boolean): string {
    return bool ? 'Ebook' : 'Książka';
  }

  editBookInfo() {
    this.edit = this.bookData;

    this.editMode = true;
  }

  saveChanges() {
    this.loading = true;
    this.bookData = this.edit;
    let bookRequest: BookResponseDTO = {
      ...this.edit,
      authors: Shared.TableToAuthors(this.edit.authors),
      genres: Shared.TabletoGenres(this.edit.genres),
    };
    setTimeout(() => {
      this.bookService.editBook(bookRequest).subscribe((res) => {
        console.log(res.status);
        this.loading = false;
        this.editMode = false;
        this.messageService.add({
          severity: 'info',
          summary: 'Sukces',
          detail: 'Zapisano zmiany',
        });
      });
    }, 500);
  }
}
