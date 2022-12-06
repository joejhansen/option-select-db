const db = require('../../config/connection');
const { CodeId, DisplayName, User, Game } = require('../../models')

const handleSlpUpload = async (payload) => {
    let { game, codeIds, displayNames } = payload
    try {
        let newCodeId_ids = []
        for (codeId of codeIds) {
            const codeIdResponse = await CodeId.findOneAndUpdate(
                { 'connectCode': { $ne: codeId.connectCode } },
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
                { 'displayName': { $ne: displayName.displayName } },
                { $setOnInsert: displayName },
                { new: true, upsert: true }
            )
            newDisplayName_ids.push(displayNameResponse._id)
            continue
        }
        game.displayNames = newDisplayName_ids
        const newGameResponse = await Game.findOneAndUpdate(
            { 'metadata.startAt': game.startAt },
            game,
            { new: true, upsert: true }
        )
        let index = 0
        // TODO: FIX THIS
        // $push, $addToSet don't work
        // F$*#$)@#%&
        for (codeId of newCodeId_ids) {
            console.log(codeId, newGameResponse._id)
            const addGameAndDisplayNames = await CodeId.updateOne(
                { '_id': codeId },
                { $addToSet: { 'games': newGameResponse._id, 'displayNames': newDisplayName_ids[index] } })
            // { upsert: true }
            // displayNames: { _id: newDisplayName_ids[index] } 

            console.log(`gameid added to codeid`)
            index++
            continue
        }
        return true
    } catch (err) {
        return console.log(err)
    }
}
module.exports = handleSlpUpload