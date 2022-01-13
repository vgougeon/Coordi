import { useState } from 'react';
import { useObservable } from 'react-use';
import { State } from '../api/src/logic';
import Keyboard from './keyboard';
import { useParams } from 'react-router-dom';
import orderService from '../services/order.service';
import Modal from 'react-modal';
import PayModal from './payModal';

const customStyles = {
  content: {
    boxShadow: '0 6px 8px 0 rgb(0 0 0 / 10%), 0 5px 12px 4px rgb(0 0 0 / 15%)',
    borderRadius: '10px',
    inset:'40% 80px 10px 50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -40%)',
    width: '80%',
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
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <PayModal close={() => setIsOpen(false)} id={id} />
      </Modal>
    </div>
  );
}
