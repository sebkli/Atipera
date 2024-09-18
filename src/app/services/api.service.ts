import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ElementInterface } from '../interfaces/element';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private http: HttpClient) {}

  public fetchData(): Observable<ElementInterface[]> {
    return this.http.get<ElementInterface[]>('http://localhost:3000/elements');
  }
}
