import { useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import TaskRow from "../components/TaskRow";

const TaskList = () => {
  const { tasks } = useGlobalContext();

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <h1 className="font-bold text-2xl py-3">TaskList</h1>

      <table className="border-2 custom-table">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="px-5 pt-1 pb-2">Titolo</th>
            <th className="px-5 pt-1 pb-2">Data Creazione</th>
            <th className="px-5 pt-1 pb-2">Stato</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((task, index) => (
              <TaskRow key={index} task={task} />
            ))
          ) : (
            <tr>
              <td className="text-center" colSpan="3">Nessuna Task Disponibile</td>
            </tr>
          )}
        </tbody>
        </table>
    </div>
  );
};

export default TaskList;