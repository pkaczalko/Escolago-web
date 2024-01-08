import { Component, OnInit, signal } from '@angular/core';
import { SharedModule } from 'primeng/api';
import {
  TableLazyLoadEvent,
  TableModule,
  TableRowSelectEvent,
} from 'primeng/table';
import { AssetsService } from '../../../../core/services/assets/assets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JoinAssetsDTO } from '../../../../core/interfaces/assets';
import { RecentlyAdded } from '../../recently-added/recently-added.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    SharedModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  tableData!: RecentlyAdded[];
  totalElements: number = 0;
  searchValue: string = '';
  loading: boolean = false;
  constructor(
    private assetsService: AssetsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchValue = params['q'] || '';
    });
  }

  tableLoad(event: TableLazyLoadEvent) {
    this.loadAssets((event.first || 0) / 10 || 0);
  }

  prepareData(data: JoinAssetsDTO[]) {
    let preparedData: any[] = [];
    data.forEach((element) => {
      let link = '';
      let module = '';
      if (element.book) {
        link = 'book/' + element.book.bookId;
        module = 'Biblioteka';
      } else {
        link = 'item/' + element.item?.id;
        module = 'Świetlica';
      }
      preparedData.push({
        name: element?.book?.bookTitle ?? element?.item?.name ?? '',
        assetId: element?.book?.assetId ?? element?.item?.assetId ?? 0,
        dateAdded: element?.book?.addedDate ?? element?.item?.addedDate ?? '',
        id: element?.book?.bookId ?? element?.item?.id ?? 0,
        link: link,
        module: module,
      });
    });
    return preparedData;
  }

  onRowSelect($event: TableRowSelectEvent) {
    this.router.navigate([$event.data.link]);
  }

  loadAssets(page: number) {
    this.loading = true;
    this.assetsService.getAssets(page, this.searchValue).subscribe((data) => {
      this.tableData = this.prepareData(data.assets);
      this.totalElements = data.totalElements;
      this.loading = false;
    });
  }

  search() {
    this.router
      .navigate(['/search'], { queryParams: { q: this.searchValue } })
      .then(() => {
        this.loadAssets(0);
      });
  }
}
