import { useState } from 'react';
import { useObservable } from 'react-use';
import { State } from '../api/src/logic';
import orderService from '../services/order.service';
import OkButton from './okButton';
import Modal from 'react-modal'

const customStyles = {
  content: {
    boxShadow: '0 6px 8px 0 rgb(0 0 0 / 10%), 0 5px 12px 4px rgb(0 0 0 / 15%)',
    borderRadius: '10px',
    inset:'75% 80px 10px 50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -130%)',
    width: '50%',
  },
};

export default function UnknownProductModal({ id, close, confirm }: any) {
  return (
    <Modal
      isOpen={true}
      style={customStyles}
    >
      <div className='flex flex-col items-center'>
        <h1 className="font-w600 font-s4 mb-3 text-center">Produit inconnu. Désolé.</h1>
        <div className='flex justify-between w-full mt-5'>
          <button onClick={close} className="btn secondary rounded-2 shadow-1 ml-5">{'<'} Retour</button>
          <OkButton id={id} />
        </div>
      </div>
    </Modal>
  );
}
