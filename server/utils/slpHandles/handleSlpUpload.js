const db = require('../../config/connection');
const { CodeId, DisplayName, User, Game } = require('../../models')

// TODO: make this nicer. the lack of lets in the for ofs is bothering me but it works rn so i don't want to touch it atm

const handleSlpUpload = async (payload) => {
    let { game, codeIds, displayNames } = payload
    try {
        
        let newCodeId_ids = []
        for (codeId of codeIds) {
            const codeIdResponse = await CodeId.findOneAndUpdate(
                { 'connectCode': codeId.connectCode },
                { $setOnInsert: codeId },
                { new: true, upsert: true, },
            )
            newCodeId_ids.push(codeIdResponse._id)
            continue
        }
        for (let i = 0; i < newCodeId_ids.length; i++) {
            displayNames[i].codeIds = [newCodeId_ids[i]]
            continue
        }
        let newDisplayName_ids = []
        for (displayName of displayNames) {
            const displayNameResponse = await DisplayName.findOneAndUpdate(
                { 'displayName': displayName.displayName },
                displayName,
                { new: true, upsert: true }
            )
            newDisplayName_ids.push(displayNameResponse._id)
            continue
        }
        game.displayNames = newDisplayName_ids
        game.codeIds = newCodeId_ids
        // TODO: this does not work to sort out duplicates
        // must look at UTC start at AND both connect codes
        // this is annoying
        const newGameResponse = await Game.findOneAndUpdate(
            { 'metadata.startAt': game.startAt },
            game,
            { new: true, upsert: true }
        )
        let index = 0
        for (codeId of newCodeId_ids) {
            const addGameAndDisplayNames = await CodeId.updateOne(
                { '_id': codeId },
                { $addToSet: { 'games': newGameResponse._id, 'displayNames': newDisplayName_ids[index] } })

            index++
            continue
        }
        return true
    } catch (err) {
        console.log(`Error uploading game data`)
        console.log(err)
        return null
    }
}
module.exports = handleSlpUpload