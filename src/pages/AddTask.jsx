import { useState, useRef, useEffect, use } from 'react'
import { useGlobalContext } from '../contexts/GlobalContext';
const AddTask = () => {
  const { addTask } = useGlobalContext();  
  const [title, setTitle] = useState('');
  const [errMess, setErrMess] = useState('');
  const descriptionRef = useRef('');
  const statusRef = useRef('To Do');

  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";

  const validateTitle = (title) => {
    if (title.length == 0) {
      setErrMess('Il nome del task non può essere vuoto');
    } else if ([...title].some(char => symbols.includes(char))) {
      setErrMess('Il nome del task non può contenere caratteri speciali');    
    } else {
      setErrMess('');
    }
    setTitle(title);
  }

  const submitTask = (e) => {
    e.preventDefault();
    const description = descriptionRef.current.value;
    const status = statusRef.current.value;
    if (title && description){
      const task = { title, description, status };
      console.log(task);
      addTask(task);
    } else {
      if (!title) {
        alert('Il nome del task non può essere vuoto'); 
      } else if (!description) {
        alert('La descrizione del task non può essere vuota');
      }
    }
  }

  return (
    <div className="flex justify-center">
      <div className="md:w-[800px] sm:w-[500px] max-w-[95%] py-5">
      <h1 className="page-title">Aggiungi Task</h1>
        <form onSubmit={submitTask} className="p-5 flex flex-col items-center border-2 rounded-xl">

          <label className="w-[400px] max-w-[80%] py-2 flex flex-col"htmlFor="taskName">
            <span className="text-sm text-gray-700 font-bold"> Nome del task </span>
            <input
              type="text"
              id="taskName"
              value={title}
              onChange={(e) => validateTitle(e.target.value)}
              placeholder="Inserisci il nome del task"
              className="p-2 mt-0.5 border-1 rounded border-gray-400 shadow-sm"
            />
            {errMess && <span className="text-red-500 text-sm">{errMess}</span>}
          </label>

          <label className="w-[400px] max-w-[80%] py-2 flex flex-col"htmlFor="description">
            <span className="text-sm text-gray-700 font-bold"> Descrizione del task </span>
            <textarea
              id="description"
              ref={descriptionRef}
              placeholder="Inserisci la descrizione del task"
              className="p-2 mt-0.5 border-1 rounded border-gray-400 shadow-sm"
            />
          </label>

          <label className="w-[400px] max-w-[80%] py-2 flex flex-col"htmlFor="status">
            <span className="text-sm text-gray-700 font-bold"> Stato della Task </span>
            <select
              id="status"
              ref={statusRef}
              placeholder="Inserisci la descrizione del task"
              className="p-2 mt-0.5 border-1 rounded border-gray-400 shadow-sm"
            >
              <option value="To do">To do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </label>

          <button className="w-[400px] max-w-[80%] bg-blue-300 p-2 mt-5 border-0 rounded-2xl text-sm font-bold cursor-pointer" type="submit">Aggiungi Task</button>
        </form>
      </div>
    </div>
  )
}

export default AddTask