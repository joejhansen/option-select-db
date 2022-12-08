import { useQuery } from "@apollo/client";
import { useParams, Link, useNavigate } from "react-router-dom";
import { QUERY_GAME_FULL } from "../../../../utils/apollo/queries";
import Table from 'react-bootstrap/Table'
const GameIndividual = ({ theme }) => {
    const navigate = useNavigate()
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
        // okay
        // so
        // we just call it game
        const game = data.gameById
        let render = []
        const startDate = new Date(parseInt(game.metadata.startAt))
        // make an array and push as many displayName+_id combos there are
        let playerDisplayNames = []
        for (let displayName of game.displayNames) {
            playerDisplayNames.push({ displayName: displayName.displayName, display_id: displayName._id })
        }
        // do the same for connect codes
        let playerConnectCodes = []
        for (let connectCode of game.codeIds) {
            playerConnectCodes.push({ connectCode: connectCode.connectCode, connect_id: connectCode._id })
        }
        let renderPlayers = []
        let linkToDisplayNames = []
        let linkToConnectCodes = []
        // for each playerConnectCode, we're going to make a link to their connectCode and displayName
        for (let i = 0; i < playerConnectCodes.length; i++) {
            // get the displayName data
            const { displayName, display_id } = playerDisplayNames[i]
            // and make a link out of it for react-router-dom
            const linkToDisplayName = `../../displayname/${display_id}`
            linkToDisplayNames.push(linkToDisplayName)
            // get the connectCode data
            const { connectCode, connect_id } = playerConnectCodes[i]
            // make the link
            const linkToConnectCode = `../../connectcode/${connect_id}`
            linkToConnectCodes.push(linkToConnectCode)
            // push it to the renderPlayers array for rendering down the line
            renderPlayers.push(
                <li><Link to={linkToConnectCode} style={styles.link}>{connectCode}</Link> as <Link to={linkToDisplayName} style={styles.link}>{displayName}</Link></li>
            )
        }
        let linkToGame = `../${game._id}`
        let killsStats = [[], []]
        // an array of two arrays. should be as many arrays as there are players but doubles isn't supported otherwise
        for (let conversion of game.stats.conversions) {
            // getting all of our kill conversions for kill stats
            if (conversion.didKill) {
                killsStats[conversion.lastHitBy].push({ start: conversion.startFrame, end: conversion.endFrame, killMove: conversion.moves[conversion.moves.length - 1], direction: null, percent: Math.floor(conversion.endPercent * 100) / 100, })
            }
        }
        let renderKillsStats = []
        // this converts # of frames played so far into a M:SS format.
        // melee is played on the nintendo gamecube or emulated environment thereof at 60 frames per second
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
        // for each player, traditional for to keep track of index
        for (let i = 0; i < killsStats.length; i++) {
            const kills = killsStats[i]
            // get the display info
            const { displayName, display_id } = playerDisplayNames[i]
            const { connectCode, connect_id } = playerConnectCodes[i]
            // get the links
            const linkToDisplayName = linkToDisplayNames[i]
            const linkToConnectCode = linkToConnectCodes[i]
            // now we start to keep track of kills for the individual player
            const killRows = []
            for (let kill of kills) {
                // push the information in standard format. no need for wrapper div as in conversions since these won't be broken up
                killRows.push(<>
                    <div>{renderMinutes(kill.start)}</div>
                    <div>{renderMinutes(kill.end)}</div>
                    <div>{kill.killMove.moveId}</div>
                    <div>{kill.percent}%</div>
                </>)
            }
            // this was the tricky part.
            // we have to conditionally style each table for the ammount of rows we render
            const tableOuterStyle = {
                outline: 'red dashed 2px',
                display: 'grid',
                gridTemplate: `1fr ${killRows.length + 1}fr / 1fr`,
                // 1fr for the top title, killRows.length+1 for the total ammount of kills + data header in the sibling element
                height: 'max-content',
                padding: '0',
                margin: '0 1rem'
            }

            const tableDataOuterStyle = {
                outline: 'red dashed 2px',
                display: 'grid',

                gridTemplate: `1fr ${killRows.length}fr / 1fr`
                // 1fr for the data header, killRows.length fr for the total ammount of rows in the sibling element
            }
            const tableDataHeaderStyle = {
                outline: 'red dashed 2px',
                display: 'grid',
                gridTemplate: `1fr / repeat(4, 1fr)`
                // as many columns as data showsn.
                // see conversions row for shaping irregular columns
            }
            const tableDataBodyStyle = {
                outline: 'red dashed 2px',
                display: 'grid',
                gridTemplate: `repeat(${killRows.length}, 1fr) / repeat(4, 1fr)`
                // repeate 1fr for each row we need, 4 columns
            }
            // all together now
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
                            {killRows}
                        </div>
                    </div>
                </div>
            // push it real good
            renderKillsStats.push(killComponent)
        }
        // out of renderKills
        // now conversionsStats, two arrays within an array
        const conversionsStats = [[], []]
        // parse the conversion statistics we need as an object and put them in the correct array
        for (let conversion of game.stats.conversions) {
            conversionsStats[conversion.lastHitBy].push({ start: conversion.startFrame, end: conversion.endFrame, startPercent: conversion.startPercent, endPercent: conversion.endPercent, opening: conversion.openingType, didKill: conversion.didKill, opening: conversion.openingType, totalMoves: conversion.moves.length })
        }
        let renderConversionsStats = []
        // for each player who has conversionStats. traditional for to keep track of index
        for (let i = 0; i < conversionsStats.length; i++) {
            // call it conversions
            const conversions = conversionsStats[i]
            // get the players info
            const { displayName, display_id } = playerDisplayNames[i]
            const { connectCode, connect_id } = playerConnectCodes[i]
            const linkToDisplayName = linkToDisplayNames[i]
            const linkToConnectCode = linkToConnectCodes[i]
            // start the individual rows
            const conversionRow = []
            // specifying the individual conversion rows BECAUSE we have to render irregular tables depending on the data
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
            // this how many stocks there be. this *could* be a different number, but the standard game of melee is 4 stocks
            let stocks = 4
            // the ammount of stocks taken
            let stocksTaken = 0
            for (let conversion of conversions) {
                // for each conversion, we're gonna push a row with this information
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
                    // and if it killed, we're going to add to stocksTaken, then push a row with additional info
                    stocksTaken++
                    conversionRow.push(
                        <>
                            <div style={conversionStockStyle}>
                                <div>{stocks - stocksTaken} stocks left</div>
                            </div>
                        </>
                    )
                }
            }
            if (stocks > 0) {
                // if not all stocks were taken
                console.log(stocks)
                // we're going to push this sad message
                conversionRow.push(
                    <>
                        <div style={conversionStockStyle}>
                            <div>No punishes on opponent's {stocksTaken + 1} stock</div>
                        </div>
                    </>
                )
                // TODO: more parsing because it's possible to damage someone's stock but not take it. this will still render in that case when we just need to render nothing
            }
            const tableOuterStyle = {
                outline: 'red dashed 2px',
                display: 'grid',
                gridTemplate: `1fr ${conversionRow.length + 1}fr / 1fr`,
                // 1fr for the names header, then conversionRow.length+1fr for the total ammount of rows in our sibling component
                height: 'max-content',
                padding: '0',
                margin: '0 1rem'
            }

            const tableDataOuterStyle = {
                outline: 'red dashed 2px',
                display: 'grid',
                gridTemplate: `1fr ${conversionRow.length}fr / 1fr`
                // 1fr for the data header, then conversionRow.lengthfr for the total ammount of rows in our sibling component
            }
            const tableDataHeaderStyle = {
                outline: 'red dashed 2px',
                display: 'grid',
                // we have 5 columns in our data header, but 6 rows in our data body?
                gridTemplate: `1fr/1fr 1fr 3fr 1fr 2fr`
                // 3fr for damage stats overall (1 + 2), 2fr for the opening type string because it's long
            }
            const tableDataBodyStyle = {
                outline: 'red dashed 2px',
                display: 'grid',
                gridTemplate: `repeat(${conversionRow.length}, 1fr) / 1fr`
                // repeat rows for as many rows as we need
            }
            // all together now
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
            // push it real good
            renderConversionsStats.push(conversionComponent)
        }
        return (
            <>
                {/* the overall data table is normalized throughout all games, it will always have this information in this order */}
                {/* god help me when i have to update it */}
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
                                    {/* render the kills stats */}
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
                                    {/* render the conversions stats */}
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
    const { loading, error, data } = useQuery(QUERY_GAME_FULL, {
        variables: { id: id },
    });
    return (
        <>
            {/* is it loading? show loading. if it loaded, render it */}
            {loading ? <p>loading</p> 
            : error ? navigate('/404')
            : renderGameTable(data)}
        </>
    )
}

export default GameIndividual