import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-warehouse',
  imports:[CommonModule,FormsModule,ReactiveFormsModule,BrowserModule,HttpClientModule],
  templateUrl: './werehouse.component.html',
  styleUrls: ['./werehouse.component.css']
})
export class WarehouseComponent implements OnInit {
  warehouseForm: FormGroup;
  productForm: FormGroup;
  warehouses: any[] = [];
  products: any[] = [];
  selectedWarehouseId: number | null = null;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.warehouseForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required]
    });

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      quantity: [0, Validators.required],
      warehouseId: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.loadWarehouses();
  }

  loadWarehouses() {
    this.api.getWarehouses().subscribe((data: any) => {
      this.warehouses = data;
    });
  }

  addWarehouse() {
    if (this.warehouseForm.valid) {
      this.api.addWarehouse(this.warehouseForm.value).subscribe(() => {
        this.warehouseForm.reset();
        this.loadWarehouses();
      });
    }
  }

  addProduct() {
    if (this.productForm.valid) {
      this.api.addProduct(this.productForm.value).subscribe(() => {
        this.productForm.reset();
        if(this.selectedWarehouseId)
          this.loadProducts(this.selectedWarehouseId);
      });
    }
  }

  loadProducts(warehouseId: number) {
    this.selectedWarehouseId = warehouseId;
    this.api.getProductsByWarehouse(warehouseId).subscribe((data: any) => {
      this.products = data;
    });
  }
}
