import { useObservable } from "react-use"
import api from "../api"
import { ProductCart } from "../api/src/classes/productCart"
import { State } from "../api/src/logic"
import orderService from "../services/order.service"
import { CartTableHeader } from "./cartTableHeader"
import ProductCartItem from "./productCart"

export default function CartComponent({id}: {id: number}) {
    const currentState = useObservable(orderService.getOrder(id).currentState$)
    const state: State = useObservable(orderService.getOrder(id).state$)
    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <CartTableHeader />
                            <tbody className="bg-white divide-y divide-gray-200">
                                {state?.cart?.products.map((p: ProductCart) => <ProductCartItem 
                                key={p.product.code} p={p} id={id} />)}
                            </tbody>
                        </table>
                        <div className="flex items-center px-5 font-semibold flex-col py-4 bg-gray-50">
                            <span>Total : { state?.cart?.getPrice().toFixed(2)}€</span>
                            <span className="text-sm opacity-75">{ state?.cart?.products.length } articles</span>
                            { currentState === 'WAIT_FOR_SCAN' &&
                            <button onClick={() => orderService.getOrder(id).pressPay()}
                            className="my-4 border-2 border-green-400 h-12 rounded px-8 bg-green-600 hover:bg-green-500 hover:border-white shadow text-white flex items-center">
                                Payer
                            </button> }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}