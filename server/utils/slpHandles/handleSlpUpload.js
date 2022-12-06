const db = require('../../config/connection');
const { CodeId, DisplayName, User, Game } = require('../../models')

const handleSlpUpload = async (payload) => {
    const { codeIds, displayNames, game } = payload
    try {
        db.once('open', async () => {
            // remove deletemanys for production
            // keep these
            const gameResponse = await Game.create(game)
            const gameId = gameResponse._id
            // await CodeId.create(codeIds)
            // await DisplayName.create(displayNames)
            db.close()
        });

        return `Success uploading game`

    } catch (err) {
        return err
    }
}

module.exports = handleSlpUpload