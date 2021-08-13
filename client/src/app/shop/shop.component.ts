import { ShopParams } from './../shared/models/shopParams';
import { IType } from './../shared/models/productType';
import { ShopService } from './shop.service';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/products';
import { IBrand } from '../shared/models/brand';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
products: IProduct[];
brands: IBrand[];
types: IType[];
shopParams = new ShopParams();
totalCount: number;
@ViewChild('search', {static: true}) searchTearm: ElementRef;

sortOptions = [
 { name: 'Alphabetical', value: 'name'},
 { name: 'Price: Low to High', value: 'priceAsc'},
 { name: 'Price: High to Low', value: 'priceDesc'}

];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  // tslint:disable-next-line:typedef
  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line:typedef
  getBrands() {
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line:typedef
  getTypes() {
    this.shopService.getTypes().subscribe(response => {
      this.types = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line:typedef
  onBrandsSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  // tslint:disable-next-line:typedef
  onTypesSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  // tslint:disable-next-line:typedef
  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  // tslint:disable-next-line:typedef
  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event){
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  // tslint:disable-next-line:typedef
  onSearch() {
    this.shopParams.search = this.searchTearm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  // tslint:disable-next-line:typedef
  onReset() {
    this.searchTearm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}
