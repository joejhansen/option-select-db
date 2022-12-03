import React, { useReducer, useState } from 'react'
// TODO: MAKE ACTIONS AND IMPORT THEM
import reducer from '../../utils/apollo/reducers'

import { usePreferenceContext } from '../../utils/react-context/PreferenceContext'

const Header = ({ children, theme }) => {
    const initialState = usePreferenceContext();

    // const [state, dispatch] = useReducer(reducer, initialState)

    const styles = {
        container: {
            backgroundColor: theme.primary,
            color: theme.text
        }
    }
    return (
        <>
            <header className='container-fluid' style={styles.container}>
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