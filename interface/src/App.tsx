import { useObservable, useRendersCount } from 'react-use';
import api from './api'
import { ProductCart } from './api/src/classes/productCart';
import { State } from './api/src/logic';
import Quantity from './components/quantity';
import Scan from './components/scan';

function App() {
  const currentState = useObservable(api.currentState$)
  const render = useRendersCount()
  const state: State = useObservable(api.state$)
  console.log(state?.cart.products.map((p) => ([p.product.name, p.quantity]).join(' - ')))
  const products = state?.cart.products || []
  return (
    <>{currentState} - {render}
      <div className="flex m-3">
        <div className="w-2/3 h-[500px] bg-gray-100">
          <div className="w-full h-12 p-3 bg-gray-200">Panier</div>
          { products.map((p: ProductCart) => 
            <div className="flex items-center w-full h-16 px-4 border-t border-gray-200" key={Math.random() + Date.now()}>
              <img src={p.product.image } className="object-contain w-[50px]"></img>
              <span>{ p.product.name } (x{ p.quantity })</span>
              <button onClick={() => {
                api.pressReturn()
                api.scan(p.product.code)
                api.quantity(p.quantity)
              }}
              className="flex items-center h-8 px-3 ml-auto text-xs text-white bg-red-500">
                Supprimer
              </button>
            </div>
          )}
        </div>
        <div className="w-1/3 h-[500px] bg-gray-50">
          { (currentState === 'WAIT_FOR_SCAN' || currentState === 'WAIT_FOR_RETURN_SCAN') && <Scan />}
          { (currentState === 'WAIT_QUANTITY' || currentState === 'WAIT_FOR_RETURN_QUANTITY') && <Quantity />}
          { state?.currentProduct && <>
          <div className="flex items-center h-16 p-3 mt-5 bg-gray-200">
            <span className="font-semibold">{ state.currentProduct.name }</span>
            <img src={state.currentProduct.image} className="object-contain w-[50px]"></img>
          </div>
          </> }
        </div>
      </div>
    </>
  );
}

export default App;
