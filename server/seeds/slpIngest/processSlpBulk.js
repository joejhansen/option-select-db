const processSlp = require("./processSlp");

const processSlpBulk = async (games) => {
    console.log(`starting bulk process`)
    let processed = []
    let errors = []
    try {
        for (let i = 0; i < games.length; i++) {
            console.log({ i: i, games: games.length })
            console.log(`processing game ${i}`)
            const response = await processSlp(games[i])
            if (!response) {
                errors.push({ message: 'error processing game', game: games[i] })
                continue
            }
            processed.push({ message: `game processed`, game: games[i], response: response, })
            continue
        }
        return { processed, errors }
    } catch (err) {
        return { error: err }
    }
}

module.exports = processSlpBulk