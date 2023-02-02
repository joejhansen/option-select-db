

const handleSlpParse = require('./handleSlpParse')
const handleSlpAnalyze = require('./handleSlpAnalyze')
const handleSlpUpload = require('./handleSlpUpload')
const fs = require('fs').promises

// TODO: make tests for edge cases


const db = require('../../config/connection');
const { CodeId, DisplayName, Game } = require('../../models');

const tempDir = `../../upload/_tempSlps/`

// this function takes the directory we temporarily uploaded the .slp files to, then parses the binary file using SlippiJS, molds the data into a shape we like, and uploads it to the MongoDB Atlas db. after that's done, whether on success or error, will delete the individual file so as not to clog the servers hard memory.
const handleSlpSeed = async (directory, files) => {
    return new Promise(async (resolve, reject) => {
// have to make this a promise due to race condition between files being uploaded and the server calling this function with less processing power
        try {
            for (let file of files) {
                // use the file to instatiate a new Slippi-JS game class
                const parsed = await handleSlpParse(`${directory}${file.filename}`)
                if (!parsed) {
                    console.log(`Error parsing .slp: ${file.filename}`)
                    await fs.unlink(file.path)
                    continue
                }
                // use the parsed data and mold it into a shape that the database likes
                const analyzed = await handleSlpAnalyze(parsed)
                if (!analyzed) {
                    console.log(`Error analyzing parsed .slp: ${file.filename}`)
                    await fs.unlink(file.path)
                    continue
                }
                // upload the molded slippi data
                const response = await handleSlpUpload(analyzed)
                if (!response) {
                    console.log(`Error uploading analyzed .slp: ${file.filename}`)
                    await fs.unlink(file.path)
                    continue
                }
                console.log(`File uploaded succesfully: ${file.filename}`)
                await fs.unlink(file.path)
                // this deletes the file
                continue
            }
            console.log(`Upload done: ${files.length} files`)
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