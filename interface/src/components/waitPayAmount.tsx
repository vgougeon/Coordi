import { useState } from 'react';
import orderService from '../services/order.service';
import PayKeyboard from './payKeyboard';

export default function WaitPayAmount({ id }: { id: number }) {
  const [input, setInput] = useState('');
  return (
    <>
      <div className='flex fx-col justify-between w-1/2'>
        <input
          className='h-14 p-3 border border-gray-200 shadow-sm m-3 mb-0 w-100'
          type='text'
          value={input}
          placeholder='Montant à payer'
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className='flex w-1/2'>
        <PayKeyboard onSubmit={(value: string) => orderService.getOrder(id).pay(+input, 'CASH')} onChange={(value: string) => setInput(value)} />
      </div>
    </>
  );
}
