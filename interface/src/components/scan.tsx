import { useState } from "react"
import api from '../api'

export default function Scan() {
    const [input, setInput] = useState('')
    const keyPress = (e: any) => {
      if(e.key === 'Enter') {
        api.scan(+input)
      }
    }
    return (
        <>
        <input className="w-full h-14 p-3 border border-gray-200 shadow-sm"
        type="text" value={ input } onKeyDown={keyPress} placeholder="Scan code"
        onChange={(e) => setInput(e.target.value)} />
        </>
    )
}