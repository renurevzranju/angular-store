import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { environment as env } from '../../environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  commonAPI: string = `${env.endpointURI}api/products/`;

  /**
 * @constructor
 * @param {HttpClient} http To connect with the express server
 */
  constructor(private http: HttpClient) { }

  /**
 * Get the product based on the category
 * @param {string} category The category to filter
 * @return {Product[]} Returns list of products
 */
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.commonAPI}"category/${category}`);
  }

  /**
 * Get the product based on the id of the product
 * @param {number} id id of the product
 * @return {Product} Returns the product detail
 */
  getProductsByID(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.commonAPI}${id}`);
  }
}
