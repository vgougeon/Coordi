import { useState } from "react"
import { useObservable } from "react-use"
import { State } from "../api/src/logic"
import Keyboard from "./keyboard"
import { useParams } from 'react-router-dom'
import orderService from "../services/order.service"

export function PayComponent({id}: {id: number}) {
    const [input, setInput] = useState('')
    const state: State = useObservable(orderService.getOrder(id).state$)
    const pay = () => {
        orderService.getOrder(id).pay(+input, 'CASH')
    }
    return (
        <div className="p-4">
            <h2 className="font-semibold text-xl">Pay</h2>
            <h2 className="font-semibold text-lg">Reste à payer : 
            <span className="italic"> { (((state?.totalPrice) || 0) - ((state?.paidAmount) || 0)).toFixed(2) }€</span></h2>
            <h3 className="">Montant : <span className="italic">{ (+input).toFixed(2) }€</span></h3>
            <Keyboard onChange={(val: string) => setInput(val)} onSubmit={() => pay()} />
        </div>
    )
}