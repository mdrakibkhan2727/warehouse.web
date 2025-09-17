import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:5001/api';

  constructor(private http: HttpClient) { }

  getWarehouses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/warehouse`);
  }

  addWarehouse(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/warehouse`, data);
  }

  getProductsByWarehouse(warehouseId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/product/${warehouseId}`);
  }

  addProduct(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/product`, data);
  }
}
