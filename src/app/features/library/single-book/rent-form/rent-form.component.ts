import { Component } from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-rent-form',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    InputNumberModule,
    InputTextModule,
    NgIf
  ],
  templateUrl: './rent-form.component.html',
  styleUrl: './rent-form.component.css'
})
export class RentFormComponent {
  user_id!:number;
  constructor(
    private ref: DynamicDialogRef,
  ) {}


  close() {
    this.ref.close(this.user_id);
  }

}
