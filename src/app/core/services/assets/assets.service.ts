import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssetPagedResponse, JoinAssetsDTO } from '../../interfaces/assets';

@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  constructor(private http: HttpClient) {}

  getLastAssets() {
    return this.http.get<JoinAssetsDTO[]>('http://localhost:8080/assets/last');
  }

  getAssets(page: number = 0, search: string = '', limit: number = 10) {
    search = search.trim().replace(' ', '+');
    return this.http.get<AssetPagedResponse>(
      'http://localhost:8080/assets?page=' +
        page +
        '&limit=' +
        limit +
        '&search=' +
        search,
    );
  }
}
