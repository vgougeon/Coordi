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
    inset:'50% 80px 15px 50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
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
