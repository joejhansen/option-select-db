

const handleSlpParse = require('./handleSlpParse')
const handleSlpAnalyze = require('./handleSlpAnalyze')
const handleSlpUpload = require('./handleSlpUpload')
const handleSlpReaddir = require('./handleSlpReaddir')

const db = require('../../config/connection');
const { CodeId, DisplayName, Game } = require('../../models');

const tempDir = `../../upload/_tempSlps/`

const handleSlpSeed = async (directory, files) => {
    return new Promise(async (resolve, reject) => {
        await CodeId.deleteMany()
        await DisplayName.deleteMany()
        await Game.deleteMany()
        console.log(`documents deleted`)
        try {
            for (let file of files) {
                const parsed = await handleSlpParse(`${directory}${file.filename}`)
                // :( promisify the stats getting process?
                if (!parsed) {
                    console.log(`Error parsing .slp: ${file.filename}`)
                    continue
                }
                const analyzed = await handleSlpAnalyze(parsed)
                if (!analyzed) {
                    console.log(`Error analyzing parsed .slp: ${file.filename}`)
                    continue
                }
                const response = await handleSlpUpload(analyzed)
                if (!response) {
                    console.log(`Error uploading analyzed .slp: ${file.filename}`)
                    continue
                }
                console.log(`File uploaded succesfully: ${file.filename}`)
                continue
            }
            console.log(`Upload done, closing databse`)
            resolve(`Databse closed, ending program`)
        } catch (err) {
            console.log(err)
            reject(err)
        }
    })

}

// const init = async () => {
//     response = await handleSlpSeed(tempDir, files)
//     console.log(response)
// }

// init()


module.exports = handleSlpSeed