import { useState } from "react"
import { useObservable } from "react-use"
import api from "../api"
import { State } from "../api/src/logic"
import Keyboard from "./keyboard"

export function PayComponent() {
    const [input, setInput] = useState('')
    const state: State = useObservable(api.state$)
    const pay = () => {
        api.pay(+input, 'CASH')
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