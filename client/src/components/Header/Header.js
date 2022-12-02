import React, { useReducer, useState } from 'react'
// TODO: MAKE ACTIONS AND IMPORT THEM
import reducer from '../../utils/reducers'

import { usePreferenceContext } from '../../utils/PreferenceContext'

const Header = ({ children }) => {
    const initialState = usePreferenceContext();

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <>
            <header className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3 d-flex justify-content-center'>
                        <h1>Logo/Title</h1>
                    </div>
                    <div className='col-md-9'>
                        {children}
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header