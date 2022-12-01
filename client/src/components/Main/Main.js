import React, { useReducer, useState } from 'react'
// TODO: MAKE ACTIONS AND IMPORT THEM

import reducer from '../../utils/reducers'
import About from './About/About'

import { usePreferenceContext } from '../../utils/PreferenceContext'
import { usePageContext } from '../../utils/PageContext'

const Main = () => {
    const page = usePageContext();
    const [statePage, dispatchPage] = useReducer(reducer, page)
    
    const preferences = usePreferenceContext();
    const [statePreferences, dispatchPreferences] = useReducer(reducer, preferences)

    const renderContent = () => {
        switch (statePage) {
            case 'About':
                return <About />        
            default:
                return <About />
        }
    }
    return (
        <>
            <p>Main</p>
            <p>{JSON.stringify(statePage)}</p>
            {renderContent()}
        </>
    )
}

export default Main