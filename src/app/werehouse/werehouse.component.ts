import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
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
