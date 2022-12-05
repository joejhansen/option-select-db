const db = require('../config/connection');
const { CodeId, ConnectName, Game, Metadata, PlayerInfo } = require('../../models')

const handleSlpUpload = async (payload) => {
    const { codeIds, displayNames, game } = payload
    try {
        db.once('open', async () => {
            // remove deletemanys for production
            // keep these
            await CodeId.insertMany(codeIds)
            await ConnectName.insertMany(connectNames)
            await Game.insertMany(games)
            await Metadata.insertMany(metadatas)
            await PlayerInfo.insertMany(playerInfos)
        });
        db.disconnect()
        return `Success uploading game`

    } catch (err) {
        return err
    }
}

module.exports = handleSlpUpload