import { useState } from "react"
import orderService from "../services/order.service"
import Keyboard from "./keyboard"

export default function Scan({id}: {id: number}) {
  const [input, setInput] = useState('')
  return (
    <>
      <input className="w-full h-14 p-3 border border-gray-200 shadow-sm m-3 mb-0"
        type="text" value={input} placeholder="Définir quantité"
        onChange={(e) => setInput(e.target.value)} />
      <Keyboard onSubmit={(value: string) => orderService.getOrder(id).quantity(+value)}
      onChange={(value: string) => setInput(value)} />
    </>
  )
}