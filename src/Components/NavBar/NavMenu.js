import React from 'react'
import * as IoIcons from 'react-icons/io5'
import * as MdIcons from 'react-icons/md'
import * as HiIcons from "react-icons/hi";


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
