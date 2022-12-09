

const handleSlpParse = require('./handleSlpParse')
const handleSlpAnalyze = require('./handleSlpAnalyze')
const handleSlpUpload = require('./handleSlpUpload')
const handleSlpReaddir = require('./handleSlpReaddir')

const db = require('../../config/connection');

const tempDir = `../../upload/_tempSlps/`

const files = [
    'game_20211021t004801.slp',
    'game_20211021t004816.slp',
    'game_20211021t005029.slp',
    'game_20211021t005037.slp',
    'game_20211021t005404.slp',
]
const handleSlpSeed = async (directory, files) => {
    return new Promise(async (resolve, reject) => {
        try {
            for (let file of files) {
                const parsed = await handleSlpParse(`${directory}${file.filename}`)
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