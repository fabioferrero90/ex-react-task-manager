import React from 'react'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

const TaskRow = ({task, checked, onToggle}) => {
  const navigate = useNavigate()

  const color = {
    'To do': 'bg-red-500',
    'Doing': 'bg-yellow-600',
    'Done': 'bg-green-700'
  }

  return (
    <tr 
    className="custom-table-row hover:scale-103 hover:bg-green-100 hover:cursor-pointer hover:shadow-2xl hover: rounded-2xl transition-all text-center bg-gray-100"
   
    >
      <td className="px-5 py-2  text-left">
        <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(task.id)}
        className="mr-2"
        />
        <span
          onClick={() => navigate(`/task/${task.id}`)}
        >
          {task.title}
        </span>
        </td>
      <td 
        className="px-5 py-2"
        onClick={() => navigate(`/task/${task.id}`)}
      >{dayjs(task.createdAt).format("DD/MM/YYYY")}</td>
      <td 
        className={`w-[2vw] px-5 py-2 font-bold text-white ${color[task.status]}`}
        onClick={() => navigate(`/task/${task.id}`)}
      >{task.status}</td>
    </tr>
  )
}

export default React.memo(TaskRow)