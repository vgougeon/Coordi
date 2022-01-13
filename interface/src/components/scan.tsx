import React, { useState } from "react";
import api from '../api';
import Modal from 'react-modal';
import PayKeyboard from "./payKeyboard";
import orderService from "../services/order.service";
import CatalogModal from "./catalogModal";

export default function Scan({id}: {id: number}) {
  const [input, setInput] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const customStyles = {
    content: {
        boxShadow: '0 6px 8px 0 rgb(0 0 0 / 10%), 0 5px 12px 4px rgb(0 0 0 / 15%)',
        borderRadius: '10px',
        inset:'145% 10px 20px 50%',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -150%)',
        width: '90%',
        height: '95%',
    },
};
  return (
    <>
      <div className="flex fx-col justify-between w-1/2">
        <input className="h-14 p-3 border border-gray-200 shadow-sm m-3 mb-0 w-100"
          type="text" value={input} placeholder="Scan code"
          onChange={(e) => setInput(e.target.value)} />

        <a href="#" onClick={() => setIsOpen(true)} className="d-block m-3 p-3 secondary rounded-1 shadow">
            Code inconnu
        </a>
      </div>
      <div className="flex w-1/2">
        <PayKeyboard onSubmit={(value: string) => orderService.getOrder(id).scan(+value)}
          onChange={(value: string) => setInput(value)} />
        {}
      </div>
      <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel='Example Modal'
      >
          <CatalogModal id={id} close={() => setIsOpen(false)}/>
      </Modal>
    </>
  )
}