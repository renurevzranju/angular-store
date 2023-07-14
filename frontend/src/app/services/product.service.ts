import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../helpers/product';
import { environment as env } from '../../environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  commonAPI: string = `${env.endpointURI}api/products/`;

  constructor(private http: HttpClient) { }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.commonAPI + "category/" + category);
  }

  getProductsByID(id: string): Observable<Product> {
    return this.http.get<Product>(this.commonAPI + id);
  }
}
