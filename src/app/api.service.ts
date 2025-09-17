import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:5001/api/v1/';

  constructor(private http: HttpClient) { }

  getWarehouses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/warehouses`);
  }

  addWarehouse(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/warehouse`, data);
  }

  getProductsByWarehouse(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/warehouses/${id}/inventory`);
  }

  addProduct(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, data);
  }
}
