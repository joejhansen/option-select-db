const { SlippiGame } = require('@slippi/slippi-js')

const slp = './testSlps/testRealGame.slp'

const handleSlpParse = async (slp) => {
    try {
        // instantiating a new SlippiGame class for parsing
        const game = new SlippiGame(slp)
        // parsing the new SlippiGame = game
        const settings = game.getSettings()
        const metadata = game.getMetadata()
        const stats = game.getStats()
        const winners = game.getWinners()
        // okay, SO
        // getWinners() is a relatively new method (as of 11/05/22) and so is apparently not supported on older generate .slps
        // as such, we're gonna have to fill this object ourselves for if !winners.length

        // const frames = JSON.stringify(game.getFrames(), null, 2)
        // const rollbackFrames = JSON.stringify(game.getRollbackFrames(), null, 2)
        // const payload = JSON.stringify({ settings, metadata, stats, frames, rollbackFrames, winners }, null, 2)
        const payload = { settings, metadata, stats, winners }
        // uncomment the below if you would like to look at these files.
        // fs.writeFileSync('./testSlps/parsedTestSlpJSONs/testSlpParse.json', payload)
        // fs.writeFileSync('./testSlps/parsedTestSlpJSONs/testSlpParseSettings.json', settings)
        // fs.writeFileSync('./testSlps/parsedTestSlpJSONs/testSlpParseMetadata.json', metadata)
        // fs.writeFileSync('./testSlps/parsedTestSlpJSONs/testSlpParseStats.json', stats)
        // fs.writeFileSync('./testSlps/parsedTestSlpJSONs/testSlpParseFrames.json', frames)
        // fs.writeFileSync('./testSlps/parsedTestSlpJSONs/testSlpParseRollbackFrames.json', rollbackFrames)
        // fs.writeFileSync('./testSlps/parsedTestSlpJSONs/testSlpParseWinners.json', winners)
        return payload
    } catch (err) {
        return null
    }
}

module.exports = handleSlpParse
// handleSlpParse(slp)