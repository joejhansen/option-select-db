import React, { createContext, useContext } from "react";

const PreferenceContext = createContext();

export const usePreferenceContext = () => useContext(PreferenceContext);

export const PreferenceProvider = ({ children }) => {
    const preferences = {
        user: {
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
        // each game default shape will only have 2 players. idk about doubles.
        session: {
            game: {
                players: [
                    {
                        username: '', //this can change per username, not unique
                        slippiID: '', //slippiID cannot change, this will have to be unique
                        percent: 0,
                        character: '',
                        comboCount: 0,
                        projectiles: 0,
                        SDs: 0,
                    },
                ],
                settings: {
                    datePlayed: 0, //am i really gonna do this by epoch? would matter for updating mutable information like player username
                    stocks: 4, //default stock count is 4
                    stage: '',
                    items: false, //default items used is false
                    timeLimit: 8 * 60 * 1000, //default timer is 8 seconds 
                    timeDuration: 0, //duration time of the match 
                },
            },
            percentTaken: [],
            percentGiven: [],
            galint: [],
            opponents: [],
            cowards: [],
            Zero2Death: [],
            FourStock: [],
        },
        history: {
            games: {}
        }
    }

    return (
        <PreferenceContext.Provider value={preferences}>
            {children}
        </PreferenceContext.Provider>
    )
}