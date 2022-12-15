

const handleSlpParse = require('./handleSlpParse')
const handleSlpAnalyze = require('./handleSlpAnalyze')
const handleSlpUpload = require('./handleSlpUpload')
const handleSlpReaddir = require('./handleSlpReaddir')
const fs = require('fs').promises


const db = require('../../config/connection');
const { CodeId, DisplayName, Game } = require('../../models');

const tempDir = `../../upload/_tempSlps/`

const handleSlpSeed = async (directory, files) => {
    return new Promise(async (resolve, reject) => {
        try {
            for (let file of files) {
                const parsed = await handleSlpParse(`${directory}${file.filename}`)
                // :( promisify the stats getting process?
                if (!parsed) {
                    console.log(`Error parsing .slp: ${file.filename}`)
                    await fs.unlink(file.path)
                    continue
                }
                const analyzed = await handleSlpAnalyze(parsed)
                if (!analyzed) {
                    console.log(`Error analyzing parsed .slp: ${file.filename}`)
                    await fs.unlink(file.path)
                    continue
                }
                const response = await handleSlpUpload(analyzed)
                if (!response) {
                    console.log(`Error uploading analyzed .slp: ${file.filename}`)
                    await fs.unlink(file.path)
                    continue
                }
                console.log(`File uploaded succesfully: ${file.filename}`)
                await fs.unlink(file.path)
                continue
            }
            console.log(`Upload done, closing databse`)
            resolve(`Databse closed, ending program`)
        } catch (err) {
            console.log(`Error caught in handleSlpSeed.js`)
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