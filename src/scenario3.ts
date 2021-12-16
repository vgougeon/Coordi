import { delay, of, tap } from 'rxjs';
import { Logic } from './logic3';

const api = new Logic()

of(true)
.pipe(
    tap(() => console.log('Hello')),
    delay(1000),
    tap(() => api.scan(1)),
    delay(1000),
    tap(() => api.quantity(1)),
)
.subscribe()
