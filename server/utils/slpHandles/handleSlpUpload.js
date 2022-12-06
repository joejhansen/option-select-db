const db = require('../../config/connection');
const { CodeId, DisplayName, User, Game } = require('../../models')

const handleSlpUpload = async (payload) => {
    // console.log(game, codeIds, displayNames)
    let { game, codeIds, displayNames } = payload
    try {
        let newCodeId_ids = []
        for (codeId of codeIds) {
            const codeIdResponse = await CodeId.findOneAndUpdate(
                { 'connectCode': codeId.connectCode },
                codeId,
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
                { displayName: displayName.displayName },
                displayName,
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
        for (codeId of newCodeId_ids) {
            const addGameAndDisplayNames = await CodeId.findOneAndUpdate(
                { _id: codeId },
                { $push: { games: newGameResponse._id, displayNames: newDisplayName_ids[index] } },
                { new: true }
            )
            index++
            continue
        }
        return true
    } catch (err) {
        return err
    }
}
module.exports = handleSlpUpload
// for (let i = 0; i < codeIds.length - 1; i++) {
// }
// console.log(`out of the loop`)

// const codeId_ids = [] //for lookup to add displayNames and games_id;s
// const displayNames_ids = []
// for (let i = 0; i < displayNamesResponse.length; i++) {
//     const new_id = displayNamesResponse[i]._id
//     displayNames_ids.push(new_id)
// }
// game.displayNames = displayNames_ids
// const gameResponse = await Game.create(game)
// const newGame_id = gameResponse._id
// for (let i = 0; i < codeId_ids.length; i++) {
//     const updateCodeIdResponse = await CodeId.findByIdAndUpdate(codeId_ids[i], { $push: { "displayNames": displayNames_ids[i], "games": newGame_id } }, { new: true })
// }

// THIS IS THE FULL GAME RESPONSE FOR THE FRONT END, with EVERYTHING YOU NEED BASICALLY
// let fullGameResponseTest = await Game.findById(newGame_id).populate({
//     path: 'displayNames',
//     populate: {
//         path: 'codeIds'
//     }
// })
// fullGameResponseTest = JSON.stringify(fullGameResponseTest, null, 2)
// game.displayNames =



// const gameResponse = await Game.create(game)                        //needs displayName._id's
// const gameId = gameResponse._id
// await CodeId.create(codeIds)
// await DisplayName.create(displayNames)
// const testResponse = await Game.findOne({ 'metadata.startAt': '2022-09-08T07:44:48.000+00:00' })
// console.log(handleSlpUpload(null))