

const handleSlpParse = require('./handleSlpParse')
const handleSlpAnalyze = require('./handleSlpAnalyze')
const handleSlpUpload = require('./handleSlpUpload')
const fs = require('fs')
const game1 = '../testSlps/seedSlps/Game_20220908T021502.slp'
const game2 = '../testSlps/seedSlps/Game_20220908T021933.slp'
const game3 = '../testSlps/seedSlps/Game_20220908T022022.slp'
const game4 = '../testSlps/seedSlps/Game_20220908T022241.slp'
const game5 = '../testSlps/seedSlps/Game_20220908T022504.slp'
const db = require('../../config/connection');
const { User, Game, CodeId, DisplayName } = require('../../models')
const handleSlpSeed = async (seedFiles) => {
    // DB OPEN ONCE FOR THE ENTIRE TIME, THEN CLOSE
    db.once('open', async () => {
        await User.deleteMany()
        console.log(`users deleted`)
        await Game.deleteMany()
        console.log(`games deleted`)
        await CodeId.deleteMany()
        console.log(`codeid's deleted`)
        await DisplayName.deleteMany()
        console.log(`displaynames deleted`)
        for (seedFile of seedFiles) {
            const parsed = await handleSlpParse(`${seedFile}`)
            const analyzed = await handleSlpAnalyze(parsed)
            const response = await handleSlpUpload(analyzed)
            if (response) {
                console.log(`Success uploading ${seedFile}`)
            }
            continue
        }
        console.log(`Upload done, closing databse`)
        db.close()
        return console.log(`Databse closed, ending program`)
    })
}

handleSlpSeed([game1, game2, game3, game4, game5])