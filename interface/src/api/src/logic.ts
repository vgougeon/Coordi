import { ProductCart } from './classes/productCart';
import { BehaviorSubject } from 'rxjs';
import { Cart } from './classes/cart';
import { Product } from './classes/product';
import { PRODUCTS } from './data';

export interface State {
    currentProduct?: Product;
    quantity?: number;
    cart: Cart;
    totalPrice?: number;

    productToReturn?: ProductCart;
    returnPressed?: boolean;
    okPressed?: boolean;
    payPressed?: boolean;
    productNotFound?: boolean;

    paidAmount?: number;
    paidMethod?: string;

    isFinished?: boolean;
}
export class Logic {
    currentState: string = 'UNKNOWN'
    state: State;

    state$ = new BehaviorSubject<any>({})
    currentState$ = new BehaviorSubject<any>('UNKNOWN')

    constructor(private observer: Function) {
        this.state = {
            cart: new Cart(),
        }
        this.state$.next(this.state)

        this.transition()
        setInterval(this.transition.bind(this), 50)
    }

    transition() {
        const c = this.checkState.bind(this)
        //ADD
        c('UNKNOWN', 'WAIT_FOR_SCAN', true)
        c('WAIT_FOR_SCAN', 'WAIT_QUANTITY', this.isProductScanned())
        c('WAIT_FOR_SCAN', 'WAIT_FOR_RETURN_SCAN', this.isReturnPressed(), this.waitForReturnScanCallback)
        c('WAIT_FOR_SCAN', 'UNKNOWN_PRODUCT', this.isUnknownProduct(), this.unknownProductCallback)
        c('WAIT_FOR_SCAN', 'RETURN_PRODUCT', this.isProductToReturn(), this.productReturnCallback)
        c('RETURN_PRODUCT', 'UNKNOWN', true)
        c('WAIT_QUANTITY', 'UPDATE_CART', this.isQuantityEntered(), this.updateCartCallback)
        c('UPDATE_CART', 'UNKNOWN', true, this.finishCallback)
        //RETURN
        c('WAIT_FOR_RETURN_SCAN', 'UNKNOWN_PRODUCT', this.isUnknownProduct(), this.unknownProductCallback)
        c('WAIT_FOR_RETURN_SCAN', 'WAIT_RETURN_QUANTITY', this.isProductScanned())
        c('WAIT_RETURN_QUANTITY', 'UPDATE_CART_RETURN', this.isQuantityEntered(), this.updateCartReturnCallback)
        c('UPDATE_CART_RETURN', 'UNKNOWN', true, this.finishCallback)
        //ERRORS
        c('UNKNOWN_PRODUCT', 'UNKNOWN', this.isOkPressed(), this.finishCallback)
        //PAY
        c('WAIT_FOR_SCAN', 'PAY', this.isPaySelectedAndAmount())
        c('PAY', 'PAY_UPDATE_TOTAL', this.didPay(), this.payUpdateTotalCallback)
        c('PAY', 'ORDER_FINISH', this.isPayComplete())
        c('PAY_UPDATE_TOTAL', 'PAY', true)
    }

    checkState(from: string, to: string, condition: boolean, callback?: Function) {
        if (this.currentState === from && condition) {
            this.currentState = to
            if (callback) callback.bind(this)()
            this.state$.next(this.state)
            this.currentState$.next(this.currentState)
            console.debug(`${from} >>> ${to}`)
            this.transition()
        }
    }

    scan(code: number) {
        this.state.currentProduct = PRODUCTS.find(p => p.code === code) || undefined
        if (!this.state.currentProduct) this.state.productNotFound = true
        this.transition()
    }
    quantity(amount: number) { this.state.quantity = amount; this.transition() }
    pressReturn() { this.state.returnPressed = true; this.transition() }
    pressOk() { this.state.okPressed = true; this.transition() }
    pressPay() { this.state.payPressed = true; this.transition() }
    return(productCart: ProductCart) {
        this.state.productToReturn = productCart;
        this.transition()
    }
    pay(amount: number, method: string) {
        this.state.paidAmount = amount;
        this.state.paidMethod = method;
        this.transition()
    }

    //#region CONDITIONS
    didPay() {
        if (this.state.paidAmount && this.state.paidMethod) return true
        return false
    }

    isPayComplete() {
        if ((this.state.totalPrice || 0) <= 0) return true
        else return false
    }

    isProductToReturn() {
        if(this.state.productToReturn) return true
        return false
    }

    isReturnPressed() {
        return !!this.state.returnPressed
    }

    isOkPressed() {
        return !!this.state.okPressed
    }

    isPaySelectedAndAmount() {
        if (this.state.payPressed && (this.state.totalPrice || 0) > 0) return true
        return false
    }

    isUnknownProduct() {
        return !!this.state.productNotFound
    }

    isProductScanned() {
        if (this.state.currentProduct) return true
        else return false
    }

    isQuantityEntered() {
        if (this.state.quantity !== undefined) return true
        else return false
    }
    //#endregion CONDTIONS

    //#region CALLBACKS
    finishCallback() {
        this.state.currentProduct = undefined;
        this.state.quantity = undefined;
        this.state.okPressed = undefined;
        this.state.isFinished = true
    }

    productReturnCallback() {
        this.state.cart.returnProduct(this.state.productToReturn!.product, this.state.productToReturn!.quantity)
        this.state.productToReturn = undefined
    }

    updateCartCallback() {
        this.state.cart.addProduct(this.state.currentProduct!, this.state.quantity!)
        this.state.totalPrice = this.state.cart.getPrice()
    }

    updateCartReturnCallback() {
        this.state.cart.returnProduct(this.state.currentProduct!, this.state.quantity!)
        this.state.totalPrice = this.state.cart.getPrice()
    }

    waitForReturnScanCallback() {
        this.state.returnPressed = undefined
    }

    unknownProductCallback() {
        this.state.productNotFound = undefined
    }

    payUpdateTotalCallback() {
        this.state.totalPrice! -= this.state.paidAmount || 0
        this.state.paidAmount = undefined;
        this.state.paidMethod = undefined;
    }
    //#endregion
}

