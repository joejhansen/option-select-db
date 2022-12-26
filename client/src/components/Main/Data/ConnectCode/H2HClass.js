class H2HClass {
    // make this for the entire page or just for the individual histories?
    // could better refactor if the latter
    // idfk
    // TODO: make this for individual players for the offchance that doubles becomes more popular
    constructor({ data, players }) {
        const codeRegex = /^(?=.{1,8}$)[A-Z]*\-\d*$/i
        // data is the full data object
        // players is an array of the IDs provided in the params, we'll do some logic to figure out how to display it
        console.log(data)
        const h2h = data.matchup
        // setting up the p# object
        this.gamesPlayed = data.matchup.length
        this.gameInfo = data.matchup.map((game)=>{
            return {_id:game._id, date: new Date(parseInt(game.metadata.startAt)).toLocaleString()}
        })
        console.log(this.gameInfo)
        this.p1 = {}
        this.p2 = {}
        let player1, player2
        let linkToP1, linkToP2
        if (players[0].match(codeRegex) && players[1].match(codeRegex)) {
            linkToP1 = `../${players[0]}`
            player1 = players[0].replace(/-/g, '#')
            linkToP2 = `../${players[1]}`
            player2 = players[1].replace(/-/g, '#')

        } else {
            // data.matchup is an array of games, we look at the first one to matchup the params of :players[0]/vs/:players[1] such that players[0] is always in the left column regardless of the game data (player index)
            if (data.matchup[0].codeIds[0]._id === players[0]) {
                player1 = data.matchup[0].codeIds[0].connectCode
                linkToP1 = `../${players[0]}`
                player2 = data.matchup[0].codeIds[1].connectCode
                linkToP2 = `../${players[1]}`
            } else {
                player1 = data.matchup[0].codeIds[1].connectCode
                linkToP1 = `../${players[1]}`
                player2 = data.matchup[0].codeIds[0].connectCode
                linkToP2 = `../${players[0]}`
            }
        }
        this.p1 = {
            connectCode: player1,
            link: linkToP1
        }
        this.p2 = {
            connectCode: player2,
            link: linkToP2
        }
        let playersInfo = {}
        playersInfo[player1] = []
        playersInfo[player2] = []
        for (let game of data.matchup) {
            // The player index can change for each game, but the data is normalized to that index within the game
            let player1Index, player2Index
            if (game.settings.players[0].connectCode === player1) {
                player1Index = 0
                player2Index = 1
            } else {
                player1Index = 1
                player2Index = 0
            }
            playersInfo[player1].push(game.stats.overall[player1Index])
            playersInfo[player2].push(game.stats.overall[player2Index])
        }
        let playersInfoAvg = {}
        playersInfoAvg[player1] = {
            beneficialTradeRatio: [],
            conversionCount: [],
            counterHitRatio: [],
            damagePerOpening: [],
            digitalInputsPerMinute: [],
            inputCounts: [],
            inputsPerMinute: [],
            killCount: [],
            neutralWinRatio: [],
            openingsPerKill: [],
            successfulConversions: [],
            totalDamage: []
        }
        playersInfoAvg[player2] = {
            beneficialTradeRatio: [],
            conversionCount: [],
            counterHitRatio: [],
            damagePerOpening: [],
            digitalInputsPerMinute: [],
            inputCounts: [],
            inputsPerMinute: [],
            killCount: [],
            neutralWinRatio: [],
            openingsPerKill: [],
            successfulConversions: [],
            totalDamage: []
        }
        for (let stats of playersInfo[player1]) {
            // playersInfoAvg[player1].push()
            playersInfoAvg[player1].beneficialTradeRatio.push(stats.beneficialTradeRatio)
            playersInfoAvg[player1].conversionCount.push(stats.conversionCount)
            playersInfoAvg[player1].counterHitRatio.push(stats.counterHitRatio)
            playersInfoAvg[player1].damagePerOpening.push(stats.damagePerOpening)
            playersInfoAvg[player1].digitalInputsPerMinute.push(stats.digitalInputsPerMinute)
            playersInfoAvg[player1].inputCounts.push(stats.inputCounts)
            playersInfoAvg[player1].inputsPerMinute.push(stats.inputsPerMinute)
            playersInfoAvg[player1].killCount.push(stats.killCount)
            playersInfoAvg[player1].neutralWinRatio.push(stats.neutralWinRatio)
            playersInfoAvg[player1].openingsPerKill.push(stats.openingsPerKill)
            playersInfoAvg[player1].successfulConversions.push(stats.successfulConversions)
            playersInfoAvg[player1].totalDamage.push(stats.totalDamage)
        }
        for (let stats of playersInfo[player2]) {
            // playersInfoAvg[player1].push()
            playersInfoAvg[player2].beneficialTradeRatio.push(stats.beneficialTradeRatio)
            playersInfoAvg[player2].conversionCount.push(stats.conversionCount)
            playersInfoAvg[player2].counterHitRatio.push(stats.counterHitRatio)
            playersInfoAvg[player2].damagePerOpening.push(stats.damagePerOpening)
            playersInfoAvg[player2].digitalInputsPerMinute.push(stats.digitalInputsPerMinute)
            playersInfoAvg[player2].inputCounts.push(stats.inputCounts)
            playersInfoAvg[player2].inputsPerMinute.push(stats.inputsPerMinute)
            playersInfoAvg[player2].killCount.push(stats.killCount)
            playersInfoAvg[player2].neutralWinRatio.push(stats.neutralWinRatio)
            playersInfoAvg[player2].openingsPerKill.push(stats.openingsPerKill)
            playersInfoAvg[player2].successfulConversions.push(stats.successfulConversions)
            playersInfoAvg[player2].totalDamage.push(stats.totalDamage)
        }
        // basic info, connect codes and display names
        this.p1 = {
            // why did i do this to myself
            ...this.p1,
            conversionsPerGame: Math.floor((playersInfoAvg[player1].conversionCount.reduce((a, v) => {
                return (a + v)
            }) / playersInfo[player1].length) * 100) / 100,
            damagePerOpening: Math.floor((playersInfoAvg[player1].damagePerOpening.reduce((a, v) => {
                return a + v.ratio
            }, 0) / playersInfo[player1].length) * 100) / 100,
            inputsPerMinute: Math.floor((playersInfoAvg[player1].inputsPerMinute.reduce((a, v) => {
                return a + v.ratio
            }, 0) / playersInfo[player1].length) * 100) / 100,
            killsPerGame: Math.floor((playersInfoAvg[player1].killCount.reduce((a, v) => {
                return a + v
            }, 0) / playersInfo[player1].length) * 100) / 100,
            neutralWinsPer: Math.floor((playersInfoAvg[player1].neutralWinRatio.reduce((a, v) => {
                return a + v.ratio
            }, 0) / playersInfo[player1].length) * 10000) / 100,
            openingsPerKill: Math.floor((playersInfoAvg[player1].openingsPerKill.reduce((a, v) => {
                return a + v.ratio
            }, 0) / playersInfo[player1].length) * 100) / 100,
            conversionSuccess: Math.floor((playersInfoAvg[player1].successfulConversions.reduce((a, v) => {
                return a + v.ratio
            }, 0) / playersInfo[player1].length) * 10000) / 100,
            damagePerGame: Math.floor((playersInfoAvg[player1].totalDamage.reduce((a, v) => {
                return a + v
            }, 0) / playersInfo[player1].length) * 100) / 100,
        }
        this.p2 = {
            ...this.p2,
            conversionsPerGame: Math.floor((playersInfoAvg[player2].conversionCount.reduce((a, v) => {
                return (a + v)
            }) / playersInfo[player2].length) * 100) / 100,
            damagePerOpening: Math.floor((playersInfoAvg[player2].damagePerOpening.reduce((a, v) => {
                return a + v.ratio
            }, 0) / playersInfo[player2].length) * 100) / 100,
            inputsPerMinute: Math.floor((playersInfoAvg[player2].inputsPerMinute.reduce((a, v) => {
                return a + v.ratio
            }, 0) / playersInfo[player2].length) * 100) / 100,
            killsPerGame: Math.floor((playersInfoAvg[player2].killCount.reduce((a, v) => {
                return a + v
            }, 0) / playersInfo[player2].length) * 100) / 100,
            neutralWinsPer: Math.floor((playersInfoAvg[player2].neutralWinRatio.reduce((a, v) => {
                return a + v.ratio
            }, 0) / playersInfo[player2].length) * 10000) / 100,
            openingsPerKill: Math.floor((playersInfoAvg[player2].openingsPerKill.reduce((a, v) => {
                return a + v.ratio
            }, 0) / playersInfo[player2].length) * 100) / 100,
            conversionSuccess: Math.floor((playersInfoAvg[player2].successfulConversions.reduce((a, v) => {
                return a + v.ratio
            }, 0) / playersInfo[player2].length) * 10000) / 100,
            damagePerGame: Math.floor((playersInfoAvg[player2].totalDamage.reduce((a, v) => {
                return a + v
            }, 0) / playersInfo[player2].length) * 100) / 100,
        }

    }
}

export default H2HClass