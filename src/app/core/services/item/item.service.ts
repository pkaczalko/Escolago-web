import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemDTO, ItemResponseDTO } from '../../interfaces/items';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}

  getItems(page: number = 0, search: string = '', action: string = '') {
    search = search.trim().replace(' ', '+');
    return this.http.get<ItemResponseDTO>(
      `http://localhost:8080/croom?page=` +
        page +
        `&search=` +
        search +
        `&action=` +
        action,
    );
  }

  addItem(item: ItemDTO) {
    return this.http.post<ItemDTO>(
      `http://localhost:8080/croom/item/add`,
      item,
    );
  }

  getItemById(id: number) {
    return this.http.get<ItemDTO>(`http://localhost:8080/croom/item/` + id);
  }
}
