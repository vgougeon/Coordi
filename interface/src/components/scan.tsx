import { useState } from "react"
import api from '../api'
import { PRODUCTS } from "../api/src/data"
import PayKeyboard from "./payKeyboard"
import orderService from "../services/order.service";

export default function Scan({id}: {id: number}) {
  const [input, setInput] = useState('')
  return (
    <>
      <div className="flex fx-col justify-between w-1/2">
        <input className="h-14 p-3 border border-gray-200 shadow-sm m-3 mb-0 w-100"
          type="text" value={input} placeholder="Scan code"
          onChange={(e) => setInput(e.target.value)} />

        <button className="d-block m-3 p-3 secondary rounded-1 shadow">
            Produit inconnu
        </button>
      </div>
      <div className="flex w-1/2">
        <PayKeyboard onSubmit={(value: string) => orderService.getOrder(id).scan(+value)}
          onChange={(value: string) => setInput(value)} />
        {/* <div className="grid grid-cols-3 w-full p-4 gap-3">
          {PRODUCTS.map(product =>
            <div key={ product.code } onClick={() => orderService.getOrder(id).scan(product.code)}
            className="border border-gray-200 bg-white justify-center flex relative hover:scale-105 cursor-pointer hover:border-blue-400">
              <img src={ product.image } className="w-full object-cover h-44"/>
              <div className="bg-white shadow border-t border-gray-200 h-10 flex items-center px-3 absolute bottom-0 w-full">{ product.name }</div>
            </div>
          )}
        </div> */}
      </div>
    </>
  )
}