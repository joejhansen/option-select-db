// const db = require('../config/connection');
const { CodeId, ConnectName, Game, Metadata, PlayerInfo, User } = require('../models');
const { processSlp, processSlpBulk, processSlpUpload } = require('./slpIngest')
const games = [
  // { game: 'melee' },
  // { game: 'melee' },
  // { game: 'melee' },
  // { game: 'melee' },
]
const seedSlp = async (games) => {
  if (!games || !games.length || typeof (games) !== 'object') {
    return { message: `no games in array` }
  }
  try {
    const { processed, errors } = await processSlpBulk(games)
    if (!processed && !errors) {
      return { message: `Error in bulk process`, games: games }
    }
    console.log(`to upload`)
    const response = await processSlpUpload(processed)
    if (!response) {
      return { message: `Error uploading processed files`, processed: processed }
    }
    console.log({ processed: processed, errors: errors, response: response })
    return { response: response }
  } catch (err) {
    return console.log(err)
  }
}
// db.once('open', seedSlp(games));


const response = seedSlp(games)

console.log(response)

// node doesn't close without commenting out all the db stuff because it's still listening to events