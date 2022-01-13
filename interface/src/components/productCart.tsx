import { useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import { ProductCart } from '../api/src/classes/productCart';
import orderService from '../services/order.service';
import ConfirmModal from './confirmModal';

const customStyles = {
    content: {
        boxShadow: '0 6px 8px 0 rgb(0 0 0 / 10%), 0 5px 12px 4px rgb(0 0 0 / 15%)',
        borderRadius: '10px',
        inset:'69% 10px 20px 50%',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -150%)',
        width: '40%',
    },
};

Modal.setAppElement('#root');

export default function ProductCartItem({ p, id }: { p: ProductCart; id: number }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <tr>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='flex items-center'>
          <div className='flex-shrink-0 h-10 w-10'>
            <img className='h-10 w-10 rounded-full' src={p.product.image} alt='' />
          </div>
          <div className='ml-4'>
            <div className='text-sm font-medium text-gray-900'>{p.product.name}</div>
            <div className='text-sm italic text-gray-500'>Code produit : {p.product.code}</div>
          </div>
        </div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>Quantité</div>
        <div className='text-sm text-gray-500'>{p.quantity}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <span className='px-4 py-2 inline-flex leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
          {p.getPrice().toFixed(2)}€
        </span>
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-s4 text-red'>
        <a onClick={() => setIsOpen(true)} href='#'>
          <BsFillTrashFill />
        </a>
      </td>
      <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel='Example Modal'
      >
          <ConfirmModal id={id} product={p} close={() => setIsOpen(false)}/>
      </Modal>
    </tr>
  );
}
