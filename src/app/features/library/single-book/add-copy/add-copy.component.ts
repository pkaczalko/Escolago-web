import { Component, OnInit } from '@angular/core';
import {
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
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

























