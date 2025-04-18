import { useState } from "react"
import { useParams } from "react-router-dom"
import { useGlobalContext } from "../contexts/GlobalContext"
import Modal from "../components/Modal"
import EditTaskModal from "../components/EditTaskModal"
import dayjs from "dayjs"

const TaskDetail = () => {
  const { id } = useParams()
  const { tasks, removeTask } = useGlobalContext()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const task = tasks.find(task => task.id == id)

  return (
    <div className="flex justify-center">
    <div className="md:w-[800px] sm:w-[500px] max-w-[95%] py-5">
    <div className="flex flex-col justify-center items-center">
       <h1 className="page-title">Dettaglio Task [ID: {id}]</h1>

       {task && (
        <div className="p-4 border-2 rounded-xl w-full">
          <p className="font-bold">Titolo del task:</p>
          <p className="font-medium">{task.title}</p>
          <p className="font-bold">Descrizione:</p>
          <p className="font-medium">{task.description}</p>
          <p className="font-bold">Stato:</p>
          <p className="font-medium">{task.status}</p>
          <p className="font-bold">Data di Creazione:</p>
          <p className="font-medium">{dayjs(task.createdAt).format("DD/MM/YYYY")}</p>

          <span
            className="mt-4 inline-flex divide-x divide-gray-300 overflow-hidden rounded border border-gray-300 bg-white shadow-sm"
          >
            <button
              className="cursor-pointer px-3 py-1.5 text-sm font-bold text-white transition-colors bg-red-500 hover:bg-red-800 focus:relative"
              onClick={() => setShowDeleteModal(true)}
            >
              Elimina Task
            </button>
            <button
              className="cursor-pointer px-3 py-1.5 ml-2 text-sm font-bold text-white transition-colors bg-gray-500 hover:bg-gray-800 focus:relative"
              onClick={() => setShowEditModal(true)}
            >
              Modifica Task
            </button>
            <Modal
              title="Conferma eliminazione"
              content="Sei sicuro di voler eliminare questo task?"
              show={showDeleteModal}
              onClose={() => {setShowDeleteModal(false)}}
              onConfirm={() => removeTask(id)}
              confirmText="Conferma"
            />
            <EditTaskModal
              show={showEditModal}
              onClose={() => setShowEditModal(false)}
              task={task}
            />
          </span>
        </div>
       )}
    </div>
    </div>
    </div>
  )
}

export default TaskDetail