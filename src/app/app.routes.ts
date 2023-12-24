import { Routes } from '@angular/router';
import { MainComponent } from './features/main/main.component';
import {LibraryComponent} from "./features/library/library.component";

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'library',component:LibraryComponent}
];
