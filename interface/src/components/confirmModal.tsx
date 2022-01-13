import { useState } from 'react';
import { useObservable } from 'react-use';
import { State } from '../api/src/logic';
import orderService from '../services/order.service';

export default function ConfirmModal({ id, close, product }: any) {
  const [selected, setSelected] = useState('CARD');
  const state: State = useObservable(orderService.getOrder(id).state$);
  const removeItem = () => {
    orderService.getOrder(id).return(product)
    close();
  }
  return (
    <div className='flex flex-col items-center'>
      <h1 className="font-w600 font-s4 mb-3 text-center">Etes vous sûr(e) de vouloir supprimer ce produit ?</h1>
      <div className='flex justify-between w-full mt-5'>
        <button onClick={close} className="btn secondary rounded-2 shadow-1 ml-5">{'<'} Retour</button>
        <a
          href="#"
          onClick={removeItem} 
          className="btn primary rounded-2 shadow-1 mr-5">Confirmer</a>
      </div>
    </div>
  );
}
