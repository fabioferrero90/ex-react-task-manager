import { useState, useEffect } from 'react'

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

  useEffect(() =>{
    fetchTasks()
  }, [])

  const addTask = async (task) => {
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
    return tasks
  }

  const updateTask = async (taskId, task) => {
    return tasks
  }

  return [ tasks, addTask, removeTask, updateTask ]
}