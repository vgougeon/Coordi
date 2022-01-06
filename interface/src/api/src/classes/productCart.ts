import { Cart } from './cart';
import { Product } from './product';

export class ProductCart {

  constructor(public product: Product, public quantity: number) { }

  public getPrice() {
    return this.product.price * this.quantity;
  }
}