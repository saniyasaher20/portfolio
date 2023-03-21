import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants/constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {

  // show active menu
  const [active, setActive] = useState('')

  // toggle the hamburger in small devices
  const [toggle, setToggle] = useState(false);

  return (
    <nav className={`${styles.paddingX} w-full flex items-center justify-between max-w-7xl mx-auto pt-5`}>
      <Link to="/" className="flex items-center gap-2" onClick={() => {
        setActive("");
        window.scroll(0, 0)
      }}>

        {/* Logo */}
        <img src={logo} alt="logo" className='w-9 h-9 object-contain' />
        <p className='text-white text-[18px] font-bold cursor-pointer'>Saniya Saher</p>
      </Link>

      {/* Nav menus on lg devices */}
      <ul className='list-none hidden sm:flex flex-row gap-10'>
        {navLinks.map(link => (
          <li
            key={link.id}
            className={`${active === link.title ? "text-white" : "text-secondary"} hover:text-white text-[18px] font-medium cursor-pointer`}
            onClick={() => { setActive(link.title) }}
          >
            <a href={`#${link.id}`}>{link.title}</a>
          </li>
        ))}
      </ul>


      {/* hamberger menu on small devices */}
      <div className='sm:hidden flex flex-1 justify-end items-center'>
        <img
          src={toggle ? close : menu}
          alt="menu"
          className='w-[28px] h-[28px] object-contain cursor-pointer'
          onClick={() => setToggle(!toggle)}
        />

        <div className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
          {/* Nav menus */}
          <ul className='list-none flex justify-end items-start flex-col gap-4'>
            {navLinks.map(link => (
              <li
                key={link.id}
                className={`
                ${active === link.title
                  ? "text-white"
                  : "text-secondary"
                }
                  font-poppins font-medium cursor-pointer text-[16px]`}
                onClick={() => {
                  setToggle(!toggle) //to toggle the menu, after click on menu the menu container should close
                  setActive(link.title)
                }}
              >
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>


    </nav>
  )
}

export default Navbar