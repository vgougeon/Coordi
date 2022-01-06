import api from "../api"
import { Cart } from "../api/src/classes/cart"
import { ProductCart } from "../api/src/classes/productCart"
import { CartTableHeader } from "./cartTableHeader"
import ProductCartItem from "./productCart"

export default function CartComponent({ products, cart }: { products: ProductCart[], cart?: Cart }) {
    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <CartTableHeader />
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.map((p: ProductCart) => <ProductCartItem p={p} />)}
                            </tbody>
                        </table>
                        <div className="flex items-center px-5 font-semibold flex-col py-4 bg-gray-50">
                            <span>Total : { cart?.getPrice().toFixed(2)}€</span>
                            <span className="text-sm opacity-75">{ products.length } articles</span>
                            <button onClick={() => api.pressPay()}
                            className="my-4 border-2 border-green-400 h-12 rounded px-8 bg-green-600 hover:bg-green-500 hover:border-white shadow text-white flex items-center">
                                Payer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}