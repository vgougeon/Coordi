import { useState } from 'react';
import { useObservable } from 'react-use';
import { State } from '../api/src/logic';
import orderService from '../services/order.service';
import { PRODUCTS } from "../api/src/data";

export default function CatalogModal({ id, close, product }: any) {
  const [selected, setSelected] = useState('');
  const state: State = useObservable(orderService.getOrder(id).state$);
  const removeItem = () => {
    orderService.getOrder(id).return(product)
    close();
  }
  
  const categories = new Set(PRODUCTS.map( product => product.category))
  return (
    <div className='flex flex-col items-center'>
      <div className="flex w-full space-x-4">
        <div className="categories flex-col flex w-1/3">
        <a href="#" className={`btn  rounded-2 shadow-1 min-w-full mb-3 p-4 bg-[#607790] text-white text-left ${selected==="" ? "bg-[#2E4C6D]": "bg-[#607790]"}`} onClick={() => setSelected("") }>Produits rapide</a>
          {Array.from(categories).map(category =>
            <a href="#" className={`btn  rounded-2 shadow-1 min-w-full mb-3 p-4 bg-[#607790] text-white text-left ${selected===category ? "bg-[#2E4C6D]": "bg-[#607790]"}`} onClick={() => setSelected(category) }>{ category }</a>  
          )}
        </div>
        <div className="grid grid-cols-3 w-full gap-3 items-start">
          {PRODUCTS.filter(p => (selected === p.category) || (selected === "")).map(product =>
            <div key={ product.code } onClick={() => orderService.getOrder(id).scan(product.code)}
            className="border border-gray-200 bg-white justify-center flex relative cursor-pointer hover:border-blue-400 rounded-2">
              <img src={ product.image } className="w-full object-contain h-44 rounded-2"/>
              <div  style={{ borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px", background: 'rgba(0,0,0,0.5)', color: 'white', textAlign: 'center', borderTop: 'none'}} className="justify-center bg-white shadow border-t border-gray-200 h-10 flex items-center px-3 absolute bottom-0 w-full" >{ product.name }</div>
            </div>
          )}
        </div>
      </div>
      <div className='flex justify-between w-full mt-5'>
        <button onClick={close} className="btn secondary rounded-2 shadow-1">{'<'} Retour</button>
        {/* <a
          href="#"
          onClick={removeItem} 
          className="btn primary rounded-2 shadow-1 mr-5">Confirmer</a> */}
      </div>
    </div>
  );
}
