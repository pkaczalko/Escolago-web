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

  getCatalogue(page: number) {
    return this.http.get<CatalogueResponse>(
      `http://localhost:8080/catalogue?page=` + page,
    );
  }
}
