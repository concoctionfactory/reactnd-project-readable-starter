import React from 'react'
import { NavLink } from 'react-router-dom'


export default function CategoryList({ categories, categorySelect}){
    return (
        <ul className ="categories-list">
            {categories.map((item)=>(
                <li key={item}>
                    <NavLink to={item==="all"? "/": `/${item}`}>
                        {item}
                    </NavLink>
                </li>
            ))}
        </ul>
    )
}