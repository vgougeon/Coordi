import { useState } from 'react';
import orderService from '../services/order.service';
import PayKeyboard from './payKeyboard';

export default function Scan({ id }: { id: number }) {
  const [input, setInput] = useState('');
  return (
    <>
      <div className='flex fx-col justify-between w-1/2'>
        <input
          className='h-14 p-3 border border-gray-200 shadow-sm m-3 mb-0 w-100'
          type='text'
          value={input}
          placeholder='Définir quantité'
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className='flex w-1/2'>
        <PayKeyboard onSubmit={(value: string) => orderService.getOrder(id).quantity(+value)} onChange={(value: string) => setInput(value)} />
      </div>
    </>
  );
}
