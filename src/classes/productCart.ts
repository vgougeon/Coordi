import { Cart } from './cart';
import { Product } from './product';

export class ProductCart {

  constructor(private _cart: Cart, public product: Product, public quantity: number) { }

  public get cart(): Cart {
    return this._cart;
  }
  public set cart(value: Cart) {
    this._cart = value;
  }

  public getPrice() {
    return this.product.price * this.quantity;
  }
}