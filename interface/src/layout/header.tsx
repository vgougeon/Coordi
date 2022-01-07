import { FaPowerOff } from "react-icons/fa"
import { HiDotsHorizontal } from "react-icons/hi"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useObservable } from "react-use";
import orderService from "../services/order.service";
import { IoMdAdd } from 'react-icons/io'

export default function Header() {
    const orders = useObservable(orderService.ordersList$)
    const navigate = useNavigate()
    const active = useParams()['id']
    const createOrder = () => {
        const id = orderService.createOrder()
        navigate(`/order/${id}`)
    }
    return (
        <header className="h-14 bg-gray-500 p-5 flex items-center text-white justify-between">
            <HiDotsHorizontal size={22} />
            <div className="flex space-x-4 items-center">
                {orders?.map(order =>
                    <Link to={`/order/${order}`}>
                        <div 
                        className={`px-5 h-9 flex items-center bg-opacity-20 bg-white ${(order == active) && 'border border-white'}
                        rounded hover:bg-opacity-40 cursor-pointer hover:text-white`}>Commande #{order}</div>
                    </Link>
                )}
                <div onClick={createOrder}
                className="px-5 h-9 flex items-center bg-opacity-20 bg-white rounded hover:bg-opacity-40 cursor-pointer hover:text-white">
                    <IoMdAdd />
                </div>
                <Link to="/"><FaPowerOff size={22} /></Link>
            </div>

        </header>
    )
}