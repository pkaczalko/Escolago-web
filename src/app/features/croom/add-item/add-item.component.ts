import { Component } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ItemDTO, ItemEdit } from '../../../core/interfaces/items';
import { DatePipe, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { ItemService } from '../../../core/services/item/item.service';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [
    SharedModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ChipsModule,
    InputTextareaModule,
    FileUploadModule,
    NgIf,
  ],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css',
  providers: [DatePipe],
})
export class AddItemComponent {
  constructor(
    private DynamicDialogRef: DynamicDialogRef,
    private datePipe: DatePipe,
    private itemService: ItemService,
  ) {}
  warn = false;
  newItem: ItemEdit = {
    name: '',
    keywords: [],
    categories: [],
    link: '',
    description: '',
    dateAdded: <string>this.datePipe.transform(Date.now(), 'yyyy-MM-dd'),
  } as unknown as ItemEdit;

  saveItem() {
    if (this.newItem.name === '') {
      this.warn = true;
      return;
    }
    this.itemService
      .addItem({
        ...this.newItem,
        keywords: this.newItem.keywords.join(','),
        categories: this.newItem.categories.map((category) => {
          return { name: category } as any;
        }),
      } as ItemDTO)
      .subscribe((res) => {
        this.DynamicDialogRef.close(res);
      });
  }
}
