import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ConfirmationService,
  LazyLoadEvent,
  MessageService,
} from 'primeng/api';
import {
  TableLazyLoadEvent,
  TableModule,
  TableRowSelectEvent,
} from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { CatalogueService } from '../../core/services/catalogue/catalogue.service';
import { CatalogueDTO, CatalogueTable } from '../../core/interfaces/catalogue';
import { DatePipe, NgForOf, NgIf, NgStyle } from '@angular/common';
import { Shared } from '../../shared/shared';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddBookComponent } from './add-book/add-book.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {
  BookCopyDTO,
  BookCopyRespDTO,
  BookResponseDTO,
} from '../../core/interfaces/book';
import { BookService } from '../../core/services/book/book.service';
import { AddCopyComponent } from './single-book/add-copy/add-copy.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { AddBookFileComponent } from './add-book/add-book-file/add-book-file.component';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    TableModule,
    MultiSelectModule,
    NgForOf,
    NgIf,
    ButtonModule,
    ConfirmDialogModule,
    InputTextModule,
    InputGroupModule,
    NgStyle,
    FormsModule,
    RadioButtonModule,
    ToastModule,
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css',
  providers: [DialogService, ConfirmationService, DatePipe],
})
export class LibraryComponent implements OnInit, OnDestroy {
  catalogue!: CatalogueTable[];
  selectedBook!: CatalogueTable;
  totalRecords!: number;
  ref: DynamicDialogRef | undefined;
  loading: boolean = false;
  newBook!: BookResponseDTO;
  searchValue: string = '';
  selectedAction: any = null;
  first = 0;
  actions: any[] = [
    { name: 'Tytuł', key: 'title' },
    { name: 'ISBN', key: 'isbn' },
    { name: 'Autor', key: 'author' },
    { name: 'Gatunek', key: 'genre' },
    { name: 'Numer zasobu', key: 'asset' },
  ];

  constructor(
    private catalogueService: CatalogueService,
    private bookService: BookService,
    private router: Router,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit() {
    this.loading = true;
  }

  tableLoad(event: TableLazyLoadEvent) {
    this.loadCatalogue((event.first || 0) / 10 || 0);
  }

  loadCatalogue(page: number) {
    this.loading = true;
    setTimeout(() => {
      this.catalogueService
        .getCatalogue(page, this.searchValue, this.selectedAction?.key ?? '')
        .subscribe((res) => {
          this.catalogue = this.prepareData(res.catalogue);
          this.totalRecords = res.totalCount;
          this.loading = false;
        });
    }, 500);
  }

  prepareData(books: CatalogueDTO[]): CatalogueTable[] {
    let table: CatalogueTable[] = [];

    books.forEach((book) => {
      table.push({
        ...book,
        authors: Shared.authorsToString(book.authors),
        genres: Shared.genresToString(book.genres),
      } as CatalogueTable);
    });
    return table;
  }

  onRowSelect(event: TableRowSelectEvent) {
    this.router.navigate(['/book', event.data.id]);
  }

  addBook() {
    this.ref = this.dialogService.open(AddBookComponent, {
      header: 'Dodaj nową książkę',
      width: '35dvw',
      contentStyle: { 'max-height': 'auto', overflow: 'auto' },
    });
    this.ref.onClose.subscribe((res) => {
      if (res) {
        this.bookService.addBook(res).subscribe({
          next: (data) => {
            this.newBook = data;
          },
          error: (err) => {
            if (err.status == 400) {
              this.messageService.add({
                severity: 'error',
                summary: 'Błąd',
                detail: 'Książka o podanym ISBN już istnieje',
              });
            }
          },
          complete: () => {
            if (!this.newBook.virtual) this.copyConfDialog();
            else {
              this.fileConf();
            }
          },
        });
      }
    });
  }

  copyConfDialog() {
    this.confirmationService.confirm({
      message: 'Czy chcesz dodać egzemplarze tej książki?',
      header: 'Egzemplarze',
      acceptLabel: 'Tak',
      rejectLabel: 'Nie',
      accept: () => {
        this.ref = this.dialogService.open(AddCopyComponent, {
          header: 'Dodaj kopie',
          width: '35vw',
          contentStyle: { 'max-height': 'auto', overflow: 'auto' },
          data: this.newBook.id,
        });

        this.ref.onClose.subscribe({
          next: (data) => {
            if (data) {
              let copy: BookCopyRespDTO = {
                rented: false,
                date_added: <string>(
                  this.datePipe.transform(Date.now(), 'yyyy-MM-dd')
                ),
              };

              let copies: BookCopyRespDTO[] = [];
              for (let i = 0; i < data.quantity; i++) {
                copies.push(copy);
              }
              this.bookService
                .addCopy(this.newBook.id.toString(), copies)
                .subscribe((res) => {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Sukces',
                    detail: 'Dodano egzemplarze książki',
                  });
                });
            }
          },
          error: (err) => {},
          complete: () => {},
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sukces',
          detail: 'Dodano książkę',
        });
      },
    });
  }

  fileConf() {
    this.confirmationService.confirm({
      message: 'Czy chcesz dodać plik do książki?',
      header: 'Plik',
      acceptLabel: 'Tak',
      rejectLabel: 'Nie',
      accept: () => {
        this.addFile();
      },
      reject: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sukces',
          detail: 'Dodano książkę',
        });
      },
    });
  }

  addFile() {
    let newCopy: BookCopyRespDTO = {
      rented: false,
      date_added: <string>this.datePipe.transform(Date.now(), 'yyyy-MM-dd'),
    };
    this.bookService
      .addCopy(this.newBook.id.toString(), [newCopy])
      .subscribe((res: any) => {
        this.newBook.copies = res?.body ?? [];
      });

    this.ref = this.dialogService.open(AddBookFileComponent, {
      header: 'Dodaj plik',
      width: '35vw',
      contentStyle: { 'max-height': 'auto', overflow: 'auto' },
      data: this.newBook.id,
    });

    this.ref.onClose.subscribe({
      next: (data) => {
        this.bookService
          .setCopyLink(this.newBook.copies[0].id, data)
          .subscribe({});
      },
      error: (err) => {},
    });
  }

  searchCatalogue() {
    this.first = 0;
    this.loadCatalogue(0);
  }

  ngOnDestroy() {
    this.ref?.destroy();
  }
}
