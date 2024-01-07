import { Component, OnInit } from '@angular/core';
import {
  TableLazyLoadEvent,
  TableModule,
  TableRowSelectEvent,
} from 'primeng/table';
import { DatePipe, NgForOf, NgIf, NgStyle } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ItemDTO, ItemTable, ShortItemDTO } from '../../core/interfaces/items';
import { ItemService } from '../../core/services/item/item.service';
import { AddItemComponent } from './add-item/add-item.component';

@Component({
  selector: 'app-croom',
  standalone: true,
  imports: [
    TableModule,
    NgForOf,
    NgIf,
    ConfirmDialogModule,
    InputGroupModule,
    FormsModule,
    NgStyle,
    RadioButtonModule,
    InputTextModule,
  ],
  templateUrl: './croom.component.html',
  styleUrl: './croom.component.css',
  providers: [DialogService, DatePipe],
})
export class CroomComponent implements OnInit {
  items: ItemTable[] = [];
  selectedItem!: ItemTable;
  totalRecords!: number;
  ref: DynamicDialogRef | undefined;
  loading: boolean = false;
  newItem!: ItemDTO;
  searchValue: string = '';
  selectedAction: any = null;
  first = 0;

  constructor(
    private itemService: ItemService,
    private router: Router,
    private dialogService: DialogService,
    private messageService: MessageService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit() {
    this.loading = true;
  }

  tableLoad(event: TableLazyLoadEvent) {
    this.loadItems((event.first || 0) / 10 || 0);
  }

  loadItems(page: number) {
    this.loading = true;
    setTimeout(() => {
      this.itemService
        .getItems(page, this.searchValue, this.selectedAction?.key ?? '')
        .subscribe((res) => {
          this.items = this.prepareData(res.items);
          this.totalRecords = res.totalItems;
          this.loading = false;
        });
    }, 500);
  }

  prepareData(items: ShortItemDTO[]): ItemTable[] {
    let table: ItemTable[] = [];

    items.forEach((item) => {
      table.push({
        ...item,
        categories: item.categories.map((cat) => cat.name).join(', '),
      } as ItemTable);
    });
    return table;
  }

  onRowSelect(event: TableRowSelectEvent) {
    this.router.navigate(['/item', event.data.id]);
  }

  addItem() {
    this.ref = this.dialogService.open(AddItemComponent, {
      header: 'Dodaj nowy zasób',
      width: '35dvw',
      contentStyle: { 'max-height': 'auto', overflow: 'auto' },
    });
    this.ref.onClose.subscribe((res) => {
      if (res) {
        this.itemService.addItem(res).subscribe({
          next: (data) => {
            this.newItem = data;
          },
          error: (err) => {
            err.catch();
          },
          complete: () => {},
        });
      }
    });
  }

  searchItems() {
    this.first = 0;
    this.loadItems(0);
  }
}
