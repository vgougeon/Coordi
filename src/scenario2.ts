import { Logic } from './logic2';

const api = new Logic()

api.dispatch('code', 1) // 0 wait for scan
api.dispatch('quantity', 100) // 1 wait quantity
api.dispatch('code', 1) // 0 wait for scan
api.dispatch('quantity', 1) // 1 wait quantity
api.dispatch('code', 1) // 0 wait for scan
api.dispatch('return') // 1 wait quantity
api.dispatch('quantity', 1) // 11 wait for return quantity

api.dispatch('code', 142511) // 0 wait for scan (invalid code)
api.dispatch('ok') // press ok for error

api.dispatch('pay')
api.dispatch('goToSelectMethod')
api.dispatch('selectMethod', 'CASH')
api.dispatch('pay', 1)


console.log(api.getState())


















//Hors scope
//Commande terminée, reset
// api.reset()

