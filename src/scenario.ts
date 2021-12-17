import { delay, of, tap } from 'rxjs';
import { Logic } from './logic';

const api = new Logic((state: any) => { console.log(state)})

export function scenario() {
    of(true)
        .pipe(
            tap(() => console.log('Hello')),
            delay(1000),
            tap(() => api.scan(1)),
            delay(1000),
            tap(() => api.quantity(1)),
            delay(1000),
            tap(() => api.scan(1)),
            delay(1000),
            tap(() => api.quantity(1)),
            delay(1000),
            tap(() => console.log(api.state.cart.products)),
            delay(1000),
            tap(() => api.pressPay()),
            delay(1000),
            tap(() => api.pay(0.75, 'CASH')),
            delay(1000),
            tap(() => api.pay(0.25, 'CASH')),
        )
        .subscribe()
}


