const db = require('../config/connection');
const { CodeId, ConnectName, Game, Metadata, PlayerInfo, User } = require('../models');
const { processSlp, processSlpBulk, processSlpUpload } = require('./slpIngest')
const games = [
  { game: 'melee' },
  { game: 'melee' },
  { game: 'melee' },
  { game: 'melee' },
]

db.once('open', async () => {
  if (!games || typeof (games) !== 'object') {
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
    return console.log(response, 'hello')
  } catch (err) {
    return console.log(err)
  }
});

