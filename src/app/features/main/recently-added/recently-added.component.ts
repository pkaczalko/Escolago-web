import { Component } from '@angular/core';
import {TableModule} from "primeng/table";

@Component({
  selector: 'app-recently-added',
  standalone: true,
  imports: [
    TableModule
  ],
  templateUrl: './recently-added.component.html',
  styleUrl: './recently-added.component.css'
})
export class RecentlyAddedComponent {
  items : any[] = [
    {
      modul: "Biblioteka",
      nazwa: "item1",
      numer: 1,
      data: "2020-01-01",

    },
    {
      modul: "Świetlica",
      nazwa: "item2",
      numer: 2,
      data: "2020-01-01",
    }
  ]
}
