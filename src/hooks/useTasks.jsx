import { useReducer } from 'react'
import taskReducer from '../reducer/taskReducer'

export default function useTasks() {
  const apiBaseUrl = import.meta.env.VITE_API_BASEURL;
  const [tasks, dispatchTasks] = useReducer(taskReducer, [])

  const fetchTasks = async () => {
    try{
        const res = await fetch(`${apiBaseUrl}/tasks`)
        const data = await res.json()
        dispatchTasks({
            type: "LOAD_TASKS",
            payload: data
        })
    }catch(err){
        console.error(err)
    }
  }

  const addTask = async (task) => {
    const taskExists = tasks.some(t => t.title === task.title);
    if (taskExists) {
      alert("Esiste gia una task con questo nome!");
      return tasks 
    }
    try{
        const res = await fetch(`${apiBaseUrl}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        const data = await res.json()
        if (!data.success) {
          throw new Error(data.message); 
        }
        dispatchTasks({
            type: "ADD_TASK",
            payload: task
        })
        alert("Task aggiunta con successo!")
        window.location.replace('/');
    } catch(err){
        alert(err.message)
    }
    return tasks
  }

  const removeTask = async (taskId) => {
    try{
      const res = await fetch(`${apiBaseUrl}/tasks/${taskId}`, {
          method: 'DELETE',
      })
      const data = await res.json()
      if (!data.success) {
        throw new Error(data.message); 
      }
      dispatchTasks({
          type: "REMOVE_TASK",
          payload: taskId
      })
      alert("Task Eliminata con successo!")
      window.location.replace('/');
    } catch(err){
        alert(err.message)
    }
    return tasks
  }

  const updateTask = async (taskId, task) => {
    const titleExists = tasks.some(t => t.title === task.title && t.id !== taskId);
    if (titleExists) {
      alert("Esiste gia una task con questo nome!");
      return tasks 
    }
    try{
      const res = await fetch(`${apiBaseUrl}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
      const data = await res.json()
      if (!data.success) {
        throw new Error(data.message);
      }
      dispatchTasks({
        type: "UPDATE_TASK",
        payload: task
      })
      alert("Task modificata con successo!")
      } catch(err){
          alert(err.message)
      }
    return tasks
  }

  const removeMultipleTasks = async (taskIds) => {
    try{
      const deletePromises = taskIds.map(id => 
        fetch(`${apiBaseUrl}/tasks/${id}`, {method: 'DELETE'})
          .then(response => response.json())
      );
      
      const fulfilledDeletions = [];
      const rejectedDeletions = [];
      const results = await Promise.allSettled(deletePromises);
      
      results.forEach((result, index) => {
        const taskId = taskIds[index];
        if (result.status === 'fulfilled' && result.value.success) {
          fulfilledDeletions.push(taskId);
        } else {
          rejectedDeletions.push(taskId);
        }
      });
      if (rejectedDeletions.length > 0) {
        throw new Error(`Errore durante l'eliminazione dei seguenti task ID: ${rejectedDeletions.join(", ")}`);
      }
      dispatchTasks({
        type: "REMOVE_MULTIPLE_TASKS",
        payload: fulfilledDeletions 
      })
      alert("Task eliminati con successo!");
      window.location.replace('/');
      
    } catch(err){
        alert(err.message)
        window.location.replace('/');
    }
  }

  fetchTasks()
  return [ tasks, addTask, removeTask, updateTask, removeMultipleTasks ]
}