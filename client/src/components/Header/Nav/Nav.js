import React, { useReducer, useState } from 'react'
// TODO: MAKE ACTIONS AND IMPORT THEM

import reducer from '../../../utils/reducers'
import { usePageContext } from '../../../utils/PageContext'


const Nav = () => {
    const page = usePageContext();

    const [statePage, dispatchPage] = useReducer(reducer, page)

    return (
        <ul>
            {statePage.pages.map((page) => {
                return (
                    <li id={page} key={page} onClick={((e)=>{
                        e.preventDefault()
                        dispatchPage({ type: 'CHANGE_PAGE', payload: e.target.id})
                    })}>{page}</li>
                )
            })}
        </ul>
    )
}

export default Nav