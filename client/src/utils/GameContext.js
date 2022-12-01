import React, { createContext, useContext } from "react";

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    const game = {
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
    }


    return (
        <GameContext.Provider value={game}>
            {children}
        </GameContext.Provider>
    )
}