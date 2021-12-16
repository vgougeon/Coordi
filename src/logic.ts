import { Cart } from './classes/cart';
import { Product } from './classes/product';
import { ProductCart } from './classes/productCart';
import { PRODUCTS } from './data';
import { StateName } from "./stateManager"

export class Logic {
  currentState: StateName = StateName.WaitForScan;
  state : {
    return?: boolean;
    method?: string;
    currentProduct?: Product;
    cart: Cart;
    totalPrice?: number;
  }

  constructor() {
    this.state = {
      cart: new Cart()
    }
  }

  enterCode(code: number) {
    const product = PRODUCTS.find(p => p.code === code)
    if(product){
      this.state.currentProduct = product;
    } 
    else this.productNotFound(code)
  }

  scanCode(code: number) {
    const product = PRODUCTS.find(p => p.code === code)
    if(product){
      this.state.currentProduct = product;
      console.log('*** Added product ***');
      console.log(` REF ${product.code}\n Name ${product.name} \n Price ${product.price} \n`);
    } 
    else this.productNotFound(code)
  }

  productNotFound(code: number){
    console.error(`*** Product not found *** \n REF: ${code}`)
  }

  enterQuantity(qty: number){
    if(this.state.return) {
      this.state.cart.returnProduct(this.state.currentProduct!, qty)
    }
    else this.state.cart.addProduct(this.state.currentProduct!, qty)

    delete this.state.return
  }

  pressOkOnError(){
    console.log('Cick OK on modal error')
  }

  payment(){
    this.state.totalPrice = this.state.cart.getPrice()
    console.log(`initiate payment, total price is ${ this.state.totalPrice }`);
    console.log(this.state.cart.products.map(p => `${p.quantity} unité(s) de ${p.product.name}`).join('\n'))
  }

  selectPaymentMethod(method: string){
    this.state.method = method
  }

  pay(amount: number) {
    if(this.state.method === 'CASH') this.payWithCash(amount)
    else this.payWithCB(amount)
  }

  payWithCash(amount: number){
    console.log(this.state.totalPrice)
    this.state.totalPrice = (this.state.totalPrice || 0) - amount;
    console.log(`Left to pay : ${this.state.totalPrice}`)
  }

  payWithCB(amount: number){
    console.log(this.state.totalPrice)
    this.state.totalPrice = Math.(this.state.totalPrice || 0) - amount;
    console.log(`Left to pay : ${this.state.totalPrice}`)
  }

  returnProduct(){
    this.state.return = true
  }

}
