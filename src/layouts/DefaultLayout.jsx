import {Outlet} from 'react-router-dom'
import Header from '../components/Header'

const headerMenu = [
  { route: "/", name: "Lista Task", icon: "checklist.png", key: "tasklist" },
  { route: "/addtask", name: "Aggiungi Task", icon: "add.png", key: "addtask" },
];

const DefaultLayout = () => {
  return (
    <div>
    <header><Header headerMenu={headerMenu}/></header>
    <main><Outlet /></main>
  </div>
  )
}

export default DefaultLayout

