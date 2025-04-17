import React from 'react'

const TaskRow = ({task}) => {

  const color = {
    'To do': 'bg-red-500 text-white',
    'Doing': 'bg-yellow-600 text-white',
    'Done': 'bg-green-700 text-white'
  }

  return (
    <tr className="text-center bg-gray-100">
      <td className="px-5 py-2">{task.title}</td>
      <td className="px-5 py-2">{new Date(task.createdAt).toLocaleDateString()}</td>
      <td className={`px-5 py-2 font-bold ${color[task.status]}`}>{task.status}</td>
    </tr>
  )
}

export default React.memo(TaskRow)