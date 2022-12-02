import processSlp from "./processSlp";

const processSlpBulk = async (games) => {
    games.map(async (game) => {
        const response = await processSlp(game)
        if (!response) {
            return { message: 'error processing game', game: game }
        }
        return { message: `game processed`, game: game, response: response, }
    });
}

export default processSlpBulk