import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { CatalogueService } from '../../core/services/catalogue/catalogue.service';
import { CatalogueDTO, CatalogueTable } from '../../core/interfaces/catalogue';
import { NgForOf, NgIf } from '@angular/common';
import { Shared } from '../../shared/shared';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [TableModule, MultiSelectModule, NgForOf, NgIf],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css',
})
export class LibraryComponent {
  catalogue!: CatalogueTable[];

  totalRecords!: number;

  loading: boolean = false;

  constructor(private catalogueService: CatalogueService) {}

  ngOnInit() {
    this.loading = true;
  }

  loadCatalogue(event: TableLazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      this.catalogueService
        .getCatalogue((event.first || 0) / 10 || 0)
        .subscribe((res) => {
          this.catalogue = this.prepareData(res.catalogue);
          this.totalRecords = res.totalCount;
          this.loading = false;
        });
    }, 500);
  }

  prepareData(books: CatalogueDTO[]): CatalogueTable[] {
    let table: CatalogueTable[] = [];

    books.forEach((book) => {
      table.push({
        ...book,
        authors: Shared.authorsToString(book.authors),
        genres: Shared.generesToString(book.genres),
      } as CatalogueTable);
    });
    return table;
  }
}
