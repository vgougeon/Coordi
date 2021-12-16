import { Cart } from './classes/cart';
import { Product } from './classes/product';
import { PRODUCTS } from './data';
import { StateManager, StateName } from "./stateManager"

export class Logic {
    currentState: StateName = StateName.Unknown
    state: {
        method?: string;
        currentProduct?: Product;
        quantity?: number;
        cart: Cart;
        totalPrice?: number;
    }

    constructor() {
        this.state = {
            cart: new Cart(),
            method: 'CASH'
        }

        setInterval(this.loop.bind(this), 100)
    }

    loop() {
        this.checkState(StateName.Unknown, StateName.WaitForScan, true)
        this.checkState(StateName.WaitForScan, StateName.WaitQuantity, this.isProductScanned())
        this.checkState(StateName.WaitQuantity, StateName.UpdateAmount, this.isQuantityEntered())
    }

    checkState(from: StateName, to: StateName, condition: boolean) {
        if (this.currentState === from && condition) {
            this.currentState = to
            console.log(`${StateName[from]} >>> ${StateName[to]}`)
        }
    }

    scan(code: number) { this.state.currentProduct = PRODUCTS.find(p => p.code === code) || undefined }
    quantity(amount: number) { this.state.quantity = amount }

    //#region CONDITIONS
    isProductScanned() {
        if(this.state.currentProduct) return true
        else return false
    }

    isQuantityEntered() {
        if(this.state.quantity !== undefined) return true
        else return false
    }
    //#endregion CONDTIONS



    

}

