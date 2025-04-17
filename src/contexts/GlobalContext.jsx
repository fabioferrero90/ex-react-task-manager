import { createContext, useContext, useState, useEffect } from 'react'
const GlobalContext = createContext()
import useTasks from '../hooks/useTasks'

const GlobalProvider = ({ children }) => {
    const [tasks, addTask, removeTask, updateTask] = useTasks()

    const values = {
        tasks,
        addTask,
        removeTask,
        updateTask
    }

    return (
        <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
    )
}

const useGlobalContext = () => useContext(GlobalContext)
export { GlobalProvider, useGlobalContext }
