import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogueService {
  constructor(private http: HttpClient) {}

  getCatalogue(page: number) {
    return this.http.get<any>(`http://localhost:3000/catalogue?_page=` + page, {
      observe: 'response',
    });
  }
}
