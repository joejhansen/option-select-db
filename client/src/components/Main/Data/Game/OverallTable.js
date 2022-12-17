import movesList from '../../../../utils/game-info/moves.json'
import charactersList from '../../../../utils/game-info/characters.json'
import stagesList from '../../../../utils/game-info/stages.json'


const OverallTable = ({ theme, data }) => {
    const styles = {
        card: {
            backgroundColor: theme.primary,
            color: theme.text,
            position: 'relative',
            border: `solid ${theme.text} 2px`,
            bordeRadius: '.333rem',
            boxShadow: `-5px 5px 0px 3px ${theme.accent}`,
            margin: `1rem`
        },
        cardWrapper: {
            padding: '.5rem'
        },
        winner: {
            color: theme.accent
        },
        dq: {
            color: 'red'
        },
        link: {
            textDecoration: 'none',
            color: theme.accent
        },
        table: {
            backgroundColor: theme.primary,
            color: theme.text,
        },
        damage: {},
        damageEnd: {
        },
        damageTotal: {
        },
        overallTable: {
            outer: {

                display: 'grid',
                gridTemplate: `1fr 19fr/1fr`,
                color: theme.text,
                padding: '0',
                margin: '0 1rem'

            },
            header: {

                color: theme.text,
                display: 'grid',
                gridTemplate: '1fr /1fr 1fr 1fr 1fr'
            },
            data: {
                // do specific ones
                outer: {

                    color: theme.text,
                    display: 'grid',
                    gridTemplate: `6fr 4fr 5fr 4fr/1fr`
                },
                header: {

                    color: theme.text,
                },
                body: {
                    outer: {

                        display: 'grid',
                        gridTemplate: '2fr 10fr/1fr'
                    },
                    offense: {
                        outer: {

                            display: 'grid',
                            gridTemplate: '1fr 5fr/1fr'
                        },

                        inner: {

                            display: 'grid',
                            gridTemplate: '1fr 1fr 1fr 1fr 1fr/ 2fr 1fr 1fr'
                        },
                    },
                    defense: {
                        outer: {

                            display: 'grid',
                            gridTemplate: '1fr 3fr/1fr'

                        },
                        inner: {

                            display: 'grid',
                            gridTemplate: '1fr 1fr 1fr/2fr 1fr 1fr'
                        },
                    },
                    neutral: {
                        outer: {

                            display: 'grid',
                            gridTemplate: '1fr 4fr/1fr'
                        },
                        inner: {

                            display: 'grid',
                            gridTemplate: '1fr 1fr 1fr 1fr/2fr 1fr 1fr'
                        }
                    },
                    general: {
                        outer: {

                            display: 'grid',
                            gridTemplate: '1fr 3fr/1fr'
                        },
                        inner: {

                            display: 'grid',
                            gridTemplate: '1fr 1fr 1fr/2fr 1fr 1fr'
                        },
                    },
                }
            }
        }
    }

    const game = data.gameById
    const startDate = new Date(parseInt(game.metadata.startAt))
    const gameWinnerIndex = game.stats.conversions[game.stats.conversions.length - 1].lastHitBy
    const code1Link = game.codeIds[0].connectCode.replace('#', '-')
    const code2Link = game.codeIds[1].connectCode.replace('#', '-')
    const linkToH2H = `../../connectcode/${code1Link}/vs/${code2Link}`
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
        const linkToDisplayName = `../../displayname/${displayName}`
        linkToDisplayNames.push(linkToDisplayName)
        // get the connectCode data
        const { connectCode, connect_id } = playerConnectCodes[i]
        // make the link
        const codeIdLink = connectCode.replace('#', '-')
        const linkToConnectCode = `../../connectcode/${codeIdLink}`
        linkToConnectCodes.push(linkToConnectCode)
        // push it to the renderPlayers array for rendering down the line
        renderPlayers.push(
            <>
                <li key={connectCode}><Link to={linkToConnectCode} style={styles.link}>{connectCode}</Link> as <Link to={linkToDisplayName} style={styles.link}>{displayName}</Link></li>
            </>
        )
    }
    return (
        <>
            <div className="card" style={styles.card}>
                <div style={styles.cardWrapper}>

                    <div className="row">
                        <div className="col">
                            <p>Played on {stagesList[game.settings.stageId]} at {startDate.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p>Winner: {game.codeIds[gameWinnerIndex].connectCode} as "{game.displayNames[gameWinnerIndex].displayName}" playing {game.metadata.players[gameWinnerIndex].characters.length > 1 ? `Ice Climbers` : charactersList[game.metadata.players[gameWinnerIndex].characters[0]].name}</p>
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
                                        <div><p><Link to={linkToH2H} style={styles.link} >GO TO HEAD-2-HEAD</Link></p></div>
                                        <div>
                                            <Link to={linkToConnectCodes[0]} style={styles.link}>{game.codeIds[0].connectCode}</Link> as <Link to={linkToDisplayNames[0]} style={styles.link}>{game.displayNames[0].displayName}</Link>
                                            <p>{game.metadata.players[0].characters.length > 1 ? `Ice Climbers` : charactersList[game.metadata.players[0].characters[0]].name}</p>
                                        </div>
                                        <div>
                                            <Link to={linkToConnectCodes[1]} style={styles.link}>{game.codeIds[1].connectCode}</Link> as <Link to={linkToDisplayNames[1]} style={styles.link}> {game.displayNames[1].displayName}</Link>
                                            <p>{game.metadata.players[1].characters.length > 1 ? `Ice Climbers` : charactersList[game.metadata.players[1].characters[0]].name}</p>

                                        </div>
                                    </div>
                                    <div style={styles.overallTable.data.outer}>
                                        <div style={styles.overallTable.data.body.offense.outer}>
                                            <div>Offense</div>
                                            <div id="overallOffense" className="overallTable" style={styles.overallTable.data.body.offense.inner}>
                                                <div>Kills</div>
                                                <div style={game.stats.overall[0].killCount > game.stats.overall[1].killCount ? styles.winner : null}>{game.stats.overall[0].killCount}</div>
                                                <div style={game.stats.overall[0].killCount < game.stats.overall[1].killCount ? styles.winner : null}>{game.stats.overall[1].killCount}</div>

                                                <div>Damage Done</div>
                                                <div style={game.stats.overall[0].totalDamage > game.stats.overall[1].totalDamage ? styles.winner : null}>{Math.floor(game.stats.overall[0].totalDamage * 100) / 100}%</div>
                                                <div style={game.stats.overall[0].totalDamage < game.stats.overall[1].totalDamage ? styles.winner : null}>{Math.floor(game.stats.overall[1].totalDamage * 100) / 100}%</div>

                                                <div>Opening Conversion Rate</div>
                                                <div style={game.stats.overall[0].successfulConversions.ratio > game.stats.overall[1].successfulConversions.ratio ? styles.winner : null}>
                                                    {Math.floor(game.stats.overall[0].successfulConversions.ratio * 10000) / 100}%
                                                    ( {game.stats.overall[0].successfulConversions.count} / {game.stats.overall[0].successfulConversions.total} )
                                                </div>
                                                <div style={game.stats.overall[0].successfulConversions.ratio < game.stats.overall[1].successfulConversions.ratio ? styles.winner : null}>
                                                    {Math.floor(game.stats.overall[1].successfulConversions.ratio * 10000) / 100}%
                                                    ( {game.stats.overall[1].successfulConversions.count} / {game.stats.overall[1].successfulConversions.total} )
                                                </div>

                                                <div>Openings / Kill</div>
                                                <div style={game.stats.overall[0].openingsPerKill.ratio < game.stats.overall[1].openingsPerKill.ratio ? styles.winner : null}>{Math.floor(game.stats.overall[0].openingsPerKill.ratio * 1000) / 1000}</div>
                                                <div style={game.stats.overall[0].openingsPerKill.ratio > game.stats.overall[1].openingsPerKill.ratio ? styles.winner : null}>{Math.floor(game.stats.overall[1].openingsPerKill.ratio * 1000) / 1000}</div>

                                                <div>Damage / Opening</div>
                                                <div style={game.stats.overall[0].damagePerOpening.ratio > game.stats.overall[1].damagePerOpening.ratio ? styles.winner : null}>{Math.floor(game.stats.overall[0].damagePerOpening.ratio * 100) / 100}</div>
                                                <div style={game.stats.overall[0].damagePerOpening.ratio < game.stats.overall[1].damagePerOpening.ratio ? styles.winner : null}>{Math.floor(game.stats.overall[1].damagePerOpening.ratio * 100) / 100}</div>
                                            </div>
                                        </div>
                                        <div style={styles.overallTable.data.body.defense.outer}>
                                            <div>Defense</div>
                                            <div id="overallDefense" className="overallTable" style={styles.overallTable.data.body.defense.inner}>
                                                <div>Rolls</div>
                                                <div style={game.stats.actionCounts[0].rollCount > game.stats.actionCounts[1].rollcount ? styles.winner : null}>{game.stats.actionCounts[0].rollCount}</div>
                                                <div style={game.stats.actionCounts[0].rollCount < game.stats.actionCounts[1].rollCount ? styles.winner : null}>{game.stats.actionCounts[1].rollCount}</div>
                                                <div>Air Dodges</div>
                                                <div style={game.stats.actionCounts[0].airDodgeCount > game.stats.actionCounts[1].airDodgeCount ? styles.winner : null}>{game.stats.actionCounts[0].airDodgeCount}</div>
                                                <div style={game.stats.actionCounts[0].airDodgeCount < game.stats.actionCounts[1].airDodgeCount ? styles.winner : null}>{game.stats.actionCounts[1].airDodgeCount}</div>
                                                <div>Spot Dodges</div>
                                                <div style={game.stats.actionCounts[0].spotDodgeCount > game.stats.actionCounts[1].spotDodgeCount ? styles.winner : null}>{game.stats.actionCounts[0].spotDodgeCount}</div>
                                                <div style={game.stats.actionCounts[0].spotDodgeCount < game.stats.actionCounts[1].spotDodgeCount ? styles.winner : null}>{game.stats.actionCounts[1].spotDodgeCount}</div>
                                            </div>
                                        </div>
                                        <div style={styles.overallTable.data.body.neutral.outer}>
                                            <div>Neutral</div>
                                            <div id="overallNeutral" className="overallTable" style={styles.overallTable.data.body.neutral.inner}>
                                                <div>Neutral Wins</div>
                                                <div style={game.stats.overall[0].neutralWinRatio.ratio > game.stats.overall[1].neutralWinRatio.ratio ? styles.winner : null}>{game.stats.overall[0].neutralWinRatio.count} ( {Math.floor(game.stats.overall[0].neutralWinRatio.ratio * 10000) / 100}% ) </div>
                                                <div style={game.stats.overall[0].neutralWinRatio.ratio < game.stats.overall[1].neutralWinRatio.ratio ? styles.winner : null}>{game.stats.overall[1].neutralWinRatio.count} ( {Math.floor(game.stats.overall[1].neutralWinRatio.ratio * 10000) / 100}% ) </div>
                                                <div>Counter Hits</div>
                                                <div style={game.stats.overall[0].counterHitRatio.ratio > game.stats.overall[1].counterHitRatio.ratio ? styles.winner : null}>{game.stats.overall[0].counterHitRatio.count} ( {Math.floor(game.stats.overall[0].counterHitRatio.ratio * 10000) / 100}% ) </div>
                                                <div style={game.stats.overall[0].counterHitRatio.ratio < game.stats.overall[1].counterHitRatio.ratio ? styles.winner : null}>{game.stats.overall[1].counterHitRatio.count} ( {Math.floor(game.stats.overall[1].counterHitRatio.ratio * 10000) / 100}% ) </div>
                                                <div>Beneficial Trades</div>
                                                <div style={game.stats.overall[0].beneficialTradeRatio.ratio > game.stats.overall[1].beneficialTradeRatio.ratio ? styles.winner : null}>{game.stats.overall[0].beneficialTradeRatio.count} ( {Math.floor(game.stats.overall[0].beneficialTradeRatio.ratio * 10000) / 100}% ) </div>
                                                <div style={game.stats.overall[0].beneficialTradeRatio.ratio < game.stats.overall[1].beneficialTradeRatio.ratio ? styles.winner : null}>{game.stats.overall[1].beneficialTradeRatio.count} ( {Math.floor(game.stats.overall[1].beneficialTradeRatio.ratio * 10000) / 100}% ) </div>
                                                <div>Actions (WD/WL/DD/LG)</div>
                                                <div>{game.stats.actionCounts[0].wavedashCount} / {game.stats.actionCounts[0].wavelandCount} / {game.stats.actionCounts[0].dashDanceCount} / {game.stats.actionCounts[0].ledgegrabCount}</div>
                                                <div>{game.stats.actionCounts[1].wavedashCount} / {game.stats.actionCounts[1].wavelandCount} / {game.stats.actionCounts[1].dashDanceCount} / {game.stats.actionCounts[1].ledgegrabCount}</div>
                                            </div>
                                        </div>
                                        <div style={styles.overallTable.data.body.general.outer}>
                                            <div>General</div>
                                            <div id="overallGeneral" className="overallTable" style={styles.overallTable.data.body.general.inner}>
                                                <div>Inputs / Minute</div>
                                                <div style={game.stats.overall[0].inputsPerMinute.ratio > game.stats.overall[1].inputsPerMinute.ratio ? styles.winner : null}>{Math.floor(game.stats.overall[0].inputsPerMinute.ratio * 100) / 100}</div>
                                                <div style={game.stats.overall[0].inputsPerMinute.ratio < game.stats.overall[1].inputsPerMinute.ratio ? styles.winner : null}>{Math.floor(game.stats.overall[1].inputsPerMinute.ratio * 100) / 100}</div>
                                                <div>Digital Inputs / Minute</div>
                                                <div style={game.stats.overall[0].digitalInputsPerMinute.ratio > game.stats.overall[1].digitalInputsPerMinute.ratio ? styles.winner : null}>{Math.floor(game.stats.overall[0].digitalInputsPerMinute.ratio * 100) / 100}</div>
                                                <div style={game.stats.overall[0].digitalInputsPerMinute.ratio < game.stats.overall[1].digitalInputsPerMinute.ratio ? styles.winner : null}>{Math.floor(game.stats.overall[1].digitalInputsPerMinute.ratio * 100) / 100}</div>
                                                <div>L-Cancel Success Rate</div>
                                                <div style={(game.stats.actionCounts[0].lCancelCount.success) / (game.stats.actionCounts[0].lCancelCount.success + game.stats.actionCounts[0].lCancelCount.fail) > (game.stats.actionCounts[1].lCancelCount.success) / (game.stats.actionCounts[1].lCancelCount.success + game.stats.actionCounts[1].lCancelCount.fail) ? styles.winner : null}>
                                                    {Math.floor((game.stats.actionCounts[0].lCancelCount.success) / (game.stats.actionCounts[0].lCancelCount.success + game.stats.actionCounts[0].lCancelCount.fail) * 10000) / 100}%
                                                    ( {game.stats.actionCounts[0].lCancelCount.success} / {game.stats.actionCounts[0].lCancelCount.success + game.stats.actionCounts[0].lCancelCount.fail} )</div>
                                                <div style={(game.stats.actionCounts[0].lCancelCount.success) / (game.stats.actionCounts[0].lCancelCount.success + game.stats.actionCounts[0].lCancelCount.fail) < (game.stats.actionCounts[1].lCancelCount.success) / (game.stats.actionCounts[1].lCancelCount.success + game.stats.actionCounts[1].lCancelCount.fail) ? styles.winner : null}>
                                                    {Math.floor((game.stats.actionCounts[1].lCancelCount.success) / (game.stats.actionCounts[1].lCancelCount.success + game.stats.actionCounts[1].lCancelCount.fail) * 10000) / 100}%
                                                    ( {game.stats.actionCounts[1].lCancelCount.success} / {game.stats.actionCounts[1].lCancelCount.success + game.stats.actionCounts[1].lCancelCount.fail} )</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default OverallTable