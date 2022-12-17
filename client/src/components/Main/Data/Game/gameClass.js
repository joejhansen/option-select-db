import movesList from '../../../../utils/game-info/moves.json'
import charactersList from '../../../../utils/game-info/characters.json'
import stagesList from '../../../../utils/game-info/stages.json'


class Game {
    constructor(data) {
        // game metadata
        this.fullData = data
        this.startDate = new Date(parseInt(data.game.metadata.startAt))
        this.winnerIndex = data.game.stats.conversions[data.game.stats.conversions.length - 1].lastHitBy
        this.winnerName = data.game.displayNames[this.winnerIndex].displayName
        this.winnerCode = data.game.codeIds[this.winnerIndex].connectCode
        // player info
        // p1
        this.p1.displayNames = data.game.displayNames[0].displayName
        this.p1.displayLink = `../../displayname/${this.p1.displayName}`
        this.p1.connectCodes = data.game.codeIds[0].connectCode
        this.p1.codeLink = `../../connectocde/${this.p1.connectCode.replace('#', '-')}`
        this.p1.character = data.game.metadata.players[1].characters.length > 1 ? `Ice Climbers` : charactersList[game.metadata.players[1].characters[0]].name
        // p2
        this.p2.displayName = data.game.displayNames[1].displayName
        this.p2.displayLink = `../../displayname/${this.p2.displayName}`
        this.p2.connectCode = data.game.codeIds[1].connectCode
        this.p2.codeLink = `../../connnectcode${this.p2.connectCode.replace('#', '-')}`
        // link to head-2-head chart
        this.h2hLink = `../../connectcode/${this.connectCodes.p1.replace('#', '-')}/vs/${this.connectCodes.p2.replace('#', '-')}`

        // overall table stats
        // offense
        // kills
        this.p1.kills = data.game.stats.overall[0].killCount
        this.p2.kills = data.game.stats.overall[1].killCount
        // damage
        this.p1.damage = Math.floor(data.game.stats.overall[0].totalDamage * 100) / 100
        this.p2.damage = Math.floor(data.game.stats.overall[1].totalDamage * 100) / 100
        // openings/conversion rate
        this.p1.conversionRate = Math.floor(data.game.stats.overall[0].successfulConversions.ratio * 10000) / 100
        this.p1.conversionCount = data.game.stats.overall[0].successfulConversions.count
        this.p1.conversionTotal = data.game.stats.overall[0].successfulConversions.total
        this.p2.conversionRate = Math.floor(data.game.stats.overall[1].successfulConversions.ratio * 10000) / 100
        this.p2.conversionCount = data.game.stats.overall[1].successfulConversions.count
        this.p2.conversionTotal = data.game.stats.overall[1].successfulConversions.total
        // openings/kill
        this.p1.openingsKill = Math.floor(data.game.stats.overall[0].openingsPerKill.ratio * 1000) / 1000
        this.p2.openingsKill = Math.floor(data.game.stats.overall[1].openingsPerKill.ratio * 1000) / 1000
        // defense
        // rolls
        this.p1.rolls = data.game.stats.actionCounts[0].rollCount
        this.p2.rolls = data.game.stats.actionCounts[1].rollCount
        // airdodges
        this.p1.airdodges = data.game.stats.actionCounts[0].airDodgeCount
        this.p2.airdodges = data.game.stats.actionCounts[1].airDodgeCount
        // spotdodges
        this.p1.spotDodges = data.game.stats.actionCounts[0].spotDodgeCount
        this.p2.spotDodges = data.game.stats.actionCounts[1].spotDodgeCount
        // neutral
        // neutral wins
        this.p1.neutralWinCount = data.game.stats.overall[0].neutralWinRatio.count
        this.p1.neutralWinRatio = Math.floor(data.game.stats.overall[0].neutralWinRatio.ratio * 10000) / 100
        this.p2.neutralWinCount = data.game.stats.overall[1].neutralWinRatio.count
        this.p2.neutralWinRatio = Math.floor(data.game.stats.overall[1].neutralWinRatio.ratio * 10000) / 100
        // counter hits
        this.p1.counterHitCount = data.game.stats.overall[0].counterHitRatio.count
        this.p1.counterHitRatio = Math.floor(data.game.stats.overall[0].counterHitRatio.ratio * 10000) / 100
        this.p2.counterHitCount = data.game.stats.overall[1].counterHitRatio.count
        this.p2.counterHitRatio = Math.floor(data.game.stats.overall[1].counterHitRatio.ratio * 10000) / 100
        // beneficial trades
        this.p1.beneficialTradeCount = data.game.stats.overall[0].beneficialTradeRatio.count
        this.p1.beneficialTradeRatio = Math.floor(data.game.stats.overall[0].beneficialTradeRatio.ratio * 10000) / 100
        this.p2.beneficialTradeCount = data.game.stats.overall[1].beneficialTradeRatio.count
        this.p2.beneficialTradeRatio = Math.floor(data.game.stats.overall[1].beneficialTradeRatio.ratio * 10000) / 100
        // actions (wd/wl/dd/lg)
        this.p1.waveDash = data.game.stats.actionCounts[0].wavedashCount
        this.p1.waveLand = data.game.stats.actionCounts[0].wavelandCount
        this.p1.dashDance = data.game.stats.actionCounts[0].dashDanceCount
        this.p1.ledgeGrab = data.game.stats.actionCounts[0].ledgegrabCount
        this.p2.waveDash = data.game.stats.actionCounts[1].wavedashCount
        this.p2.waveLand = data.game.stats.actionCounts[1].wavelandCount
        this.p2.dashDance = data.game.stats.actionCounts[1].dashDanceCount
        this.p2.ledgeGrab = data.game.stats.actionCounts[1].ledgegrabCount
        // general
        // inputs/minute
        this.p1.inputsPerMinute = Math.floor(data.game.stats.overall[0].inputsPerMinute.ratio * 100) / 100
        this.p2.inputsPerMinute = Math.floor(data.game.stats.overall[1].inputsPerMinute.ratio * 100) / 100
        // digital inputs/minute
        this.p1.digitalPerMinute = Math.floor(data.game.stats.overall[0].digitalInputsPerMinute.ratio * 100) / 100
        this.p2.digitalPerMinute = Math.floor(data.game.stats.overall[1].digitalInputsPerMinute.ratio * 100) / 100
        // l-cancels
        this.p1.lCancelSuccess = data.game.stats.actionCounts[0].lCancelCount.success
        this.p1.lCancelFail = data.game.stats.actionCounts[0].lCancelCount.fail
        this.p1.lCancelTotal = this.p1.lCancelSuccess + this.p1.lCancelFail
        this.p1.lCancelRatio = Math.floor((this.p1.lCancelSuccess / this.p1.lCancelTotal) * 10000) / 100
        this.p2.lCancelSuccess = data.game.stats.actionCounts[1].lCancelCount.success
        this.p2.lCancelFail = data.game.stats.actionCounts[1].lCancelCount.fail
        this.p2.lCancelTotal = this.p2.lCancelSuccess + this.p2.lCancelFail
        this.p2.lCancelRatio = Math.floor((this.p2.lCancelSuccess / this.p2.lCancelTotal) * 10000) / 100
        // killsTable

        this.p1.killsStats = data.game.stats.conversions.map((conversion) => {
            if (conversion.didKill && conversion.lastHitBy === 0) {
                return ({
                    start: conversion.startFrame,
                    end: conversion.endFrame,
                    killMove: conversion.moves.length ? conversion.moves[conversion.moves.length - 1] : `Error!`,
                    direction: null,
                    percent: Math.floor(conversion.currentPercent * 100) / 100,
                })
            }
        })
        this.p2.killsStats = data.game.stats.conversions.map((conversion) => {
            if (conversion.didKill && conversion.lastHitBy === 1) {
                return ({
                    start: conversion.startFrame,
                    end: conversion.endFrame,
                    killMove: conversion.moves.length ? conversion.moves[conversion.moves.length - 1] : `Error!`,
                    direction: null,
                    percent: Math.floor(conversion.currentPercent * 100) / 100,
                })
            }
        })
        // conversionsTable
        this.p1.conversionsStats = data.game.stats.conversions.map((conversion) => {
            if (conversion.lastHitBy === 0) {
                return ({
                    start: conversion.startFrame,
                    end: conversion.endFrame,
                    startPercent: conversion.startPercent,
                    currentPercent: conversion.currentPercent,
                    opening: conversion.openingType,
                    didKill: conversion.didKill,
                    opening: conversion.openingType,
                    totalMoves: conversion.moves.length
                })
            }
        })
        this.p2.conversionsStats = data.game.stats.conversions.map((conversion) => {
            if (conversion.lastHitBy === 1) {
                return ({
                    start: conversion.startFrame,
                    end: conversion.endFrame,
                    startPercent: conversion.startPercent,
                    currentPercent: conversion.currentPercent,
                    opening: conversion.openingType,
                    didKill: conversion.didKill,
                    opening: conversion.openingType,
                    totalMoves: conversion.moves.length
                })
            }
        })
    }
    renderOverall() {

    }
    renderKills(player) {
        this[player].killsStats.map((kill) => {
            return (
                <>
                    <div>{renderMinutes(kill.start)}</div>
                    <div>{renderMinutes(kill.end)}</div>
                    <div>{kill.killMove.moveId ? movesList[kill.killMove.moveId].name : 'Error!'}</div>
                    <div>{kill.percent}%</div>
                </>
            )
        })
    }
    rednerConversions(player) {
        this[player].conversionsStats.map((conversion) => {
            return (
                <>
                    <div style={conversionRowStyle}>
                        <div>{renderMinutes(conversion.start)}</div>
                        <div>{renderMinutes(conversion.end)}</div>
                        <div>{Math.floor((conversion.currentPercent - conversion.startPercent) * 100) / 100}%</div>
                        <div>{Math.floor(conversion.startPercent * 100) / 100}% - {Math.floor(conversion.currentPercent * 100) / 100}%</div>
                        <div>{conversion.totalMoves}</div>
                        <div>{conversion.opening}</div>
                    </div>
                </>
            )
        })
    }

}

export default Game


