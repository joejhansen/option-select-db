const { SlippiGame } = require('@slippi/slippi-js')
const fs = require('fs')

const slp = './testSlps/test.slp'

const handleSlpParse = async (slp) => {
    try {
        const game = new SlippiGame(slp)
        const settings = JSON.stringify(game.getSettings(), null, 2)
        const metadata = JSON.stringify(game.getMetadata(), null, 2)
        const stats = JSON.stringify(game.getStats(), null, 2)
        const frames = JSON.stringify(game.getFrames(), null, 2)
        const rollbackFrames = JSON.stringify(game.getRollbackFrames(), null, 2)
        const winners = JSON.stringify(game.getWinners(), null, 2)
        // const payload = JSON.stringify({ settings, metadata, stats, frames, rollbackFrames, winners }, null, 2)
        const payload = { settings, metadata, stats, frames, rollbackFrames, winners }
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
        return { message: `error parsing slp file`, err: err }
    }
}

handleSlpParse(slp)