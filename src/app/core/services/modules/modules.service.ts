import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModulesDTO } from '../../interfaces/modules';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModulesService {
  constructor(private http: HttpClient) {}

  getModules(): Observable<ModulesDTO[]> {
    return this.http.get<ModulesDTO[]>('http://localhost:8080/modules');
  }
}
