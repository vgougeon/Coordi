import { BehaviorSubject } from 'rxjs';
import { Logic } from './../api/src/logic';
export class OrderService {
    orders: Record<number, Logic> = {}
    ordersList$ = new BehaviorSubject<string[]>([])
    id = 0

    getOrder(id: number) {
        return this.orders[id]
    }

    createOrder() {
        this.orders[++this.id] = new Logic(() => {})
        this.ordersList$.next(Object.keys(this.orders))
        console.log(this.orders)
        return this.id
    }
}

export default new OrderService()