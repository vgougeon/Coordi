import { useState } from 'react';
import { useObservable } from 'react-use';
import { State } from '../api/src/logic';
import Keyboard from './keyboard';
import { useParams } from 'react-router-dom';
import orderService from '../services/order.service';
import Modal from 'react-modal';
import PayModal from './modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
  },
};

Modal.setAppElement('#root');

export function PayComponent({ id }: { id: number }) {
  const [modalIsOpen, setIsOpen] = useState(true);
  const [input, setInput] = useState('');
  const state: State = useObservable(orderService.getOrder(id).state$);
  const pay = () => {
    orderService.getOrder(id).pay(+input, 'CASH');
  };
  return (
    <div className='p-4'>
      <button className='bg-green-500 text-white rounded flex items-center px-5 py-2'>Payer</button>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <PayModal id={id} />
      </Modal>
    </div>
  );
}
