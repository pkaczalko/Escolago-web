import { Component } from '@angular/core';
import {ModulesComponent} from "./modules/modules.component";
import {SearchComponent} from "./search/search.component";
import {RecentlyAddedComponent} from "./recently-added/recently-added.component";
import {UserComponent} from "./user/user.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    ModulesComponent,
    SearchComponent,
    RecentlyAddedComponent,
    UserComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
