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
    
  }
}
