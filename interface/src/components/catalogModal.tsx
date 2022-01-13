import { useState } from 'react';
import { useObservable } from 'react-use';
import { State } from '../api/src/logic';
import orderService from '../services/order.service';
import { PRODUCTS } from "../api/src/data";

export default function CatalogModal({ id, close, product }: any) {
  const [selected, setSelected] = useState('CARD');
  const state: State = useObservable(orderService.getOrder(id).state$);
  const removeItem = () => {
    orderService.getOrder(id).return(product)
    close();
  }
  
  const categories = new Set(PRODUCTS.map( product => product.category))
  function switchCateg(){
    console.log('halo')
  }
  return (
    <div className='flex flex-col items-center'>
      <div className="flex">
        <div className="categories flex-col flex">
          {Array.from(categories).map(category =>
            <div onClick={() => switchCateg()}>{ category }</div>  
          )}
        </div>
        <div className="grid grid-cols-3 w-full p-4 gap-3">
          {PRODUCTS.map(product =>
            <div key={ product.code } onClick={() => orderService.getOrder(id).scan(product.code)}
            className="border border-gray-200 bg-white justify-center flex relative hover:scale-105 cursor-pointer hover:border-blue-400 rounded-2">
              <img src={ product.image } className="w-full object-contain h-44 rounded-2"/>
              <div  style={{ borderBottomLeftRadius: "10px;", borderBottomRightRadius: "10px;" }} className="bg-white shadow border-t border-gray-200 h-10 flex items-center px-3 absolute bottom-0 w-full" >{ product.name }</div>
            </div>
          )}
        </div>
      </div>
      <div className='flex justify-between w-full mt-5'>
        <button onClick={close} className="btn secondary rounded-2 shadow-1 ml-5">{'<'} Retour</button>
        {/* <a
          href="#"
          onClick={removeItem} 
          className="btn primary rounded-2 shadow-1 mr-5">Confirmer</a> */}
      </div>
    </div>
  );
}
