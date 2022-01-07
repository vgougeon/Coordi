import { ImCancelCircle } from 'react-icons/im'
import { BsCheckLg } from 'react-icons/bs'
import { useState } from 'react'
export default function PayKeyboard({onChange, onSubmit} : { onChange?: Function, onSubmit?: Function }) {
    const keys = Array(9).fill(1)
    const [value, setValue] = useState('')
    const set = (val: string) => {
        val = value + val
        setValue(val)
        onChange?.(val)
    }
    const reset = () => { setValue(''); onChange?.('') }
    return (
        <div className="grid grid-cols-3 gap-3 p-3 flex-shrink-0 h-fit w100">
        { keys.map((item: number, index: number) =>
            <button key={index}
            onClick={() => set((index + 1).toString())}
            className="secondary w-full h-16 bg-white rounded-2 border-gray-200 border">
                { index + 1 }
            </button>
        )}
        <button onClick={() => reset()}
        className="w-full h-16 border border-gray-300 bg-white rounded-2 flex items-center justify-center"><ImCancelCircle /></button>
        <button onClick={() => set((0).toString())}
        className="secondary w-full h-16 bg-white rounded-2 flex items-center justify-center">0</button>
        <button onClick={() => onSubmit?.(value)}
        className="primary w-full h-16 bg-white rounded-2 flex items-center justify-center"><BsCheckLg /></button>
        </div>
    )
}