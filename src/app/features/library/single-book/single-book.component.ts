import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BookService } from '../../../core/services/book/book.service';
import {
  AuthorDTO,
  BookCopyDTO,
  BookCopyRespDTO,
  BookInfo,
  BookInfoEdit,
  BookResponseDTO,
  GenreDTO,
} from '../../../core/interfaces/book';
import { Shared } from '../../../shared/shared';
import { CommonModule, DatePipe, NgIf, UpperCasePipe } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddCopyComponent } from './add-copy/add-copy.component';
import { RentFormComponent } from './rent-form/rent-form.component';
import { ChipsModule } from 'primeng/chips';
import { firstValueFrom } from 'rxjs';
import { KeyFilterModule } from 'primeng/keyfilter';
import { routes } from '../../../app.routes';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-single-book',
  standalone: true,
  imports: [
    RentFormComponent,
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
    ChipsModule,
    KeyFilterModule,
    ConfirmDialogModule,
  ],
  providers: [DialogService, DatePipe, ConfirmationService, MessageService],
  templateUrl: './single-book.component.html',
  styleUrl: './single-book.component.css',
})
export class SingleBookComponent implements OnInit, OnDestroy {
  id!: string;
  bookFront: BookInfo = {} as BookInfo;
  bookDTO!: BookResponseDTO;
  bookCopies: BookCopyDTO[] = [];
  editMode: boolean = false;
  loading: boolean = false;
  edit!: BookInfoEdit;
  ref: DynamicDialogRef | undefined;
  authors: string[] = [];
  generes: string[] = [];
  isbn!: string | number;

  constructor(
    public dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private messageService: MessageService,
    private datePipe: DatePipe,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.id = <string>this.route.snapshot.paramMap.get('id');

    this.bookService.getBook(this.id).subscribe({
      next: (data) => {
        this.bookDTO = data;
        this.bookFront = {
          ...data,
          authors: Shared.authorsToString(data.authors),
          genres: Shared.generesToString(data.genres),
          type: this.bookType(data.virtual),
        } as BookInfo;
        this.authors = data.authors.map((a) => a.name);
        this.generes = data.genres.map((g) => g.name);
        this.bookCopies = data.copies;
      },
      error: (error) => {
        this.bookFront = {} as BookInfo;
      },
    });
  }

  bookType(bool: boolean): string {
    return bool ? 'Ebook' : 'Książka';
  }

  editBookInfo() {
    this.edit = {
      ...this.bookFront,
      authors: this.authors,
      genres: this.generes,
    };
    this.editMode = true;
  }

  saveChanges() {
    this.loading = true;
    if (
      JSON.stringify({ ...this.bookFront }) ==
      JSON.stringify({
        ...this.edit,
        genres: Shared.tableToString(this.edit.genres),
        authors: Shared.tableToString(this.edit.authors),
      })
    ) {
      setTimeout(() => {
        this.loading = false;
        this.editMode = false;
      }, 500);
      return;
    }

    let editedAuthors = Shared.DTOtoResponse(
      this.bookDTO.authors,
      Shared.TableToAuthors(this.edit.authors),
    ) as AuthorDTO[];
    let editedGenres = Shared.DTOtoResponse(
      this.bookDTO.genres,
      Shared.TableToGenres(this.edit.genres),
    ) as GenreDTO[];

    let bookRequest: BookResponseDTO = {
      ...this.edit,
      authors: editedAuthors,
      genres: editedGenres,
    };

    this.bookFront = {
      ...this.edit,
      genres: Shared.tableToString(this.edit.genres),
      authors: Shared.tableToString(this.edit.authors),
    };

    setTimeout(() => {
      this.bookService.editBook(bookRequest).subscribe({
        next: (res) => {
          this.loading = false;
          this.editMode = false;
          this.messageService.add({
            severity: 'info',
            summary: 'Sukces',
            detail: 'Zapisano zmiany',
          });
        },
        error: (error) => {
          this.loading = false;
          this.editMode = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Błąd ' + error.status,
            detail: 'nie zapisano zmian',
          });
          setTimeout(() => {
            //location.reload();
          }, 1000);
        },
      });
    }, 500);
  }

  addCopy() {
    this.ref = this.openDialog(
      AddCopyComponent,
      'Dodaj egzemplarz',
      this.bookFront.virtual,
    );

    this.ref.onClose.subscribe((data) => {
      if (data) {
        let copy: BookCopyRespDTO = {
          rented: false,
          date_added: <string>this.datePipe.transform(Date.now(), 'yyyy-MM-dd'),
        };
        if (this.bookFront.virtual) {
          copy.link = data.link;
        }

        let copies: BookCopyRespDTO[] = [];
        for (let i = 0; i < data.quantity; i++) {
          copies.push(copy);
        }
        this.bookService
          .addCopy(this.bookFront.id.toString(), copies)
          .subscribe((res) => {
            this.bookCopies = [
              ...this.bookCopies,
              ...(<BookCopyDTO[]>res.body),
            ];
            this.bookFront.copies = this.bookCopies;
            this.messageService.add({
              severity: 'info',
              summary: 'Sukces',
              detail: 'Dodano egzemplarz',
            });
          });
      }
    });
  }

  returnCopy(copy: BookCopyDTO) {
    if (copy.loan?.id) {
      let loan_id = copy.loan.id;
      this.bookService.returnCopy(loan_id, copy).subscribe((res) => {
        this.updateCopies(res as BookCopyDTO);
        this.messageService.add({
          severity: 'info',
          summary: 'Sukces',
          detail: 'Zwrócono egzemplarz',
        });
      });
    }
  }

  rentCopy(copy: BookCopyDTO) {
    this.ref = this.openDialog(RentFormComponent, 'Wypożycz');

    this.ref.onClose.subscribe((data) => {
      if (data) {
        this.bookService.rentCopy(data, copy).subscribe({
          next: (res) => {
            this.updateCopies(res.body as BookCopyDTO);
            this.messageService.add({
              severity: 'success',
              summary: 'Sukces',
              detail: 'Wypożyczono egzemplarz',
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Błąd ' + error.status,
              detail: 'Użytkownik o podanym numerze id nie istnieje',
            });
          },
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  updateCopies(copy: BookCopyDTO) {
    this.bookCopies = this.bookCopies.map((c) => {
      if (c.id == copy.id) {
        return copy;
      } else return c;
    });
    this.bookFront.copies = this.bookCopies;
  }

  openDialog(comp: any, header: string, data?: any) {
    return this.dialogService.open(comp, {
      header: header,
      data: data,
      width: '25dvw',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
    });
  }

  deleteCopy(copy: BookCopyDTO) {
    this.bookService.deleteCopy(copy.id.toString()).subscribe((res) => {
      this.bookCopies = this.bookCopies.filter((c) => c.id != copy.id);
      this.bookFront.copies = this.bookCopies;
      this.messageService.add({
        severity: 'success',
        summary: 'Sukces',
        detail: 'Usunięto egzemplarz',
      });
    });
  }

  deleteBook() {
    this.confirmationService.confirm({
      message: 'Czy na pewno chcesz usunąć książkę?',
      header: 'Potwierdzenie usunięcia',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'p-button-info',
      acceptButtonStyleClass: 'p-button-danger',
      acceptLabel: 'Tak',
      rejectLabel: 'Nie',
      accept: () => {
        this.bookService.deleteBook(this.bookDTO.id.toString()).subscribe({
          next: (res) => {},
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.router.navigate(['/library']).then((r) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Sukces',
                detail: 'Usunięto książkę',
              });
            });
          },
        });
      },
      reject: () => {
        return;
      },
    });
  }
}
