import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ShoppingCartService } from '../../core/shopping-cart.service';
import { SlidingPanelsService } from '../../core/sliding-panels.service';
import { Subscription } from 'rxjs';

const SHIPPING_PRICE = 9.99;
const TAX_PERCENTAGE = 0.13;

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {

  @Output() checkedOut;
  sub: Subscription;
  paymentMethodForm: FormGroup;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;

  constructor(private fb: FormBuilder,
              private shoppingCartService: ShoppingCartService,
              private slidingPanelsService: SlidingPanelsService) {
                this.checkedOut = new EventEmitter();
  }

  ngOnInit() {
    this.paymentMethodForm = this.fb.group({
      cardNumber: [],
      expiration: [],
      cvv: []
    });

    this.sub = this.slidingPanelsService.paymentMethod$.subscribe((state) => {
      if (state) {
        this.calculatePrices();
      }
    });
  }

  checkout(): void {
    this.checkedOut.emit();
  }

  private calculatePrices(): void {
    this.shipping = SHIPPING_PRICE;
    this.subtotal = this.shoppingCartService.calculateSubtotal();
    this.tax = this.subtotal * TAX_PERCENTAGE;
    this.total = this.subtotal + this.shipping + this.tax;
  }

}
