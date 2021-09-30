import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

//================menu item=================
const MenuItem = (props) => {

    const { name, subMenus, iconClassName, onClick, to, exact } = props; 
    const [expand, setExpand] = useState(false);

    return (
        // xự kiện click item 
    <li onClick={props.onClick}>
        <NavLink exact to={to} className="menu-item" 
        onClick= {() => setExpand(!expand)}> 
            <div className="menu-icon">
                <i className={iconClassName}></i>
            </div>
        <span>{name}</span>
        </NavLink>
        
        {/* { dropdowm menu } */}
        {
            subMenus && subMenus.length > 0 ? (
            <ul className={` sub-menu ${expand ? "active" : ""}`}>
                {subMenus.map((menu,index) =>(
                <li key={index}>
                    <NavLink to={menu.to}>
                       {menu.name}
                    </NavLink>
                </li>
                ))}
        </ul>
        ) : null
        }
        
    </li>
    )
}
export default MenuItem;