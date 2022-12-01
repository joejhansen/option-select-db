import React, { useReducer, useState } from 'react'
// TODO: MAKE ACTIONS AND IMPORT THEM
import reducer from '../../utils/reducers'

import Nav from './Nav/Nav'

import { usePreferenceContext } from '../../utils/PreferenceContext'

const Header = () => {
    const initialState = usePreferenceContext();

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <>
            <p>Header</p>
            <Nav />
        </>
    )
}

export default Header