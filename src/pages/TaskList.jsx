import { useState, useEffect, useMemo, useCallback } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import TaskRow from "../components/TaskRow";
import { BiSolidDownArrow } from "react-icons/bi";

const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};

const TaskList = () => {

  const { tasks, removeMultipleTasks } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy , setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState("1")
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);

  function changeSort(column) {
    if (column === sortBy) {
      setSortOrder(sortOrder === "1" ? "-1" : "1");
    } else {
      setSortBy(column);
      setSortOrder("1");
    }
  }

  function toggleSelection(taskId) {
    if (selectedTaskIds.includes(taskId)) {
      setSelectedTaskIds(selectedTaskIds.filter(id => id !== taskId)); 
    } else {
      setSelectedTaskIds([...selectedTaskIds, taskId]);
    }
  }

  function removeSelectedTasks() {
    removeMultipleTasks(selectedTaskIds)
    setSelectedTaskIds([]);
  }

  const debouncedSetSearchTerm = useCallback(debounce((value) => {
    setSearchTerm(value);
  }, 300), []);

  const sortedAndFilteredTasks = useMemo(() => {
    const filteredTasks = tasks.filter((task) => {
      return task.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return [...filteredTasks].sort((a, b) => {
      if (typeof a[sortBy] === 'string') {
        return sortOrder * a[sortBy].localeCompare(b[sortBy]);
      }
      return sortOrder * (a[sortBy] - b[sortBy]);
    });
  }, [tasks, sortBy, sortOrder, searchTerm]);

  return (
    <div className="flex justify-center">
      <div className="md:w-[800px] sm:w-[600px] max-w-[95%] py-5">
        <h1 className="page-title">TaskList</h1>
        <div className="flex justify-between">
          <label className="font-bold text-lg">Cerca Task:
            <input 
              type="text"
              className="ml-3 mb-5 px-2 border-1 font-medium"
              onChange={(e) => debouncedSetSearchTerm(e.target.value)}
              placeholder="..cerca per titolo"
            />
            
          </label>
          {selectedTaskIds.length > 0 && (
              <div>
                <span className="ml-3 text-sm text-gray-500">
                  {selectedTaskIds.length} selezionati
                </span>
                <button 
                  className="bg-red-400 text-white hover:bg-red-700 cursor-pointer px-2 py-1 ml-2 border-0 rounded"
                  onClick={removeSelectedTasks}
                >
                  Elimina
                </button>
              </div>
            )}
        </div>

        <table className="w-full border-2 rounded-lg border-separate border-spacing-0 custom-table">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th 
                className="select-none px-5 pt-1 pb-2 cursor-pointer first:rounded-tl-lg"
                onClick={() => changeSort("title")}
              >Titolo
              {sortBy == "title" && (
                <BiSolidDownArrow className={`inline-block ml-1 ${(sortOrder > 0) ? "" : "rotate-180"}`} />
              )}</th>
              <th 
                className="select-none px-5 pt-1 pb-2 cursor-pointer"
                onClick={() => changeSort("createdAt")}
              >Data Creazione
              {sortBy == "createdAt" && (
                <BiSolidDownArrow className={`inline-block ml-1 ${(sortOrder > 0) ? "" : "rotate-180"}`} />
              )}</th>
              <th 
                className="select-none px-5 pt-1 pb-2 cursor-pointer last:rounded-tr-lg"
                onClick={() => changeSort("status")}
              >Stato
              {sortBy == "status" && (
                <BiSolidDownArrow className={`inline-block ml-1 ${(sortOrder > 0) ? "" : "rotate-180"}`} />
              )}</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(sortedAndFilteredTasks) && sortedAndFilteredTasks.length > 0 ? (
              sortedAndFilteredTasks.map((task, index) => (
                <TaskRow key={index} task={task} checked={selectedTaskIds.includes(task.id)} onToggle={()=> toggleSelection(task.id)} />
              ))
            ) : (
              <tr>
                <td className="text-center rounded-b-lg" colSpan="3">Nessuna Task Disponibile</td>
              </tr>
            )}
          </tbody>
          </table>
      </div>
    </div>
  );
};

export default TaskList;