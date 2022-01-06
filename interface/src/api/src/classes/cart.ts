import { ProductCart } from "./productCart"
import { Product } from "./product"

export class Cart {
    public products: ProductCart[] = []
    
    constructor() {}

    public getPrice() {
        return this.products.reduce((acc: number, productCart: ProductCart) => {
            acc += productCart.product.price * productCart.quantity;
            return acc
        }, 0)
    }

    public clear() {
        this.products = [];
    }

    public addProduct(product: Product, qty: number) {
        if(qty > 1) return
        const inCart = this.products.find(pCart => pCart.product === product)
        if(inCart) { inCart.quantity += qty; console.log("already in cart") }
        else this.products = [...this.products, new ProductCart(product, qty)]
    }

    public returnProduct(product: Product, qty: number) {
        const inCart = this.products.find(pCart => pCart.product === product)
        if(inCart && inCart.quantity >= qty) inCart.quantity -= qty;
        if(inCart && inCart.quantity === 0) this.products = this.products.filter(products => product !== products.product)
    }
}