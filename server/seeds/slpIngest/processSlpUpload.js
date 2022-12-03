const db = require('../config/connection');
const { CodeId, ConnectName, Game, Metadata, PlayerInfo } = require('../../models')

const processSlpUpload = async ({ codeIds, connectNames, games, metadatas, playerInfos, }) => {
    // for reference
    // { CodeIds, ConnectNames, Games, Metadatas, PlayerInfos, }
    try {
        db.once('open', async (payload) => {
            // remove deletemanys for production
            await CodeId.deleteMany({})
            await ConnectName.deleteMany({})
            await Game.deleteMany({})
            await Metadata.deleteMany({})
            await PlayerInfo.deleteMany({})
            // keep these
            await CodeId.insertMany(codeIds)
            await ConnectName.insertMany(connectNames)
            await Game.insertMany(games)
            await Metadata.insertMany(metadatas)
            await PlayerInfo.insertMany(playerInfos)
        });
        db.disconnect()

    } catch (err) {
        return err
    }
    return payload
}

module.exports = processSlpUpload