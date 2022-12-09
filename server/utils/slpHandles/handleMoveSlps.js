
const handleMoveSlps = async (dir, slpFiles) => {
    const slpRegex = /^.*\.(slp)$/
    const validFiles = slpFiles.filter(file => file.name.match(slpRegex));
    console.log(slpFiles)
    
    // try {
    //     let filesUploaded = 0
    //     for await (let slpFile of slpFiles) {
    //         let uploadPath = dir + slpFile.name;
    //         if (!slpFile.name.match(slpRegex)) {
    //             console.log(`Not a slippi file!`)
    //             continue
    //         }
    //         const response = await slpFile.mv(uploadPath)
    //         console.log(response)
    //         if (response) {
    //             console.log(`Success moving ${slpFile}`)
    //             continue
    //         } else {
    //             console.log(`Failure!`)
    //             continue
    //         }
    //     }
    //     console.trace(filesUploaded)
    //     if (filesUploaded > 0) {
    //         return `success!`
    //     } else {
    //         return null
    //     }
    // } catch (err) {
    //     return null
    // }
}

module.exports = handleMoveSlps