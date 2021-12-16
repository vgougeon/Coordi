import { Cart } from './classes/cart';
import { Product } from './classes/product';
import { PRODUCTS } from './data';

export class Logic {
    currentState: string = 'UNKNOWN'
    state: {
        method?: string;
        currentProduct?: Product;
        quantity?: number;
        cart: Cart;
        totalPrice?: number;

        returnPressed?: boolean;
        okPressed?: boolean;
        payPressed?: boolean;
        productNotFound?: boolean;

        paidAmount?: number;
        paidMethod?: string;
    }

    constructor() {
        this.state = {
            cart: new Cart(),
            method: 'CASH'
        }

        this.transition()
        setInterval(this.transition.bind(this), 50)
    }

    transition() {
        //ADD
        this.checkState('UNKNOWN', 'WAIT_FOR_SCAN', true)
        this.checkState('WAIT_FOR_SCAN', 'WAIT_QUANTITY', this.isProductScanned())
        this.checkState('WAIT_FOR_SCAN', 'WAIT_FOR_RETURN_SCAN', this.isReturnPressed())
        this.checkState('WAIT_FOR_SCAN', 'UNKNOWN_PRODUCT', this.isUnknownProduct())
        this.checkState('WAIT_QUANTITY', 'UPDATE_CART', this.isQuantityEntered())
        this.checkState('UPDATE_CART', 'UNKNOWN', true)
        //RETURN
        this.checkState('WAIT_FOR_RETURN_SCAN', 'UNKNOWN_PRODUCT', this.isUnknownProduct())
        this.checkState('WAIT_FOR_RETURN_SCAN', 'WAIT_RETURN_QUANTITY', this.isProductScanned())
        this.checkState('WAIT_RETURN_QUANTITY', 'UPDATE_CART_RETURN', this.isQuantityEntered())
        this.checkState('UPDATE_CART_RETURN', 'UNKNOWN', true)
        //ERRORS
        this.checkState('UNKNOWN_PRODUCT', 'UNKNOWN', this.isOkPressed())
        //PAY
        this.checkState('WAIT_FOR_SCAN', 'PAY', this.isPaySelectedAndAmount())
        this.checkState('PAY', 'PAY_UPDATE_TOTAL', this.didPay())
        this.checkState('PAY', 'ORDER_FINISH', this.isPayComplete())
        this.checkState('PAY_UPDATE_TOTAL', 'PAY', true)

    }

    checkState(from: string, to: string, condition: boolean) {
        if (this.currentState === from && condition) {
            this.setState(to)
            console.debug(`${from} >>> ${to}`)
        }
    }

    setState(state: string) {
        this.currentState = state
        switch (state) {
            case 'UNKNOWN':
                this.state.currentProduct = undefined;
                this.state.quantity = undefined;
                this.state.okPressed = undefined;
                break;
            case 'UPDATE_CART':
                this.state.cart.addProduct(this.state.currentProduct!, this.state.quantity!)
                this.state.totalPrice = this.state.cart.getPrice()
                break;
            case 'UPDATE_CART_RETURN':
                this.state.cart.returnProduct(this.state.currentProduct!, this.state.quantity!)
                this.state.totalPrice = this.state.cart.getPrice()
                break;
            case 'WAIT_FOR_RETURN_SCAN':
                this.state.returnPressed = undefined
                break;
            case 'UNKNOWN_PRODUCT':
                this.state.productNotFound = undefined
                break;
            case 'PAY_UPDATE_TOTAL':
                this.state.totalPrice! -= this.state.paidAmount || 0
                this.state.paidAmount = undefined;
                this.state.paidMethod = undefined;
                break;
        }
    }

    scan(code: number) {
        this.state.currentProduct = PRODUCTS.find(p => p.code === code) || undefined
        if (!this.state.currentProduct) this.state.productNotFound = true
    }
    quantity(amount: number) { this.state.quantity = amount;}
    pressReturn() { this.state.returnPressed = true; }
    pressOk() { this.state.okPressed = true; }
    pressPay() { this.state.payPressed = true; }
    pay(amount: number, method: string) {
        this.state.paidAmount = amount;
        this.state.paidMethod = method;
    }

    //#region CONDITIONS
    didPay() {
        if(this.state.paidAmount && this.state.paidMethod) return true
        return false
    }

    isPayComplete() {
        if((this.state.totalPrice || 0) <= 0) return true
        else return false
    }

    isReturnPressed() {
        return !!this.state.returnPressed
    }

    isOkPressed() {
        return !!this.state.okPressed
    }

    isPaySelectedAndAmount() {
        if(this.state.payPressed && (this.state.totalPrice || 0) > 0) return true
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





}

