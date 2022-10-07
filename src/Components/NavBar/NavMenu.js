import React from 'react'
import * as IoIcons from 'react-icons/io5'
import * as MdIcons from 'react-icons/md'
import * as HiIcons from "react-icons/hi";
import { Link } from 'react-router-dom'


const menuItems =  [
    {
        title: 'Home',
        path: '/',
        icon: <IoIcons.IoHomeOutline />,
        klass: 'nav-text'
    },
    {
        title: 'Phones',
        path: '/phones',
        icon: <MdIcons.MdOutlineTabletAndroid />,
        klass: 'nav-text'
    },
    {
        title: 'Team',
        path: '/teams',
        icon: <HiIcons.HiUsers />,
        klass: 'nav-text'
    },
    {
        title: 'Tickets',
        path: '/tickets',
        icon: <MdIcons.MdHomeRepairService />,
        klass: 'nav-text'
    },    
    
]

const NavMenu = ({toggleSideBar}) => {
    const liOfMenuItems = menuItems.map(({title,path,icon,klass}, index) => {
        return (
            <li key={index} className={klass} >
                <Link to={path} >
                    <span>{icon}</span>{title}
                </Link>
            </li>            
        );
    })
  return (
    <ul className="nav-menu-items" onClick={toggleSideBar}>
        <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
                <IoIcons.IoCloseOutline />
            </Link>
        </li>
        {liOfMenuItems}
    </ul>
  );
}

export default NavMenu