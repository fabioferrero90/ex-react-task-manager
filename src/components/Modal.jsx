import React from 'react'
import { createPortal } from 'react-dom'

const Modal = ({title, content, show, onClose, onConfirm, confirmText}) => {
  return (
    createPortal(
      <div className={`modal ${!show && "hidden"} fixed inset-0 custom-bg flex items-center justify-center z-10`}>
        <div className="modal-content flex flex-col w-[60%] max-w-2xl bg-white border-2 rounded-xl justify-between shadow-2xl z-20">
          <div className="bg-gray-400 py-5 p-5 m-2 border-0 rounded-xl">
            <h2 className="font-bold text-4xl text-white">{title}</h2> 
          </div>
          <div className="py-3 p-5">{content}</div>
          <div className="modal-buttons flex justify-center items-end py-3 gap-3">
            <button 
              className="cursor-pointer p-5 px-8 text-sm font-bold text-white transition-colors bg-teal-500 hover:bg-teal-800 focus:relative rounded-xl"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
            <button 
              className="cursor-pointer p-5 px-8 text-sm font-bold text-white transition-colors bg-gray-400 hover:bg-gray-800 focus:relative rounded-xl"
              onClick={onClose}
            >
              Chiudi
            </button>
            
          </div>
        </div>
      </div>,
      document.getElementById('modal-root')
    )
  )
}

export default React.memo(Modal)