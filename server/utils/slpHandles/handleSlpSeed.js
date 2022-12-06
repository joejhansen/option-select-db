const handleSlpParse = require('./handleSlpParse')
const handleSlpAnalyze = require('./handleSlpAnalyze')
const handleSlpUpload = require('./handleSlpUpload')
const fs = require('fs')
const seedFolder = '../testSlps/seedSlps'

fs.readdir(seedFolder, (err, files) => {
    files.forEach(async (file) => {
        try {
            const parsed = await handleSlpParse(`${seedFolder}/${file}`)
            const analyzed = await handleSlpAnalyze(parsed)
            const response = await handleSlpUpload(analyzed)
            return console.log(response)
        } catch (err) {
            return console.log(err)
        }
    })
})