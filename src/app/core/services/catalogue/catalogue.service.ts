import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CatalogueResponse } from '../../interfaces/catalogue';
import { Shared } from '../../../shared/shared';

@Injectable({
  providedIn: 'root',
})
export class CatalogueService {
  constructor(private http: HttpClient) {}

  getCatalogue(page: number = 0, search: string = '', action: string = '') {
    search = search.trim().replace(' ', '+');
    return this.http.get<CatalogueResponse>(
      `http://localhost:8080/catalogue?page=` +
        page +
        `&search=` +
        search +
        `&action=` +
        action,
    );
  }
}
