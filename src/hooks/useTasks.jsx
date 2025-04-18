import { useState } from 'react'

export default function useTasks() {
  const apiBaseUrl = import.meta.env.VITE_API_BASEURL

  const [tasks, setTasks] = useState([])

  const fetchTasks = async () => {
    try{
        const res = await fetch(`${apiBaseUrl}/tasks`)
        const data = await res.json()
        setTasks(data)
    }catch(err){
        console.log(err)
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
        if (data.success) {
          fetchTasks();
          alert("Task aggiunta con successo!")
          window.location.replace('/');
        } else {
          throw new Error(data.message);
        }
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
      if (data.success) {
        fetchTasks();
        alert("Task Eliminata con successo!")
        window.location.replace('/');
      } else {
        throw new Error(data.message);
      }
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
      if (data.success) {
        fetchTasks();
        alert("Task modificata con successo!")
      } else {
        throw new Error(data.message);
      }
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

      if (!rejectedDeletions) {
        fetchTasks();
        alert("Task eliminati con successo!");
        window.location.replace('/');
      } else {
        throw new Error(`Errore durante l'eliminazione dei seguenti task ID: ${rejectedDeletions.join(", ")}`);
      }
    } catch(err){
        alert(err.message)
        window.location.replace('/');
    }
  }

  fetchTasks()
  return [ tasks, addTask, removeTask, updateTask, removeMultipleTasks ]
}