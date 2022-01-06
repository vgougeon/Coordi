import { useState } from "react"
import api from '../api'
import { PRODUCTS } from "../api/src/data"
import Keyboard from "./keyboard"

export default function Scan() {
  const [input, setInput] = useState('')
  return (
    <>
      <input className="w-full h-14 p-3 border border-gray-200 shadow-sm"
        type="text" value={input} placeholder="Scan code"
        onChange={(e) => setInput(e.target.value)} />
      <div className="flex">
        <Keyboard onSubmit={(value: string) => api.scan(+value)}
          onChange={(value: string) => setInput(value)} />
        <div className="grid grid-cols-3 w-full p-4 gap-3">
          {PRODUCTS.map(product =>
            <div className="border border-gray-200 bg-white">
              <img src={ product.image } className="w-full h-20 object-contain"/>
              <div className="bg-gray-100">{ product.name }</div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}