import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { BookService } from '../../../../core/services/book/book.service';
import { InputTextModule } from 'primeng/inputtext';
import { BookCopyDTO } from '../../../../core/interfaces/book';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-add-copy',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    NgIf,
    InputNumberModule,
    ButtonModule,
  ],
  templateUrl: './add-copy.component.html',
  styleUrl: './add-copy.component.css',
})
export class AddCopyComponent implements OnInit {
  isVirtual!: boolean;
  link: string = '';
  quantity: number = 1;
  constructor(
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
  ) {}

  ngOnInit() {
    this.isVirtual = this.config.data;
  }
  close() {
    this.ref.close({ link: this.link, quantity: this.quantity });
  }
}
