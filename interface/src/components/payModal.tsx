import { useState } from 'react';
import { useObservable } from 'react-use';
import { State } from '../api/src/logic';
import orderService from '../services/order.service';

export default function PayModal({ id, close }: any) {
  const [selected, setSelected] = useState('CARD');
  const state: State = useObservable(orderService.getOrder(id).state$);
  return (
    <div className='flex flex-col items-center'>
      <h1 className="font-w600 font-s3 mb-3">Sélectionnez un ou des moyens de paiement</h1>
      <div className='grid grid-cols-3 w-2/3 gap-5'>
        <img
          style={{ height: '170px' }}
          onClick={() => setSelected('CARD')}
          className={`m-3 object-contain d-block ${selected === 'CARD' && 'border border-red-500'}`}
          src='https://www.prestasoo.com/images/logo-cb.jpg'
          alt='golden card'
        />
        <img
          style={{ height: '170px' }}
          onClick={() => setSelected('CASH')}
          className={`m-3 object-contain d-block ${selected === 'CASH' && 'border border-red-500'}`}
          src='https://cdn.pixabay.com/photo/2013/07/13/12/03/banknotes-159085_960_720.png'
          alt='especes de dep'
        />
        <img
          style={{ height: '170px' }}
          onClick={() => setSelected('CHECK')}
          className={`m-3 object-contain d-block ${selected === 'CHECK' && 'border border-red-500'}`}
          src='https://image.shutterstock.com/image-vector/mascot-illustration-blank-check-holding-260nw-266774402.jpg'
          alt='> 70ans'
        />
      </div>
      <div className='flex justify-between w-full mt-5'>
        <button onClick={close} className="btn secondary rounded-1 shadow-1">{'<'} Retour</button>
        <span className="shadow-1 rounded-1 text-secondary d-flex vcenter">
          <div className="font-s3 p-2">Reste à payer</div>
          <div className="bd-solid bd-r1 bd-grey bd-light-3 h100"></div>
          <span className="font-s5 p-2 font-w800"> {((state?.totalPrice || 0) - (state?.paidAmount || 0)).toFixed(2)}€</span>
        </span>
        <button
          onClick={() => {orderService.getOrder(id).pay(state.totalPrice || 0, 'cash')}} 
          className="btn success rounded-1 shadow-1">Payer {'>'}</button>
      </div>
    </div>
  );
}
