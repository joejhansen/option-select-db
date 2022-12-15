const fs = require('fs')

const handleSlpReaddir = async (directory) => {
    try {
        files = []
        await fs.promises.readdir(directory)
            .then((filenames) => {
                for (filename of filenames) {
                    files.push(filename)
                }
            })
        return files
    } catch (err) {
        console.log(err)
        return null
    }
}

module.exports = handleSlpReaddir