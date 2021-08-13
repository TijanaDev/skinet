import { ShopService } from './../shop.service';
import { IProduct } from './../../shared/models/products';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;

  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadTheProduct();
  }

  // tslint:disable-next-line:typedef
  loadTheProduct() {
this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get('id')).subscribe( product => {
  this.product = product;
}, error => {
  console.log(error);


});
}

}
