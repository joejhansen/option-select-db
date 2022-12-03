import React, { createContext, useContext } from "react";

const PreferenceContext = createContext();

export const usePreferenceContext = () => useContext(PreferenceContext);

export const PreferenceProvider = ({ children }) => {

    let preferences

    let defaultPreferences = {
        user: {
            _id: '',
            email: '',
            username: '',
        },
        theme: {
            // dark
            // generously provided by google
            primary: '#303134',
            secondary: '#202124',
            tertiary: '#303134',
            accent: '#f88a8a',
            text: '#bdc1c6',
        },
        session: {
            games: [],
        },
    }

    const savedPreferences = localStorage.getItem('savedPreferences')
    if (!savedPreferences) {
        preferences = defaultPreferences
    } else {
        preferences = savedPreferences
    }

    return (
        <PreferenceContext.Provider value={preferences}>
            {children}
        </PreferenceContext.Provider>
    )
}