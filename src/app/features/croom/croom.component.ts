import { Component } from '@angular/core';
import { CatalogueService } from '../../core/services/catalogue/catalogue.service';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-croom',
  standalone: true,
  imports: [TableModule, NgForOf, NgIf],
  templateUrl: './croom.component.html',
  styleUrl: './croom.component.css',
})
export class CroomComponent {
  // catalogue!: Catalogue[];
  //
  // totalRecords!: number;
  //
  // loading: boolean = false;
  //
  // selectAll: boolean = false;
  //
  // selected!: Catalogue[];
  //
  // constructor(private catalogueService: CatalogueService) {}
  //
  // ngOnInit() {
  //   this.loading = true;
  // }
  //
  // loadCatalogue(event: TableLazyLoadEvent) {
  //   this.loading = true;
  //   console.log(event.first, (event.first || 0) / 10 + 1);
  //   setTimeout(() => {
  //     this.catalogueService
  //       .getCatalogue((event.first || 0) / 10 + 1)
  //       .subscribe((res) => {
  //         this.catalogue = res.body;
  //         this.totalRecords = +(<string>res.headers.get('X-Total-Count'));
  //         this.loading = false;
  //       });
  //   }, 1000);
  // }
}
