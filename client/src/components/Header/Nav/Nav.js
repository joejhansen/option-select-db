import React, { useReducer, useState } from 'react'
import { NavLink } from 'react-router-dom'
import capitalizeLocal from '../../../utils/helpers/capitalizeLocal'
// TODO: MAKE ACTIONS AND IMPORT THEM

// TODO: Compose the Nav within a <Header /> component on the main app for easy props
const Nav = ({ pages, }) => {

    const styles = {
        ul: {
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignSelf: 'center',
            padding: '0',
            // color: theme ? theme.text : 'black',
        },
        active: {
            textDecoration: 'none',
            color: 'blue'
        },
        inactive: {
            color: 'black',
            textDecoration: 'none',
        }
    }

    return (
        <ul style={styles.ul}>
            {pages ?
                pages.map((page) => {
                    const pageTitle = capitalizeLocal(page)
                    return (
                        <li id={page} key={page}>
                            <NavLink
                                style={({ isActive }) => {
                                    return(
                                        isActive
                                        ? styles.active
                                        : styles.inactive
                                    )
                                }}
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