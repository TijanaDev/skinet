import { BasketService } from './basket.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IBasket, IBasketItem } from '../shared/models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basket$: Observable<IBasket>;
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  // tslint:disable-next-line:typedef
  removeBasketItem(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
  }

  // tslint:disable-next-line:typedef
  incrementQuantity(item: IBasketItem) {
    this.basketService.incrementItemQuantity(item);
  }

  // tslint:disable-next-line:typedef
  decrementQuantity(item: IBasketItem) {
    this.basketService.decrementItemQuantity(item);
  }

}
