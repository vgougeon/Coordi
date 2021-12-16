import { PRODUCTS } from './data';
import { StateName } from "./stateManager"

export class Logic {
  currentState: StateName = StateName.WaitForScan

  constructor() {}

  enterCode(code: number) {
    const product = PRODUCTS.find(p => p.code === code)
    if(product) console.log("add product")
    else this.productNotFound(code)
  }

  scanCode(code: number) {
    const product = PRODUCTS.find(p => p.code === code)
    if(product) console.log("scan product")
    else this.productNotFound(code)
  }

  productNotFound(code: number){
    console.log('Product not found', code)
  }
}
