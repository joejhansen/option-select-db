import React, { createContext, useContext } from "react";

const PreferenceContext = createContext();

export const usePreferenceContext = () => useContext(PreferenceContext);

export const PreferenceProvider = ({ children }) => {
    const preferences = {
        user: {
            _id: '',
            slippiID: '',
            username: '',
            slippiPort: '',
            slippiLocation: '',
        },
        theme: {
            primary: '',
            secondary: '',
            tertiary: '',
            accent: '',
            text: '',
        },
        session: {
            games: [],
        },
    }

    return (
        <PreferenceContext.Provider value={preferences}>
            {children}
        </PreferenceContext.Provider>
    )
}