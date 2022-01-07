import { useState } from 'react';
import { useObservable } from 'react-use';
import { State } from '../api/src/logic';
import orderService from '../services/order.service';

export default function PayModal({ id }: { id: number }) {
  const [selected, setSelected] = useState('CARD');
  const state: State = useObservable(orderService.getOrder(id).state$);
  return (
    <div className='flex flex-col items-center'>
      <h1>Sélectionnez un ou des moyens de paiement</h1>
      <div className='grid grid-cols-3 w-2/3 gap-5'>
        <img
          onClick={() => setSelected('CARD')}
          className={`h-42 ${selected === 'CARD' && 'border border-red-500'}`}
          src='https://cdn-icons-png.flaticon.com/512/18/18221.png'
          alt=''
        />
        <img
          onClick={() => setSelected('CASH')}
          className={`h-42 ${selected === 'CASH' && 'border border-red-500'}`}
          src='https://cdn-icons-png.flaticon.com/512/18/18221.png'
          alt=''
        />
        <img
          onClick={() => setSelected('CHECK')}
          className={`h-42 ${selected === 'CHECK' && 'border border-red-500'}`}
          src='https://cdn-icons-png.flaticon.com/512/18/18221.png'
          alt=''
        />
      </div>
      <div className='flex justify-between w-full'>
        <button>{'<'} Retour</button>
        <span>
          Reste à payer <span className='italic'> {((state?.totalPrice || 0) - (state?.paidAmount || 0)).toFixed(2)}€</span>
        </span>
        <button>Payer {'>'}</button>
      </div>
    </div>
  );
}
