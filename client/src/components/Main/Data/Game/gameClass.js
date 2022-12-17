import movesList from '../../../../utils/game-info/moves.json'
import charactersList from '../../../../utils/game-info/characters.json'
import stagesList from '../../../../utils/game-info/stages.json'

const conversionRowStyle = {
    display: 'grid',
    gridTemplate: `1fr/ 1fr 1fr 1fr 2fr 1fr 2fr`
    // the second damage entry and openingType are a little large, let's give them 2 relative lengths of row
}
const conversionStockStyle = {
    display: 'grid',
    gridTemplate: `1fr/1fr`,
    // it's just a singular div
}
const renderMinutes = (frames) => {
    if (Math.floor(frames / 60) > 60) {
        let minutes = Math.floor((frames / 60) / 60)
        let seconds = Math.floor((frames / 60) % 60)
        if (seconds.toString().length === 1) {
            seconds = `0${seconds}`
        }
        return `${minutes}:${seconds}`
    } else {
        return `0:${(Math.floor(frames / 60))}`
    }
}
class Game {
    constructor(data) {
        const newGame = data.gameById        // game metadata
        this.fullData = data
        this.startDate = new Date(parseInt(newGame.metadata.startAt))
        this.winnerIndex = newGame.stats.conversions[newGame.stats.conversions.length - 1].lastHitBy
        this.winnerName = newGame.displayNames[this.winnerIndex].displayName
        this.winnerCode = newGame.codeIds[this.winnerIndex].connectCode
        // player info
        // p1
        this.p1 = {}
        this.p2 = {}
        this.p1.displayName = newGame.displayNames[0].displayName
        this.p1.displayLink = `../../displayname/${this.p1.displayName}`
        this.p1.connectCode = newGame.codeIds[0].connectCode
        this.p1.codeLink = `../../connectocde/${this.p1.connectCode.replace('#', '-')}`
        this.p1.character = newGame.metadata.players[1].characters.length > 1 ? `Ice Climbers` : charactersList[newGame.metadata.players[1].characters[0]].name
        // p2
        this.p2.displayName = newGame.displayNames[1].displayName
        this.p2.displayLink = `../../displayname/${this.p2.displayName}`
        this.p2.connectCode = newGame.codeIds[1].connectCode
        this.p2.codeLink = `../../connnectcode${this.p2.connectCode.replace('#', '-')}`
        // link to head-2-head chart
        this.h2hLink = `../../connectcode/${this.p1.connectCode.replace('#', '-')}/vs/${this.p2.connectCode.replace('#', '-')}`

        // overall table stats
        // offense
        // kills
        this.p1.kills = newGame.stats.overall[0].killCount
        this.p2.kills = newGame.stats.overall[1].killCount
        // damage
        this.p1.damage = Math.floor(newGame.stats.overall[0].totalDamage * 100) / 100
        this.p2.damage = Math.floor(newGame.stats.overall[1].totalDamage * 100) / 100
        // openings/conversion rate
        this.p1.conversionRate = Math.floor(newGame.stats.overall[0].successfulConversions.ratio * 10000) / 100
        this.p1.conversionCount = newGame.stats.overall[0].successfulConversions.count
        this.p1.conversionTotal = newGame.stats.overall[0].successfulConversions.total
        this.p2.conversionRate = Math.floor(newGame.stats.overall[1].successfulConversions.ratio * 10000) / 100
        this.p2.conversionCount = newGame.stats.overall[1].successfulConversions.count
        this.p2.conversionTotal = newGame.stats.overall[1].successfulConversions.total
        // openings/kill
        this.p1.openingsKill = Math.floor(newGame.stats.overall[0].openingsPerKill.ratio * 1000) / 1000
        this.p2.openingsKill = Math.floor(newGame.stats.overall[1].openingsPerKill.ratio * 1000) / 1000
        // defense
        // rolls
        this.p1.rolls = newGame.stats.actionCounts[0].rollCount
        this.p2.rolls = newGame.stats.actionCounts[1].rollCount
        // airdodges
        this.p1.airdodges = newGame.stats.actionCounts[0].airDodgeCount
        this.p2.airdodges = newGame.stats.actionCounts[1].airDodgeCount
        // spotdodges
        this.p1.spotDodges = newGame.stats.actionCounts[0].spotDodgeCount
        this.p2.spotDodges = newGame.stats.actionCounts[1].spotDodgeCount
        // neutral
        // neutral wins
        this.p1.neutralWinCount = newGame.stats.overall[0].neutralWinRatio.count
        this.p1.neutralWinRatio = Math.floor(newGame.stats.overall[0].neutralWinRatio.ratio * 10000) / 100
        this.p2.neutralWinCount = newGame.stats.overall[1].neutralWinRatio.count
        this.p2.neutralWinRatio = Math.floor(newGame.stats.overall[1].neutralWinRatio.ratio * 10000) / 100
        // counter hits
        this.p1.counterHitCount = newGame.stats.overall[0].counterHitRatio.count
        this.p1.counterHitRatio = Math.floor(newGame.stats.overall[0].counterHitRatio.ratio * 10000) / 100
        this.p2.counterHitCount = newGame.stats.overall[1].counterHitRatio.count
        this.p2.counterHitRatio = Math.floor(newGame.stats.overall[1].counterHitRatio.ratio * 10000) / 100
        // beneficial trades
        this.p1.beneficialTradeCount = newGame.stats.overall[0].beneficialTradeRatio.count
        this.p1.beneficialTradeRatio = Math.floor(newGame.stats.overall[0].beneficialTradeRatio.ratio * 10000) / 100
        this.p2.beneficialTradeCount = newGame.stats.overall[1].beneficialTradeRatio.count
        this.p2.beneficialTradeRatio = Math.floor(newGame.stats.overall[1].beneficialTradeRatio.ratio * 10000) / 100
        // actions (wd/wl/dd/lg)
        this.p1.waveDash = newGame.stats.actionCounts[0].wavedashCount
        this.p1.waveLand = newGame.stats.actionCounts[0].wavelandCount
        this.p1.dashDance = newGame.stats.actionCounts[0].dashDanceCount
        this.p1.ledgeGrab = newGame.stats.actionCounts[0].ledgegrabCount
        this.p2.waveDash = newGame.stats.actionCounts[1].wavedashCount
        this.p2.waveLand = newGame.stats.actionCounts[1].wavelandCount
        this.p2.dashDance = newGame.stats.actionCounts[1].dashDanceCount
        this.p2.ledgeGrab = newGame.stats.actionCounts[1].ledgegrabCount
        // general
        // inputs/minute
        this.p1.inputsPerMinute = Math.floor(newGame.stats.overall[0].inputsPerMinute.ratio * 100) / 100
        this.p2.inputsPerMinute = Math.floor(newGame.stats.overall[1].inputsPerMinute.ratio * 100) / 100
        // digital inputs/minute
        this.p1.digitalPerMinute = Math.floor(newGame.stats.overall[0].digitalInputsPerMinute.ratio * 100) / 100
        this.p2.digitalPerMinute = Math.floor(newGame.stats.overall[1].digitalInputsPerMinute.ratio * 100) / 100
        // l-cancels
        this.p1.lCancelSuccess = newGame.stats.actionCounts[0].lCancelCount.success
        this.p1.lCancelFail = newGame.stats.actionCounts[0].lCancelCount.fail
        this.p1.lCancelTotal = this.p1.lCancelSuccess + this.p1.lCancelFail
        this.p1.lCancelRatio = Math.floor((this.p1.lCancelSuccess / this.p1.lCancelTotal) * 10000) / 100
        this.p2.lCancelSuccess = newGame.stats.actionCounts[1].lCancelCount.success
        this.p2.lCancelFail = newGame.stats.actionCounts[1].lCancelCount.fail
        this.p2.lCancelTotal = this.p2.lCancelSuccess + this.p2.lCancelFail
        this.p2.lCancelRatio = Math.floor((this.p2.lCancelSuccess / this.p2.lCancelTotal) * 10000) / 100

        // killsTable
        this.p1.killsStats = newGame.stats.conversions.reduce((result, conversion) => {
            if (conversion.didKill && conversion.lastHitBy === 0) {
                result.push({
                    start: conversion.startFrame,
                    end: conversion.endFrame,
                    killMove: conversion.moves.length ? conversion.moves[conversion.moves.length - 1] : `Error!`,
                    direction: null,
                    percent: Math.floor(conversion.currentPercent * 100) / 100,
                })
            }
            return result
        }, [])
        this.p2.killsStats = newGame.stats.conversions.reduce((result, conversion) => {
            if (conversion.didKill && conversion.lastHitBy === 1) {
                result.push({
                    start: conversion.startFrame,
                    end: conversion.endFrame,
                    killMove: conversion.moves.length ? conversion.moves[conversion.moves.length - 1] : `Error!`,
                    direction: null,
                    percent: Math.floor(conversion.currentPercent * 100) / 100,
                })
            }
            return result
        },[])
        // conversionsTable
        this.p1.conversionsStats = newGame.stats.conversions.reduce((result, conversion) => {
            if (conversion.lastHitBy === 0) {
                result.push({
                    start: conversion.startFrame,
                    end: conversion.endFrame,
                    startPercent: conversion.startPercent,
                    currentPercent: conversion.currentPercent,
                    opening: conversion.openingType,
                    didKill: conversion.didKill,
                    totalMoves: conversion.moves.length
                })
            }
            return result
        }, [])
        this.p2.conversionsStats = newGame.stats.conversions.reduce((result, conversion) => {
            if (conversion.lastHitBy === 1) {
                result.push({
                    start: conversion.startFrame,
                    end: conversion.endFrame,
                    startPercent: conversion.startPercent,
                    currentPercent: conversion.currentPercent,
                    opening: conversion.openingType,
                    didKill: conversion.didKill,
                    totalMoves: conversion.moves.length
                })
            }
            return result
        }, [])
    }
    renderOverall() {

    }
    renderKills(player) {
        let render = []
        this[player].killsStats.map((kill) => {
            render.push(
                <>
                    <div>{renderMinutes(kill.start)}</div>
                    <div>{renderMinutes(kill.end)}</div>
                    <div>{kill.killMove.moveId ? movesList[kill.killMove.moveId].name : 'Error!'}</div>
                    <div>{kill.percent}%</div>
                </>
            )
        })
        return render
    }
    renderConversions(player) {
        let render = []
        this[player].conversionsStats.map((conversion) => {
            render.push(
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
        return render
    }

}

export default Game


