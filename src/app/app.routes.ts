import { Routes } from '@angular/router';
import { MainComponent } from './features/main/main.component';
import { LibraryComponent } from './features/library/library.component';
import { CroomComponent } from './features/croom/croom.component';
import { SearchComponent } from './features/search/search.component';
import { SingleBookComponent } from './features/library/single-book/single-book.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'croom', component: CroomComponent },
  { path: 'search', component: SearchComponent },
  { path: 'book/:id', component: SingleBookComponent },
];
