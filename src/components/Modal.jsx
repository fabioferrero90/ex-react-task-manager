import React from 'react'
import { createPortal } from 'react-dom'

const Modal = ({title, content, show, onClose, onConfirm, confirmText}) => {
  return (
    createPortal(
      <div className={`modal ${!show && "hidden"}`}>
        <div className="modal-content flex flex-col fixed w-[60%] ml-[20%] mt-[20%] bg-white border-2 rounded-xl p-5 justify-between shadow-2xl z-10">
          <h2 className="font-bold">{title}</h2>
          <div className="py-3">{content}</div>
          <div className="modal-buttons flex justify-around items-end pt-3">
            <button 
              className="cursor-pointer px-3 py-1.5 text-sm font-bold text-white transition-colors bg-green-500 hover:bg-green-800 focus:relative rounded-xl"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
            <button 
              className="cursor-pointer px-3 py-1.5 text-sm font-bold text-white transition-colors bg-gray-400 hover:bg-gray-800 focus:relative rounded-xl"
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