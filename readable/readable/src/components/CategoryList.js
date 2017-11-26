import React, {Component} from 'react'



export default function CategoryList({ categories, categorySelect}){
    return (
        <ul className ="categories-list">
            {categories.map((item)=>(
                <li onClick={()=>categorySelect(item)} key={item}>
                    <a>{item}</a>
                </li>
            ))}
        </ul>
    )
}