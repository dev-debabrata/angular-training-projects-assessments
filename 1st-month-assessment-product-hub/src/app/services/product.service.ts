import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api = 'https://dummyjson.com/products?limit=20';
  private http = inject(HttpClient);
  private _selected = new BehaviorSubject<Product | null>(null);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api);
  }

  getProductsById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`);
  }
}
