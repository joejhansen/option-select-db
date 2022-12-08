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
        killsTable: {

        },
        overallTable: {
            outer: {
                outline: 'dashed red 2px',
                display: 'grid',
                gridTemplate: `1fr 19fr/1fr`,
                color: theme.text,
                padding: '0'

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
        console.log(game)
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
        for (let i = 0; i < playerConnectCodes.length; i++) {
            const { displayName, display_id } = playerDisplayNames[i]
            const { connectCode, connect_id } = playerConnectCodes[i]
            const linkToDisplayName = `../../displayname/${display_id}`
            const linkToConnectCode = `../../connectcode/${connect_id}`
            renderPlayers.push(
                <li><Link to={linkToConnectCode} style={styles.link}>{connectCode}</Link> as <Link to={linkToDisplayName} style={styles.link}>{displayName}</Link></li>
            )
        }
        let linkToGame = `../${game._id}`

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
                                <p>Overall Stats</p>
                                <div className="row">
                                    <div className="col" style={styles.overallTable.outer}>
                                        <div style={styles.overallTable.header}>
                                            <div></div>
                                            <div>{game.codeIds[0].connectCode} as {game.displayNames[0].displayName}</div>
                                            <div>{game.codeIds[1].connectCode} as {game.displayNames[1].displayName}</div>
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
                                                    <div>{Math.floor(game.stats.overall[0].successfulConversions.ratio * 10000) / 100}% ( {game.stats.overall[0].successfulConversions.count} / {game.stats.overall[0].successfulConversions.total} )</div>
                                                    <div>{Math.floor(game.stats.overall[1].successfulConversions.ratio * 10000) / 100}% ( {game.stats.overall[1].successfulConversions.count} / {game.stats.overall[1].successfulConversions.total} )</div>

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
                                                    <div>{Math.floor(game.stats.overall[0].inputsPerMinute.ratio*100)/100}</div>
                                                    <div>{Math.floor(game.stats.overall[1].inputsPerMinute.ratio*100)/100}</div>

                                                    <div>Digital Inputs / Minute</div>
                                                    <div>{Math.floor(game.stats.overall[0].digitalInputsPerMinute.ratio*100)/100}</div>
                                                    <div>{Math.floor(game.stats.overall[1].digitalInputsPerMinute.ratio*100)/100}</div>

                                                    <div>L-Cancel Success Rate</div>
                                                    <div>{game.stats.actionCounts[0].lCancelCount.success} / {game.stats.actionCounts[0].lCancelCount.success+game.stats.actionCounts[0].lCancelCount.fail}</div>
                                                    <div>data</div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                Kills
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                Openings & Conversions
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
    const renderGame = (data) => {
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
        for (let i = 0; i < playerConnectCodes.length; i++) {
            const { displayName, display_id } = playerDisplayNames[i]
            const { connectCode, connect_id } = playerConnectCodes[i]
            const linkToDisplayName = `../../displayname/${display_id}`
            const linkToConnectCode = `../../connectcode/${connect_id}`
            renderPlayers.push(
                <li><Link to={linkToConnectCode} style={styles.link}>{connectCode}</Link> as <Link to={linkToDisplayName} style={styles.link}>{displayName}</Link></li>
            )
        }
        let linkToGame = `../${game._id}`
        render.push(
            <>

                <div className='row'>
                    <div className="col">
                        <div className="card" style={styles.card}>
                            <p>Played on {JSON.stringify(startDate)}</p>
                            <p>Played By</p>
                            <ul>{renderPlayers}</ul>
                        </div>
                    </div>
                </div>
            </>
        )
        return render
    }
    let { id } = useParams();
    const { loading, data } = useQuery(QUERY_GAME_FULL, {
        variables: { id: id },
    });
    return (
        <>
            {loading ? <p>loading</p> : renderGameTable(data)}
            {loading ? <p>loading</p> : renderGame(data)}
        </>
    )
}

export default GameIndividual