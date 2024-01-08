import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';
import { DatePipe, NgForOf, NgIf, UpperCasePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ItemDTO, ItemEdit } from '../../../core/interfaces/items';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ItemService } from '../../../core/services/item/item.service';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-single-item',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    ChipsModule,
    ConfirmDialogModule,
    DividerModule,
    FormsModule,
    InputMaskModule,
    InputTextModule,
    NgIf,
    OverlayPanelModule,
    SharedModule,
    TableModule,
    UpperCasePipe,
    DropdownModule,
    InputTextareaModule,
    NgForOf,
    FileUploadModule,
    ToastModule,
  ],
  templateUrl: './single-item.component.html',
  styleUrl: './single-item.component.css',
  providers: [DialogService, DatePipe, ConfirmationService],
})
export class SingleItemComponent implements OnInit {
  id: number = 0;
  editMode = false;
  item: ItemDTO = {} as ItemDTO;
  edit: ItemEdit = {} as ItemEdit;
  loading: boolean = false;
  saveRequest: ItemDTO = {} as ItemDTO;
  uploadUrl!: string;
  icon: string = 'pi pi-plus';
  buttonLabel: string = '';

  constructor(
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.itemService.getItemById(this.id).subscribe((data) => {
      this.uploadUrl =
        'http://localhost:8080/asset/' + data.assetId.id + '/upload';
      this.item = data;
      this.setEdit();
    });
  }

  setEdit(data: ItemDTO = this.item) {
    this.edit = {
      ...data,
      categories: data.categories.map((category) => category.name),
      keywords: data.keywords.split(','),
    };
  }

  editItem() {
    this.editMode = true;
    if (this.edit.link) {
      this.buttonLabel = 'Zmień zdjęcie';
    } else {
      this.buttonLabel = 'Dodaj zdjęcie';
    }
  }

  save() {
    this.editMode = false;
    this.saveRequest = {
      ...this.edit,
      keywords: this.edit.keywords.join(','),
      categories: this.edit.categories.map((category) => {
        return { name: category } as any;
      }),
    };
    this.itemService
      .updateItem(this.id.toString(), this.saveRequest)
      .subscribe({
        next: (data) => {
          this.item = data;
          this.setEdit();
          this.messageService.add({
            severity: 'success',
            summary: 'Sukces',
            detail: 'Pomyślnie zaktualizowano zasób',
          });
        },
        error: (err) => {},
      });
  }

  delete() {
    this.itemService.deleteItem(this.id.toString()).subscribe(() => {
      this.router.navigate(['/croom']).then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sukces',
          detail: 'Pomyślnie usunięto zasób',
        });
      });
    });
  }

  onBasicUploadAuto(event: any) {
    if (event.originalEvent.body.url) {
      setTimeout(() => {
        this.edit.link = event.originalEvent.body.url;
        this.messageService.add({
          severity: 'success',
          summary: 'Sukces',
          detail: 'Pomyślnie dodano plik',
        });
      }, 100);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Błąd',
        detail: 'Coś poszło nie tak',
      });
    }
    this.icon = 'pi pi-plus';
  }

  selected() {
    this.icon = 'pi pi-spin pi-spinner';
  }
}
