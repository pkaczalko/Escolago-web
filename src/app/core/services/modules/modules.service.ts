import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Module } from '../../interfaces/modules';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModulesService {
  constructor(private http: HttpClient) {}

  getModules(): Observable<Module[]> {
    return this.http.get<Module[]>('http://localhost:8080/modules');
  }
}
