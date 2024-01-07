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
  ],
  templateUrl: './single-item.component.html',
  styleUrl: './single-item.component.css',
  providers: [DialogService, DatePipe, ConfirmationService, MessageService],
})
export class SingleItemComponent implements OnInit {
  id: number = 0;
  editMode = false;
  item: ItemDTO = {} as ItemDTO;
  edit: ItemEdit = {} as ItemEdit;
  loading: boolean = false;

  constructor(
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.itemService.getItemById(this.id).subscribe((data) => {
      console.log(data);
      this.item = data;
      this.edit = {
        ...data,
        categories: data.categories.map((category) => category),
      };
    });
  }

  editItem() {
    this.editMode = true;
  }

  save() {
    this.editMode = false;
  }

  delete() {}
}
