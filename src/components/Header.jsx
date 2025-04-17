import { NavLink } from "react-router-dom";
import React from "react";

const Header = ( {headerMenu} ) => {

  return (
    <header className="bg-white dark:bg-gray-900">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a className="block text-teal-600 dark:text-teal-300" href="/">
          <img className="site-logo" src="toboolist.png" alt="Logo" />
        </a>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="md:block">
            <ul className="flex items-center gap-6 text-sm">
              {headerMenu.map(menuItem =>{
                return(
                  <li key={menuItem.key} className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75">
                    <NavLink to={menuItem.route} className="flex gap-3 py-2 font-bold px-3 border-0 rounded-2xl bg-gray-600 text-gray-200 transition hover:text-red-500">
                      {menuItem.icon && <img className="w-6 h-6" src={menuItem.icon} alt="Icon" />}
                      {menuItem.name}
                    </NavLink>
                </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default React.memo(Header)