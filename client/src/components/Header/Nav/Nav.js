import React, { useReducer, useState } from 'react'
import { NavLink } from 'react-router-dom'
import capitalizeLocal from '../../../utils/capitalizeLocal'
// TODO: MAKE ACTIONS AND IMPORT THEM

// TODO: Compose the Nav within a <Header /> component on the main app for easy props
const Nav = ({ pages, }) => {

    return (
        <ul>
            {pages ?
                pages.map((page) => {
                    const pageTitle = capitalizeLocal(page)
                    return (
                        <li id={page} key={page}>
                            <NavLink
                                to={`/${page}`}>
                                {pageTitle}
                            </NavLink>
                        </li>
                    )
                })
                : <p>Nothing Here Yet</p>}
        </ul>
    )
}

export default Nav