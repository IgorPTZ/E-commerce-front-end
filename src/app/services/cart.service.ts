import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();

  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {

    // Check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;

    let existingCartItem: CartItem = undefined;

    if(this.cartItems.length > 0) {

      // Find the item in the cart based on item id
      for(let tempCartItem of this.cartItems) {

        if(tempCartItem.id === theCartItem.id) {
          
          existingCartItem = tempCartItem;

          break;
        }
      }

      // Check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if(alreadyExistsInCart) {
      // Increment the quantity
      existingCartItem.quantity++;
    }
    else {
      // Just add the item to the array
      this.cartItems.push(theCartItem);
    }

    // Compute cart total price and total quantity
    this.computCartTotals();
  }

  computCartTotals() {
    
    let totalPriceValue: number = 0;
    
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems) {
      
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;

      totalQuantityValue += currentCartItem.quantity;
    }

    // Publish the new values... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);

    this.totalQuantity.next(totalQuantityValue);

    // Log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    
    console.log('Contents of the cart');

    for(let tempCartItem of this.cartItems) {
      
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;

      console.log(`Name: ${tempCartItem.name}, Quantity=${tempCartItem.quantity}, UnitPrice=${tempCartItem.unitPrice}, SubTotalPrice=${subTotalPrice}`);
    }

    console.log(`TotalPrice: ${totalPriceValue.toFixed(2)}, TotalQuantity: ${totalQuantityValue}`);
    
    console.log('------------------------------------');
  }
}
