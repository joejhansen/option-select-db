import React, { useReducer, useState } from 'react'
// TODO: MAKE ACTIONS AND IMPORT THEM

import reducer from '../../utils/reducers'

import { usePreferenceContext } from '../../utils/PreferenceContext'

const Main = () => {
    const initialState = usePreferenceContext();

    const [state, dispatch] = useReducer(reducer, initialState)

    return(
        <>
        <p>Main</p>
        <p>{JSON.stringify(state)}</p>
        </>
    )
}

export default Main