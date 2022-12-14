// in this function, we take the parsed slp file using slippi-js and parse it further for our primary models
// Game, CodeId, DisplayName, and User

// TODO: add hate speech filter for display names. 
// you can still upload as "fuck nintento" and other curse words but the *other* stuff, uh, no
// MAYBE: allow the game data for the non-offending party's benefit but censor with generic '****' for code and displayName to disincentivize as much as possible


const handleSlpAnalyze = (payload) => {
    try {
        let {
            settings,                           //object     
            metadata,                           //object
            stats,                              //object
            // frames,                          //object
            // rollbackFrames,                     //object
            winners                             //array of objects
        } = payload
        // TODO: add winners data if it's not there
        //players is an array of at least 2 objects
        //keep as const immutability
        const {
            // slpVersion,                         //string matching /\d{0,3}.\d{0,3}.\d{0,3}/             
            // isTeams,                            //boolean                                               
            // isPAL,                              //boolean
            // stageId,                            //num
            players: playersSettings,           //array. "players" is shared as a keyname throughout
            // scene,                              //num
            // gameMode,                           //num
            // language                            //num
        } = settings
        // slpVersion,isTeams,isPAL,stageId,playersSettings,scene,gameMode,and language require no change
        // export as is within game object

        // const player1 = playersSettings[0]
        // const {
        //     playerIndex: playerIndex1,          //num
        //     port: port1,                        //num
        //     characterId: characterId1,          //num
        //     characterColor: characterColor1,    //num
        //     startStocks: startStocks1,          //num
        //     type: type1,                        //num
        //     teamId: teamId1,                    //num
        //     controllerFix: controllerFix1,      //string that may or may not be "UCF" for universal controller fix
        //     nametag: nametag1,                  //string, usually empty ''
        //     displayName: displayName1,          //string length {1,15} per slippi.gg rules
        //     connectCode: connectCode1,          //string that will be /\w{1,4}#\d{1,3}/
        //     userId: userId1                     //string. this is a uuid made through slippi.gg account
        // } = player1
        // const player2 = playersSettings[1]
        // const player3 = playersSettings[2]
        // const player4 = playersSettings[3]

        //players is an object with at least two players denoted by their index, 0 through 3 at most for ports 1-4
        let {
            startAt,                            //string. example : "2022-12-05T03:43:00Z"
            lastFrame,                          //num
            players: playersMetadataObject,           //object with object where keys = index
            playedOn                            //string. usually 'dolphin'
        } = metadata

        // if the game length is less than 30 seconds (1800 frames), skip it
        // will filter out most auto quit-outs
        if (lastFrame <= 1800) {
            return null
        }
        // for some reason, players.characters is "characterNum": "someRandomNumIDKWhatIt'sFor", so let's get rid of the value and just use the key as a number
        const playersMetadata = []
        for (let [player, data] of Object.entries(playersMetadataObject)) {
            // a netplay name and code in the game metadata component is required
            if (!data.names.netplay || !data.names.code) {
                return null
            }
            let characters = []
            for (let [character, innerData] of Object.entries(data.characters)) {
                characters.push(character)
            }
            data.characters = characters
            playersMetadata.push(data)
        }
        // repacking metadata in our desired format
        metadata = { startAt, lastFrame, players: playersMetadata, playedOn }
        // console.log(metadata.players)

        const {
            //     lastFrames,                         //num
            //     playableFrameCount,                 //num
            // we have to check if the following three exist
            stocks,                             //array of objects in chronological order by the frame the stock was lost.
            conversions,                        //array of objects in chronological order by the frame the combo->kill starts
            combos,                             //array of objects in chronological order by the frame the combo starts. will include everything in array in line above
            //     actionCounts,                       //array of objects equal to the ammount of players in that game, ordered by playerindex
            //     overall,                            //array of objects equal to the ammount of players in that game, ordered by playerindex
            //     gameComplete                        //boolean. checking for quit-outs(LRAStart)
        } = stats
        // requires no unpacking
        // stats does not include any reference to the DisplayName or ConnectCode, only the playerIndex/port#
        if (stocks.length <= 2 || !conversions.length || !combos.length) {
            // if no stocks were lost by either player, if no conversions were made, or if no combos were made, reject the game
            // TODO: be more sophisticated about this for edge cases such as JV5s
            return null
        }
        //all of these may be 0 if played on a local connection, therefore no lag and no need for rollback
        // const {
        //     frames: framesRollback,             //object
        //     count,                              //num = framesRollback length
        //     lengths                             //array. not sure what this is
        // } = rollbackFrames


        //this is an array for some reason. idk why. maybe for teams? we destructure it and then put the stuff in an object for conformity
        // winner is already an array, so we keep as is



        // we're doing frames last just in case
        // and we're going to use lodash because i'm scared to do this with vanilla
        // so, frames is an object containing more objects with keys representing their index i.e. the first object on the top level is a frame with key '0', the next is the frame with key '1', and so on
        // and we need to return useful data from this.
        // i'm probably just going to do this seperately because it's a shitload of data to iterate through.

        // now we convert to the model shapes


        let displayNames = []
        for (let i = 0; i < playersSettings.length; i++) {
            if (!playersSettings[i].displayName) {
                return null
            }
            const displayName = {
                displayName: playersSettings[i].displayName,
                codeIds: [] //add id's after adding other info
            }
            displayNames.push(displayName)
        }

        const codeIds = []
        for (let i = 0; i < playersSettings.length; i++) {
            if (!playersSettings[i].connectCode) {
                return null
            }
            const codeId = {
                appUser: null,
                connectCode: playersSettings[i].connectCode,
                userId: playersSettings[i].userId,
                displayNames: [], //add id's after adding other info
                games: [], //add id's after adding other info
            }
            codeIds.push(codeId)
        }
        // within codeID
        // appUser may be null as a user may not have claimed it yet
        // displaNames will be an empty array, must fill with [...DisplayNameIds, newDisplayNameId]
        // games be an empty array, must fill with [...GameIDs, newGameId]

        const game = {
            displayNames: [],
            codeIds: [],
            settings,
            metadata,
            stats,
            winners
        }
        // TODO: construct winners with the available data if the slippi-game object returns !winners.length

        const finalPayload = {
            codeIds,                    //an array
            displayNames,               //an array
            game                        //a single object
        }
        return finalPayload
    } catch (err) {
        console.log(`Error analyzing slippi-js data`)
        console.log(err)
        return null
    }
}

module.exports = handleSlpAnalyze