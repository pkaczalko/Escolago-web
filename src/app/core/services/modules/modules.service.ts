import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Modules} from "../../interfaces/modules";

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  constructor(private http: HttpClient) { }


  getModules(): any {
    return this.http.get('http://localhost:3000/modules');
  }
}
