import { Routes } from '@angular/router';
import { MainComponent } from './features/main/main.component';
import { LibraryComponent } from './features/library/library.component';
import { CroomComponent } from './features/croom/croom.component';
import { SingleBookComponent } from './features/library/single-book/single-book.component';
import { TableComponent } from './features/main/search/table/table.component';
import { SearchComponent } from './features/main/search/search.component';
import { SingleItemComponent } from './features/croom/single-item/single-item.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'croom', component: CroomComponent },
  { path: 'book/:id', component: SingleBookComponent },
  { path: 'item/:id', component: SingleItemComponent },
  { path: 'search', component: TableComponent },
];
