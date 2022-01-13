import { useObservable } from "react-use"
import api from "../api"
import { ProductCart } from "../api/src/classes/productCart"
import { State } from "../api/src/logic"
import orderService from "../services/order.service"
import { CartTableHeader } from "./cartTableHeader"
import ProductCartItem from "./productCart"

export default function CartComponent({id, giveUp}: any) {
    const state: State = useObservable(orderService.getOrder(id).state$)
    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle min-w-full sm:px-6 lg:px-8">
                    <div style={{ maxHeight: '600px', overflow: 'scroll' }} className="shadow border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <CartTableHeader />
                            <tbody className="bg-white divide-y divide-gray-200">
                                {state?.cart?.products.map((p: ProductCart) => <ProductCartItem 
                                key={p.product.code} p={p} id={id} />)}
                            </tbody>
                        </table>
                    </div>
                    <button 
                        style={{ backgroundColor: '#ee5f5f'}}
                        onClick={giveUp}
                        className="btn d-block rounded-1 shadow-1 text-white ml-auto mt-3"
                    >
                        Abandonner
                    </button>
                </div>
            </div>
        </div>
    )
}