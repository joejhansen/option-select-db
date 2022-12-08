import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { QUERY_GAME_FULL } from "../../../../utils/apollo/queries";
import Table from 'react-bootstrap/Table'
const GameIndividual = ({ theme }) => {
    const styles = {
        card: {
            backgroundColor: theme.primary,
            color: theme.text
        },
        link: {
            textDecoration: 'none',
            color: theme.accent
        },
        table: {
            backgroundColor: theme.primary,
            color: theme.text,
        },
        damage: {
            outline: 'dashed red 2px'
        },
        damageEnd: {
            outline: 'dashed red 2px'

        },
        damageTotal: {
            outline: 'dashed red 2px'

        },
        conversionsTable: {
            outer: {
                outline: 'dashed red 2px',
                display: 'grid',
                gridTeamplte: '1fr 3fr/1fr',
                padding: '0',
                margin: '0 1rem'
            },
            data: {
                outer: {
                    outline: 'dashed red 2px',
                    display: 'grid',
                    gridTemplate: '1fr 2fr/1fr',

                },
                header: {
                    outline: 'dashed red 2px',
                    display: 'grid',
                    gridTemplate: `1fr/1fr 1fr 2fr 1fr 1fr`
                },
                stock: {
                    outer: {
                        outline: 'dashed red 2px',
                        display: 'grid',
                        gridTemplate: '1fr 1fr/1fr'
                    },
                    rows: {
                        outline: 'dashed red 2px',
                        display: 'grid',
                        gridTemplate: `1fr/1fr 1fr 1fr 1fr 1fr 1fr`
                    },
                    image: {
                        outline: 'dashed red 2px',
                        display: 'grid',
                        gridTemplate: `1fr/1fr`
                    },

                }
            }
        },
        killsTable: {
            outer: {
                outline: 'dashed red 2px',
                display: 'grid',
                gridTemplate: '1fr 4fr/1fr'
            },
            data: {
                outer: {
                    outline: `dashed red 2px`,
                    display: 'grid',
                    gridTemplate: `1fr 3fr/1fr`
                },
                header: {
                    outline: `dashed red 2px`,
                    display: `grid`,
                    gridTemplate: `1fr/1fr 1fr 1fr 1fr`
                },
                body: {
                    outline: `dashed red 2px`,
                    display: `grid`,
                    gridTemplate: `1fr 1fr 1fr/1fr 1fr 1fr 1fr`
                }
            }
        },
        overallTable: {
            outer: {
                outline: 'dashed red 2px',
                display: 'grid',
                gridTemplate: `1fr 19fr/1fr`,
                color: theme.text,
                padding: '0',
                margin: '0 1rem'

            },
            header: {
                outline: 'dashed red 2px',
                color: theme.text,
                display: 'grid',
                gridTemplate: '1fr /2fr 1fr 1fr'
            },
            data: {
                // do specific ones
                outer: {
                    outline: 'dashed red 2px',
                    color: theme.text,
                    display: 'grid',
                    gridTemplate: `6fr 4fr 5fr 4fr/1fr`
                },
                header: {
                    outline: 'dashed red 2px',
                    color: theme.text,
                },
                body: {
                    outer: {
                        outline: 'dashed red 2px',
                        display: 'grid',
                        gridTemplate: '2fr 10fr/1fr'
                    },
                    offense: {
                        outer: {
                            outline: 'dashed red 2px',
                            display: 'grid',
                            gridTemplate: '1fr 5fr/1fr'
                        },

                        inner: {
                            outline: 'dashed red 2px',
                            display: 'grid',
                            gridTemplate: '1fr 1fr 1fr 1fr 1fr/ 2fr 1fr 1fr'
                        },
                    },
                    defense: {
                        outer: {
                            outline: 'dashed red 2px',
                            display: 'grid',
                            gridTemplate: '1fr 3fr/1fr'

                        },
                        inner: {
                            outline: 'dashed red 2px',
                            display: 'grid',
                            gridTemplate: '1fr 1fr 1fr/2fr 1fr 1fr'
                        },
                    },
                    neutral: {
                        outer: {
                            outline: 'dashed red 2px',
                            display: 'grid',
                            gridTemplate: '1fr 4fr/1fr'
                        },
                        inner: {
                            outline: 'dashed red 2px',
                            display: 'grid',
                            gridTemplate: '1fr 1fr 1fr 1fr/2fr 1fr 1fr'
                        }
                    },
                    general: {
                        outer: {
                            outline: 'dashed red 2px',
                            display: 'grid',
                            gridTemplate: '1fr 3fr/1fr'
                        },
                        inner: {
                            outline: 'dashed red 2px',
                            display: 'grid',
                            gridTemplate: '1fr 1fr 1fr/2fr 1fr 1fr'
                        },
                    },
                }
            }
        }
    }
    const renderGameTable = (data) => {
        const game = data.gameById
        let render = []
        const startDate = new Date(parseInt(game.metadata.startAt))
        let playerDisplayNames = []
        for (let displayName of game.displayNames) {
            playerDisplayNames.push({ displayName: displayName.displayName, display_id: displayName._id })
        }
        let playerConnectCodes = []
        for (let connectCode of game.codeIds) {
            playerConnectCodes.push({ connectCode: connectCode.connectCode, connect_id: connectCode._id })
        }
        let renderPlayers = []
        let linkToDisplayNames = []
        let linkToConnectCodes = []
        for (let i = 0; i < playerConnectCodes.length; i++) {
            const { displayName, display_id } = playerDisplayNames[i]
            const { connectCode, connect_id } = playerConnectCodes[i]
            const linkToDisplayName = `../../displayname/${display_id}`
            linkToDisplayNames.push(linkToDisplayName)
            const linkToConnectCode = `../../connectcode/${connect_id}`
            linkToConnectCodes.push(linkToConnectCode)
            renderPlayers.push(
                <li><Link to={linkToConnectCode} style={styles.link}>{connectCode}</Link> as <Link to={linkToDisplayName} style={styles.link}>{displayName}</Link></li>
            )
        }
        let linkToGame = `../${game._id}`
        let killsStats = [[], []]
        for (let conversion of game.stats.conversions) {
            if (conversion.didKill) {
                killsStats[conversion.lastHitBy].push({ start: conversion.startFrame, end: conversion.endFrame, killMove: conversion.moves[conversion.moves.length - 1], direction: null, percent: Math.floor(conversion.endPercent * 100) / 100, })
            }
        }
        let renderKillsStats = []
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
        for (let i = 0; i < killsStats.length; i++) {
            const kills = killsStats[i]
            const { displayName, display_id } = playerDisplayNames[i]
            const { connectCode, connect_id } = playerConnectCodes[i]
            const linkToDisplayName = linkToDisplayNames[i]
            const linkToConnectCode = linkToConnectCodes[i]
            const killRow = []
            for (let kill of kills) {
                // killsStats[i].kills[i]
                killRow.push(<>
                    <div>{renderMinutes(kill.start)}</div>
                    <div>{renderMinutes(kill.end)}</div>
                    <div>{kill.killMove.moveId}</div>
                    <div>{kill.percent}%</div>
                </>)
            }
            const tableOuterStyle = {
                outline: 'red dashed 2px',
                display: 'grid',
                gridTemplate: `1fr ${killRow.length + 1}fr / 1fr`,
                height: 'max-content',
                padding: '0',
                margin: '0 1rem'
            }

            const tableDataOuterStyle = {
                outline: 'red dashed 2px',
                display: 'grid', gridTemplate:
                    `1fr ${killRow.length}fr / 1fr`
            }
            const tableDataHeaderStyle = {
                outline: 'red dashed 2px',
                display: 'grid',
                gridTemplate: `1fr / repeat(4, 1fr)`
            }
            const tableDataBodyStyle = {
                outline: 'red dashed 2px',
                display: 'grid',
                gridTemplate: `repeat(${killRow.length}, 1fr) / repeat(4, 1fr)`
            }
            const killComponent =
                <div className="col" style={tableOuterStyle}>
                    <div><Link to={linkToConnectCode} style={styles.link}>{connectCode}</Link> as <Link to={linkToDisplayName} style={styles.link}>{displayName}</Link></div>
                    <div style={tableDataOuterStyle}>
                        <div style={tableDataHeaderStyle}>
                            <div>Start</div>
                            <div>End</div>
                            <div>Kill Move</div>
                            <div>Percent</div>
                        </div>
                        <div style={tableDataBodyStyle}>
                            {killRow}
                        </div>
                    </div>
                </div>
            renderKillsStats.push(killComponent)
        }
        const conversionsStats = [[], []]
        for (let conversion of game.stats.conversions) {
            conversionsStats[conversion.lastHitBy].push({ start: conversion.startFrame, end: conversion.endFrame, startPercent: conversion.startPercent, endPercent: conversion.endPercent, opening: conversion.openingType, didKill: conversion.didKill, opening: conversion.openingType, totalMoves: conversion.moves.length })
        }
        let renderConversionsStats = []
        for (let i = 0; i < conversionsStats.length; i++) {
            const conversions = conversionsStats[i]
            const { displayName, display_id } = playerDisplayNames[i]
            const { connectCode, connect_id } = playerConnectCodes[i]
            const linkToDisplayName = linkToDisplayNames[i]
            const linkToConnectCode = linkToConnectCodes[i]
            const conversionRow = []
            const conversionRowStyle = {
                display: 'grid',
                gridTemplate: `1fr/ 1fr 1fr 1fr 2fr 1fr 2fr`
            }
            const conversionStockStyle = {
                display: 'grid',
                gridTemplate: `1fr/1fr`,
            }
            let stocks = 4
            let stocksTaken = 0
            for (let conversion of conversions) {

                conversionRow.push(
                    <>
                        <div style={conversionRowStyle}>
                            <div>{renderMinutes(conversion.start)}</div>
                            <div>{renderMinutes(conversion.end)}</div>
                            <div>{Math.floor((conversion.endPercent - conversion.startPercent) * 100) / 100}</div>
                            <div>{Math.floor(conversion.startPercent * 100) / 100}% - {Math.floor(conversion.endPercent * 100) / 100}%</div>
                            <div>{conversion.totalMoves}</div>
                            <div>{conversion.opening}</div>
                        </div>
                    </>
                )
                if (conversion.didKill) {
                    stocksTaken++
                    conversionRow.push(
                        <>
                            <div style={conversionStockStyle}>
                                <div>{stocks-stocksTaken} stocks left</div>
                            </div>
                        </>
                    )
                }
            }
            if (stocks > 0) {
                console.log(stocks)
                conversionRow.push(
                    <>
                        <div style={conversionStockStyle}>
                            <div>No punishes on opponent's {stocksTaken+1} stock</div>
                        </div>
                    </>
                )
            }
            const tableOuterStyle = {
                outline: 'red dashed 2px',
                display: 'grid',
                gridTemplate: `1fr ${conversionRow.length + 1}fr / 1fr`,
                height: 'max-content',
                padding: '0',
                margin: '0 1rem'
            }

            const tableDataOuterStyle = {
                outline: 'red dashed 2px',
                display: 'grid', gridTemplate:
                    `1fr ${conversionRow.length}fr / 1fr`
            }
            const tableDataHeaderStyle = {
                outline: 'red dashed 2px',
                display: 'grid',
                gridTemplate: `1fr/1fr 1fr 3fr 1fr 2fr`
            }
            const tableDataBodyStyle = {
                outline: 'red dashed 2px',
                display: 'grid',
                gridTemplate: `repeat(${conversionRow.length}, 1fr) / 1fr`
            }
            const conversionComponent =
                <div className="col" style={tableOuterStyle}>
                    <div><Link to={linkToConnectCode} style={styles.link}>{connectCode}</Link> as <Link to={linkToDisplayName} style={styles.link}>{displayName}</Link></div>
                    <div style={tableDataOuterStyle}>
                        <div style={tableDataHeaderStyle}>
                            <div>Start</div>
                            <div>End</div>
                            <div>Damage</div>
                            <div># Moves</div>
                            <div>Opening</div>
                        </div>
                        <div style={tableDataBodyStyle}>
                            {conversionRow}
                        </div>
                    </div>
                </div>
            // <div className="col" style={styles.conversionsTable.outer}>
            //     {/* gridTemplate: 1fr (#Conversions+#Stockstaken+1)fr/1fr */}
            //     <div>names header</div>
            //     <div style={styles.conversionsTable.data.outer}>
            //         {/* gridTemplate: 1fr (#Conversions+#Stockstaken)fr/1fr */}
            //         <div style={styles.conversionsTable.data.header}>
            //             <div>start</div>
            //             <div>end</div>
            //             <div style={styles.damage}>damage</div>
            //             <div>moves</div>
            //             <div>opening</div>
            //         </div>
            //         <div style={styles.conversionsTable.data.stock.outer}>
            //             {/* gridTemplate: repeate(#Conversions+#Stockstaken, 1fr)/ 1fr */}
            //             <div style={styles.conversionsTable.data.stock.rows}>
            //                 {/* gridTemplate: repeate(#Conversions, 1fr)/ repeate(6, 1fr)*/}
            //                 <div>start</div>
            //                 <div>end</div>
            //                 <div style={styles.damageEnd}>damageEnd</div>
            //                 <div style={styles.damageTotal}>damagetotal</div>
            //                 <div>moves</div>
            //                 <div>opening</div>
            //             </div>
            //             <div style={styles.conversionsTable.data.stock.image}>
            //                 {/* gridTeamplate: 1fr/1fr*/}
            //                 <div>stock image</div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
            renderConversionsStats.push(conversionComponent)
        }
        return (
            <>
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                Header
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <div className="col">
                                        <p>Overall Stats</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col" style={styles.overallTable.outer}>
                                        <div style={styles.overallTable.header}>
                                            <div></div>
                                            <div>
                                                <Link to={linkToConnectCodes[0]} style={styles.link}>{game.codeIds[0].connectCode}</Link>
                                                as
                                                <Link to={linkToDisplayNames[0]} style={styles.link}>{game.displayNames[0].displayName}</Link></div>
                                            <div>
                                                <Link to={linkToConnectCodes[1]} style={styles.link}>{game.codeIds[1].connectCode}</Link>
                                                as
                                                <Link to={linkToDisplayNames[1]} style={styles.link}>{game.displayNames[1].displayName}</Link>
                                            </div>
                                        </div>
                                        <div style={styles.overallTable.data.outer}>
                                            <div style={styles.overallTable.data.body.offense.outer}>
                                                <div>Offense</div>
                                                <div style={styles.overallTable.data.body.offense.inner}>
                                                    <div>Kills</div>
                                                    <div>{game.stats.overall[0].killCount}</div>
                                                    <div>{game.stats.overall[1].killCount}</div>

                                                    <div>Damage Done</div>
                                                    <div>{Math.floor(game.stats.overall[0].totalDamage * 100) / 100}</div>
                                                    <div>{Math.floor(game.stats.overall[1].totalDamage * 100) / 100}</div>

                                                    <div>Opening Conversion Rate</div>
                                                    <div>
                                                        {Math.floor(game.stats.overall[0].successfulConversions.ratio * 10000) / 100}%
                                                        ( {game.stats.overall[0].successfulConversions.count} / {game.stats.overall[0].successfulConversions.total} )
                                                    </div>
                                                    <div>
                                                        {Math.floor(game.stats.overall[1].successfulConversions.ratio * 10000) / 100}%
                                                        ( {game.stats.overall[1].successfulConversions.count} / {game.stats.overall[1].successfulConversions.total} )
                                                    </div>

                                                    <div>Openings / Kill</div>
                                                    <div>{Math.floor(game.stats.overall[0].openingsPerKill.ratio * 1000) / 1000}</div>
                                                    <div>{Math.floor(game.stats.overall[1].openingsPerKill.ratio * 1000) / 1000}</div>

                                                    <div>Damage / Opening</div>
                                                    <div>{Math.floor(game.stats.overall[0].damagePerOpening.ratio * 100) / 100}</div>
                                                    <div>{Math.floor(game.stats.overall[1].damagePerOpening.ratio * 100) / 100}</div>
                                                </div>
                                            </div>
                                            <div style={styles.overallTable.data.body.defense.outer}>
                                                <div>Defense</div>
                                                <div style={styles.overallTable.data.body.defense.inner}>
                                                    <div>Rolls</div>
                                                    <div>{game.stats.actionCounts[0].rollCount}</div>
                                                    <div>{game.stats.actionCounts[1].rollCount}</div>

                                                    <div>Air Dodges</div>
                                                    <div>{game.stats.actionCounts[0].airDodgeCount}</div>
                                                    <div>{game.stats.actionCounts[1].airDodgeCount}</div>

                                                    <div>Spot Dodges</div>
                                                    <div>{game.stats.actionCounts[0].spotDodgeCount}</div>
                                                    <div>{game.stats.actionCounts[1].spotDodgeCount}</div>

                                                </div>
                                            </div>
                                            <div style={styles.overallTable.data.body.neutral.outer}>
                                                <div>Neutral</div>
                                                <div style={styles.overallTable.data.body.neutral.inner}>
                                                    <div>Neutral Wins</div>
                                                    <div>{game.stats.overall[0].neutralWinRatio.count} ( {Math.floor(game.stats.overall[0].neutralWinRatio.ratio * 10000) / 100}% ) </div>
                                                    <div>{game.stats.overall[1].neutralWinRatio.count} ( {Math.floor(game.stats.overall[1].neutralWinRatio.ratio * 10000) / 100}% ) </div>

                                                    <div>Counter Hits</div>
                                                    <div>{game.stats.overall[0].counterHitRatio.count} ( {Math.floor(game.stats.overall[0].counterHitRatio.ratio * 10000) / 100}% ) </div>
                                                    <div>{game.stats.overall[1].counterHitRatio.count} ( {Math.floor(game.stats.overall[1].counterHitRatio.ratio * 10000) / 100}% ) </div>

                                                    <div>Beneficial Trades</div>
                                                    <div>{game.stats.overall[0].beneficialTradeRatio.count} ( {Math.floor(game.stats.overall[0].beneficialTradeRatio.ratio * 10000) / 100}% ) </div>
                                                    <div>{game.stats.overall[1].beneficialTradeRatio.count} ( {Math.floor(game.stats.overall[1].beneficialTradeRatio.ratio * 10000) / 100}% ) </div>

                                                    <div>Actions (WD/WL/DD/LG)</div>
                                                    <div>{game.stats.actionCounts[0].wavedashCount} / {game.stats.actionCounts[0].wavelandCount} / {game.stats.actionCounts[0].dashDanceCount} / {game.stats.actionCounts[0].ledgegrabCount}</div>
                                                    <div>{game.stats.actionCounts[1].wavedashCount} / {game.stats.actionCounts[1].wavelandCount} / {game.stats.actionCounts[1].dashDanceCount} / {game.stats.actionCounts[1].ledgegrabCount}</div>

                                                </div>
                                            </div>
                                            <div style={styles.overallTable.data.body.general.outer}>
                                                <div>General</div>
                                                <div style={styles.overallTable.data.body.general.inner}>
                                                    <div>Inputs / Minute</div>
                                                    <div>{Math.floor(game.stats.overall[0].inputsPerMinute.ratio * 100) / 100}</div>
                                                    <div>{Math.floor(game.stats.overall[1].inputsPerMinute.ratio * 100) / 100}</div>

                                                    <div>Digital Inputs / Minute</div>
                                                    <div>{Math.floor(game.stats.overall[0].digitalInputsPerMinute.ratio * 100) / 100}</div>
                                                    <div>{Math.floor(game.stats.overall[1].digitalInputsPerMinute.ratio * 100) / 100}</div>

                                                    <div>L-Cancel Success Rate</div>
                                                    <div>
                                                        {Math.floor((game.stats.actionCounts[0].lCancelCount.success) / (game.stats.actionCounts[0].lCancelCount.success + game.stats.actionCounts[0].lCancelCount.fail) * 10000) / 100}%
                                                        ( {game.stats.actionCounts[0].lCancelCount.success} / {game.stats.actionCounts[0].lCancelCount.success + game.stats.actionCounts[0].lCancelCount.fail} )</div>
                                                    <div>
                                                        {Math.floor((game.stats.actionCounts[1].lCancelCount.success) / (game.stats.actionCounts[1].lCancelCount.success + game.stats.actionCounts[1].lCancelCount.fail) * 10000) / 100}%
                                                        ( {game.stats.actionCounts[1].lCancelCount.success} / {game.stats.actionCounts[1].lCancelCount.success + game.stats.actionCounts[1].lCancelCount.fail} )</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <div className="col">
                                        <p>Kills</p>
                                    </div>
                                </div>
                                <div className="row">
                                    {renderKillsStats}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <div className="col">
                                        <p>Openings & Conversions</p>
                                    </div>
                                </div>
                                <div className="row">
                                    {renderConversionsStats}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    let { id } = useParams();
    const { loading, data } = useQuery(QUERY_GAME_FULL, {
        variables: { id: id },
    });
    return (
        <>
            {loading ? <p>loading</p> : renderGameTable(data)}
        </>
    )
}

export default GameIndividual