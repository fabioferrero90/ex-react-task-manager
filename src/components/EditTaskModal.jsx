import React, { useState, useEffect, useRef } from 'react'
import Modal from "./Modal"
import { useGlobalContext } from "../contexts/GlobalContext"

const EditTaskModal = ({show, onClose, task}) => {
  const formRef = useRef(null);
  const { updateTask } = useGlobalContext();

  const initialTask = {
    title: task.title,
    description: task.description,
    status: task.status
  }

  const [editedTask, setEditedTask] = useState(initialTask)

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedTask({
      ...editedTask,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateTask(task.id, editedTask)
    onClose()
  }

  const content = (
    <div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Titolo</label>
          <input 
            type="text" 
            id="title"
            name="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            value={editedTask.title || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Descrizione</label>
          <textarea 
            id="description"
            name="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            value={editedTask.description || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Stato</label>
          <select 
            id="status"
            name="status"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            value={editedTask.status || 'To Do'}
            onChange={handleChange}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </form>
    </div>
  )

  return (
    <Modal show={show} onClose={onClose} title="Modifica task" content={content} onConfirm={() => formRef.current.requestSubmit()} confirmText="Salva"/>
  )
}

export default EditTaskModal