import { useObservable } from "react-use"
import { State } from "../api/src/logic"
import CartComponent from "../components/cart"
import OkButton from "../components/okButton"
import { PayComponent } from "../components/pay"
import Scan from "../components/scan"
import Quantity from "../components/quantity"
import orderService from "../services/order.service"
import Header from "../layout/header"

export default function Order({ id }: { id: number }) {
    const currentState = useObservable(orderService.getOrder(id).currentState$)
    const state: State = useObservable(orderService.getOrder(id).state$)
    return (
        <><Header />
            <div className="overflow-y-auto overflow-x-hidden">
                <div className="flex m-3 space-x-4">
                    <div className="w-1/2">
                        <CartComponent id={id} />
                    </div>
                    <div className="w-1/2 bg-gray-50">
                        {(currentState === 'WAIT_FOR_SCAN' || currentState === 'WAIT_FOR_RETURN_SCAN') && <Scan id={id} />}
                        {(currentState === 'WAIT_QUANTITY' || currentState === 'WAIT_FOR_RETURN_QUANTITY') && <Quantity id={id} />}
                        {(currentState === 'PAY') && <PayComponent id={id} />}
                        {(currentState === 'UNKNOWN_PRODUCT') && <div className="p-4 flex flex-col items-center">
                            <h2 className="text-lg">Produit inconnu</h2>
                            <OkButton id={id} />
                        </div>}
                        {(currentState === 'ORDER_FINISH') && <div className="p-4 flex flex-col items-center">
                            <h2 className="text-lg">Paiement validé.</h2>
                            <OkButton id={id} />
                        </div>}
                        {state?.currentProduct && <>
                            <div className="flex items-center h-16 p-3 mt-5 bg-gray-200">
                                <span className="font-semibold">{state.currentProduct.name}</span>
                                <img src={state.currentProduct.image} className="object-contain w-[50px]"></img>
                            </div>
                        </>}
                    </div>
                </div>
            </div>
        </>
    )
}