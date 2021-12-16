import { ProductCart } from "./productCart"
import { Product } from "./product"

export class Cart {
    private _products: ProductCart[] = []
    
    constructor() {}
    
    public get products(): ProductCart[] {
        return this._products
    }
    public set products(value: ProductCart[]) {
        this._products = value
    }

    public getPrice() {
        return this._products.reduce((acc: number, productCart: ProductCart) => {
            acc += productCart.product.price * productCart.quantity;
            return acc
        }, 0)
    }

    public clear() {
        this.products = [];
    }

    public addProduct(product: Product, qty: number) {
        const inCart = this.products.find(pCart => pCart.product === product)
        if(inCart) { inCart.quantity += qty; console.log("already in cart") }
        else this.products = [...this.products, new ProductCart(this, product, qty)]
    }

    public returnProduct(product: Product, qty: number) {
        const inCart = this.products.find(pCart => pCart.product === product)
        if(inCart && inCart.quantity >= qty) inCart.quantity -= qty;
        if(inCart && inCart.quantity === 0) this.products = this.products.filter(products => product !== products.product)
    }
}