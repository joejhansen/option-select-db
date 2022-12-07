

const handleSlpParse = require('./handleSlpParse')
const handleSlpAnalyze = require('./handleSlpAnalyze')
const handleSlpUpload = require('./handleSlpUpload')
const handleSlpReaddir = require('./handleSlpReaddir')

const fs = require('fs')
const directory = '../testSlps/seedSlps/'
const db = require('../../config/connection');
const { User, Game, CodeId, DisplayName } = require('../../models')
const handleSlpSeed = async (directory) => {
    // DB OPEN ONCE FOR THE ENTIRE TIME, THEN CLOSE
    files = await handleSlpReaddir(directory)
    db.once('open', async () => {
        await User.deleteMany()
        console.log(`users deleted`)
        await Game.deleteMany()
        console.log(`games deleted`)
        await CodeId.deleteMany()
        console.log(`codeid's deleted`)
        await DisplayName.deleteMany()
        console.log(`displaynames deleted`)
        for (file of files) {
            const parsed = await handleSlpParse(`${directory}${file}`)
            if (!parsed) {
                return console.log(`Error parsing .slp: ${file}`)
            }
            const analyzed = await handleSlpAnalyze(parsed)
            if (!analyzed) {
                return console.log(`Error analyzing parsed .slp: ${file}`)
            }
            const response = await handleSlpUpload(analyzed)
            if (!response) {
                return console.log(`Error uploading analyzed .slp: ${file}`)
            }
            continue
        }
        console.log(`Upload done, closing databse`)
        db.close()
        return console.log(`Databse closed, ending program`)
    })
}

handleSlpSeed(directory)