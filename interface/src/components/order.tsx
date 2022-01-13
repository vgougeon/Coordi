import { useObservable } from "react-use"
import { State } from "../api/src/logic"
import CartComponent from "../components/cart"
import OkButton from "../components/okButton"
import { PayComponent } from "../components/pay"
import Scan from "../components/scan"
import Quantity from "../components/quantity"
import orderService from "../services/order.service"
import Header from "../layout/header"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import WaitPayAmount from "./waitPayAmount"
import UnknownProductModal from "./unknownProductModal"
export default function Order({ id }: { id: number }) {
    const currentState = useObservable(orderService.getOrder(id).currentState$)
    const state: State = useObservable(orderService.getOrder(id).state$)
    const navigate = useNavigate();
    const removeOrder = () => {
      const newId = orderService.createOrder();
      navigate(`/order/${newId}`);
      orderService.deleteOrder(id);
    }
    useEffect(() => {
      if (currentState === 'ORDER_FINISH') {
        removeOrder()
      }
    }, [currentState])
    return (
        <><Header />
            <div className="overflow-y-auto overflow-x-hidden">
                <div className="flex m-3 space-x-4">
                    <div className="w-1/2">
                        <CartComponent giveUp={removeOrder} id={id} />
                    </div>
                    <div className="w-1/2">
                        <div className="bg-gray-50 d-flex shadow">
                            <div className="flex w100">
                                {(currentState === 'WAIT_FOR_SCAN' || currentState === 'WAIT_FOR_RETURN_SCAN' || currentState == 'PAY') && <Scan id={id} />}
                                {(currentState === 'WAIT_QUANTITY' || currentState === 'WAIT_FOR_RETURN_QUANTITY') && <Quantity id={id} />}
                                {(currentState === 'PAY') && <PayComponent id={id} />}
                                {(currentState === 'PAY_WAIT_AMOUNT') && <WaitPayAmount id={id} />}
                                {(currentState === 'UNKNOWN_PRODUCT') && <UnknownProductModal id={id} />}
                            </div>
                            {(currentState === 'ORDER_FINISH') && <div className="p-4 flex flex-col items-center">
                                <h2 className="text-lg">Paiement validé.</h2>
                                <OkButton id={id} />
                            </div>}
                            {/* {state?.currentProduct && <>
                                <div className="flex items-center h-16 p-3 mt-5 bg-gray-200">
                                    <span className="font-semibold">{state.currentProduct.name}</span>
                                    <img src={state.currentProduct.image} className="object-contain w-[50px]"></img>
                                </div>
                            </>} */}
                        </div>
                        <div className="flex items-center px-5 font-semibold flex-col py-4 bg-gray-50 mt-4 shadow">
                            <span>Total : { state?.cart?.getPrice().toFixed(2)}€</span>
                            <span className="text-sm opacity-75">{ state?.cart?.products.length } articles</span>
                            { (currentState === 'WAIT_FOR_SCAN' || currentState === 'PAY') &&
                            <button onClick={() => orderService.getOrder(id).pressPay()}
                                className="my-4 border-2 border-green-400 h-12 rounded px-8 bg-green-600 hover:bg-green-500 hover:border-white shadow text-white flex items-center">
                                Payer
                            </button> }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}