import { useState } from "react";
import Keyboard from "../components/keyboard";
import { useNavigate } from 'react-router-dom'
import orderService from "../services/order.service";

export default function LoginPage() {
    const [code, setCode] = useState('')
    const navigate = useNavigate()
    const login = (val: string) => {
        if (val === '1234') {
            const id = orderService.createOrder()
            navigate('/order/' + id)
        }
    }
    return (
        <>
            <div className="mt-5 py-5 w-full flex justify-center items-center flex-col">
                <input type="text" value={code} readOnly
                    className="h-16 text-lg text-center bg-white shadow border broder-gray-200 font-semibold" />
                <Keyboard onSubmit={(val: string) => login(val)}
                    onChange={(val: string) => setCode(val)} />
            </div>
        </>
    )
}