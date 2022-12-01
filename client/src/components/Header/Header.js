import React, { useReducer, useState } from 'react'
// TODO: MAKE ACTIONS AND IMPORT THEM
import reducer from '../../utils/reducers'

import Nav from './Nav/Nav'

import { usePreferenceContext } from '../../utils/PreferenceContext'

const Header = ({ children }) => {
    const initialState = usePreferenceContext();

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <>
            <h1>Header</h1>
            {children}
        </>
    )
}

export default Header