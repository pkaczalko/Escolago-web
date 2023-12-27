import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { CatalogueService } from '../../core/services/catalogue/catalogue.service';
import { Catalogue } from '../../core/interfaces/catalogue';
import { NgForOf, NgIf } from '@angular/common';
import { toNumbers } from '@angular/compiler-cli/src/version_helpers';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [TableModule, MultiSelectModule, NgForOf, NgIf],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css',
})
export class LibraryComponent {
  catalogue!: Catalogue[];

  totalRecords!: number;

  loading: boolean = false;

  selectAll: boolean = false;

  selected!: Catalogue[];

  constructor(private catalogueService: CatalogueService) {}

  ngOnInit() {
    this.loading = true;
  }

  loadCatalogue(event: TableLazyLoadEvent) {
    this.loading = true;
    console.log(event.first, (event.first || 0) / 10 + 1);
    setTimeout(() => {
      this.catalogueService
        .getCatalogue((event.first || 0) / 10 + 1)
        .subscribe((res) => {
          this.catalogue = res.body;
          this.totalRecords = +(<string>res.headers.get('X-Total-Count'));
          this.loading = false;
        });
    }, 1000);
  }
}
