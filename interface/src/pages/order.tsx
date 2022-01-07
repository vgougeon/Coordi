import orderService from "../services/order.service"
import { useParams } from 'react-router-dom';
import Order from "../components/order"

export default function OrderPage() {
    const id = Number(useParams()['id']) || 0
    console.log(id, orderService.getOrder(id))
    if(orderService.getOrder(id)) return (
        <Order id={id} />
    )
    return null
}