import { Component, OnInit } from '@angular/core';
import { TableModule, TableRowSelectEvent } from 'primeng/table';
import { AssetsService } from '../../../core/services/assets/assets.service';
import { JoinAssetsDTO } from '../../../core/interfaces/assets';
import { Router } from '@angular/router';

export interface RecentlyAdded {
  name: string;
  assetId: number;
  dateAdded: string;
  id: number;
  link: string;
}

@Component({
  selector: 'app-recently-added',
  standalone: true,
  imports: [TableModule],
  templateUrl: './recently-added.component.html',
  styleUrl: './recently-added.component.css',
})
export class RecentlyAddedComponent implements OnInit {
  tableData!: RecentlyAdded[];

  constructor(
    private assetsService: AssetsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.assetsService.getLastAssets().subscribe((data) => {
      this.tableData = this.prepareData(data);
    });
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
    console.log($event.data);
    this.router.navigate([$event.data.link]);
  }
}
