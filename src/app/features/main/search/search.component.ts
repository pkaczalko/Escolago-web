import { Component } from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    ButtonModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchValue: string = '';

}
