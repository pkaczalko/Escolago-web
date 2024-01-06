import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemResponseDTO } from '../../interfaces/items';

@Injectable({
  providedIn: 'root',
})
export class CroomService {
  constructor(private http: HttpClient) {}

  getItems() {
    return this.http.get<ItemResponseDTO>('http://localhost:8080/croom');
  }
}
