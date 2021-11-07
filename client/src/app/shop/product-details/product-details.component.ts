import { BasketService } from './../../basket/basket.service';
import { ShopService } from './../shop.service';
import { IProduct } from './../../shared/models/products';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity = 1;

  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute,
              private bcService: BreadcrumbService,
              private basketService: BasketService) {
                this.bcService.set('@productDetails', ' ');
              }

  ngOnInit(): void {
    this.loadTheProduct();
  }

  // tslint:disable-next-line:typedef
  addItemsToBasket() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  // tslint:disable-next-line:typedef
  incrementQuantity() {
      this.quantity++;

  }

  // tslint:disable-next-line:typedef
  decrementQuantity() {
    if (this.quantity > 1){
    this.quantity--;
  }
  }

  // tslint:disable-next-line:typedef
  loadTheProduct() {
this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get('id')).subscribe( product => {
  this.product = product;
  this.bcService.set('@productDetails', product.name);
}, error => {
  console.log(error);


});
}

}
