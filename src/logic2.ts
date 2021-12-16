import { Cart } from './classes/cart';
import { Product } from './classes/product';
import { PRODUCTS } from './data';
import { StateManager, StateName } from "./stateManager"

export class Logic {
  currentState: StateManager = StateManager.getInstance(StateName.WaitForScan);
  state: {
    method?: string;
    currentProduct?: Product;
    cart: Cart;
    totalPrice?: number;
  }

  constructor() {
    this.state = {
      cart: new Cart(),
      method: 'CASH'
    }

    //Lecture des entrées
    // checkState(UNKNOWN, WAITFORSCAN, true);
    // checkState(WAITFORSCAN, WAITQUANTITY, isProductScanned());
    // checkState(WAITFORSCAN, WAITQUANTITY, isProductScanned());
    // checkState(WAITFORSCAN, WAITQUANTITY, isProductScanned());
    // checkState(WAITFORSCAN, WAITQUANTITY, isProductScanned());
    // checkState(WAITFORSCAN, WAITQUANTITY, isProductScanned());
    // checkState(WAITFORSCAN, WAITQUANTITY, isProductScanned());
    // checkState(WAITFORSCAN, WAITQUANTITY, isProductScanned());
    // checkState(WAITFORSCAN, WAITQUANTITY, isProductScanned());
    
    // switch(this.currentState){
    //   case UNKNOWN: break;
    //   case WAITFORSCAN: 
    //     //Allumer la douchette
    //     //Scan le produit
    //     this.state.currentProduct = getProductById(value)
    //     break;
    //   case WAITFORQUANTITY:
    //     //LIRE le pavé numérique
    // }

    StateManager.getInstance(StateName.WaitForScan).methods = {
      code: (code: number) => {
        const product = PRODUCTS.find(p => p.code === code)
        if (product) {
          this.state.currentProduct = product;
          this.currentState = StateManager.getInstance(StateName.WaitQuantity)
        }
        else this.currentState = StateManager.getInstance(StateName.UnknownProduct)
      },
      pay: () => {
        if (this.state.cart.getPrice() > 0) {
          this.state.totalPrice = this.state.cart.getPrice()
          this.currentState = StateManager.getInstance(StateName.WaitForPay)
        }
          
      }
    }
    StateManager.getInstance(StateName.WaitQuantity).methods = {
      quantity: (qty: number) => {
        this.state.cart.addProduct(this.state.currentProduct!, qty)
        this.currentState = StateManager.getInstance(StateName.WaitForScan)
      },
      return: () => {
        this.currentState = StateManager.getInstance(StateName.WaitReturnQuantity)
      },
    }
    StateManager.getInstance(StateName.WaitReturnQuantity).methods = {
      quantity: (qty: number) => {
        this.state.cart.returnProduct(this.state.currentProduct!, qty)
        this.currentState = StateManager.getInstance(StateName.WaitForScan)
      },
    }
    StateManager.getInstance(StateName.UnknownProduct).methods = {
      ok: () => {
        this.currentState = StateManager.getInstance(StateName.WaitForScan)
      }
    }
    StateManager.getInstance(StateName.PaymentMethod).methods = {
      selectMethod: (method: string) => {
        this.state.method = method
        this.currentState = StateManager.getInstance(StateName.WaitForPay)
      }
    }
    StateManager.getInstance(StateName.WaitForPay).methods = {
      pay: (amount: number) => {
        this.state.totalPrice = (this.state.totalPrice || 0) - amount
        if (this.state.totalPrice <= 0) this.currentState = StateManager.getInstance(StateName.PayOK)
        else {
          console.log("LEFT TO PAY : ", this.state.totalPrice)
          this.currentState = StateManager.getInstance(StateName.WaitForPay)
        }
      },
      goToSelectMethod: () => {
        this.currentState = StateManager.getInstance(StateName.PaymentMethod)
      }
    }
    StateManager.getInstance(StateName.PayOK).methods = {
      ok: () => {
        console.log("ORDER FINISHED")
      }
    }
    StateManager.getInstance(StateName.PayError).methods = {
      ok: () => {
        this.currentState = StateManager.getInstance(StateName.WaitForPay)
      }
    }
  }

  dispatch(action: string, ...parameters: any) {
    const before = StateName[this.currentState.stateName]
    this.currentState.methods[action]?.(...parameters)
    const after = StateName[this.currentState.stateName]
    console.log(`${before} >>> ${action} >>> ${after}`)
  }

  getState() {
    return {
      ...this.state
    }
  }

}
