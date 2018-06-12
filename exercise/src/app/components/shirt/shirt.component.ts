import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Shirt } from '../../shared/shirt';
import { ShoppingCartService } from '../../core/shopping-cart.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ShirtSize } from '../../shared/shirt-size';
import { ShirtService } from '../../core/shirt.service';

@Component({
  selector: 'app-shirt',
  templateUrl: './shirt.component.html',
  styleUrls: ['./shirt.component.css']
})
export class ShirtComponent implements OnInit, OnDestroy {

  @Input() shirt: Shirt;
  subs: Subscription[] = [];
  shirtSize = ShirtSize;

  open: boolean = false;
  direction: string = 'up';
  animationMode: string = 'fling';
  actionButtonsShown: boolean = false;

  constructor(private shoppingCartService: ShoppingCartService,
    private shirtService: ShirtService,
    private router: Router) { }

  ngOnInit() {
  }

  ngOnDestroy(): any {
    if (this.subs) {
      this.subs.forEach(sub => sub.unsubscribe());
    }
    this.subs = [];
  }

  renderImage(image) {
    return '../../../assets/images/image';
  }

  addToBasket(shirt: Shirt, size: ShirtSize): any {
    this.shoppingCartService.addToShoppingCart(shirt, size);
  }

  edit() {

  }

  duplicate(shirt: Shirt) {
    this.shirtService.duplicateShirt(shirt);
  }

  delete(shirt: Shirt): void {
    this.shirtService.deleteShirt(shirt);
  }
}
