import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_MATCHUP } from '../../../../utils/apollo/queries';
import { useEffect } from 'react';
import CardLoader from "../../../Loader/CardLoader"

import './h2h.css'

// TODO: think of more things to analyze
// TODO: add a list of shared games at the bottom, add context or something to track for a back/forward button

const Head2Head = ({ theme }) => {
    const styles = {
        card: {
            backgroundColor: theme.primary,
            color: theme.text,
            position: 'relative',
            border: `solid ${theme.text} 2px`,
            bordeRadius: '.333rem',
            boxShadow: `-5px 5px 0px 3px ${theme.accent}`,
            margin: `1rem 0`
        },
        cardWrapper: {
            padding: '.5rem'
        },
        winner: {
            color: theme.accent
        },
        link: {
            textDecoration: 'none',
            color: theme.accent
        },
        matchupTable: {
            outer: {
                display: 'grid',
                gridTemplate: '1fr 9fr/1fr'
            },
            header: {

            },
            body: {
                outer: {
                    display: 'grid',
                    gridTemplate: '1fr 8fr /1fr'
                },
                header: {
                    display: 'grid',
                    gridTemplate: '1fr/1fr 1fr 1fr'
                },
                data: {
                    display: 'grid',
                    gridTemplate: 'repeat(8, 1fr)/1fr 1fr 1fr'
                },
            },
        }
    }
    let { id1, id2 } = useParams();
    const navigate = useNavigate()

    const { loading, error, data } = useQuery(QUERY_MATCHUP, {
        variables: { id1: id1, id2: id2 },
    });

    useEffect(() => {

    }, [])

    const renderH2H = (data) => {
        const codeRegex = /^(?=.{1,8}$)[A-Z]*\-\d*$/i
        let player1, player2
        let linkToP1, linkToP2
        if (id1.match(codeRegex) && id2.match(codeRegex)) {
            linkToP1 = `../${id1}`
            player1 = id1.replace(/-/g, '#')
            linkToP2 = `../${id2}`
            player2 = id2.replace(/-/g, '#')

        } else {
            // why is this an array at index 0 instead of a singular object? what did you do, past me?
            // TODO: change this idk
            if (data.matchup[0].codeIds[0]._id === id1) {
                player1 = data.matchup[0].codeIds[0].connectCode
                linkToP1 = `../${id1}`
                player2 = data.matchup[0].codeIds[1].connectCode
                linkToP2 = `../${id2}`
            } else {
                player1 = data.matchup[0].codeIds[1].connectCode
                linkToP1 = `../${id2}`
                player2 = data.matchup[0].codeIds[0].connectCode
                linkToP2 = `../${id1}`
            }
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
        // TODO: make this a class with methods to make it easier, passing in the PlayerInfo[playerIndex] object
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
        const player1Overall = {
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
        const player2Overall = {
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
        return (
            <>
                <div className='container'>
                    <p>{player1} vs {player2}</p>
                    <div className='row'>
                        <div className='col'>
                            <div className='card' style={styles.card}>
                                <div style={styles.cardWrapper}>
                                    <div style={styles.matchupTable.outer}>
                                        <div>
                                            Matchup Statistics Over {playersInfo[player1].length} Games
                                        </div>
                                        <div style={styles.matchupTable.body.outer}>
                                            <div style={styles.matchupTable.body.header}>
                                                <div>H2H Averages</div>
                                                <div><Link to={linkToP1} style={styles.link}>{player1}</Link></div>
                                                <div><Link to={linkToP2} style={styles.link}>{player2}</Link></div>
                                            </div>
                                            <div id="overallh2h" style={styles.matchupTable.body.data}>
                                                <div>Conversions / Game</div>
                                                <div style={player1Overall.conversionsPerGame > player2Overall.conversionsPerGame ? styles.winner : null}>{player1Overall.conversionsPerGame}</div>
                                                <div style={player1Overall.conversionsPerGame < player2Overall.conversionsPerGame ? styles.winner : null}>{player2Overall.conversionsPerGame}</div>
                                                <div>Damage / Opening</div>
                                                <div style={player1Overall.damagePerOpening > player2Overall.damagePerOpening ? styles.winner : null}>{player1Overall.damagePerOpening}%</div>
                                                <div style={player1Overall.damagePerOpening < player2Overall.damagePerOpening ? styles.winner : null}>{player2Overall.damagePerOpening}%</div>
                                                <div>Inputs / Minute</div>
                                                <div style={player1Overall.inputsPerMinute > player2Overall.inputsPerMinute ? styles.winner : null}>{player1Overall.inputsPerMinute}</div>
                                                <div style={player1Overall.inputsPerMinute < player2Overall.inputsPerMinute ? styles.winner : null}>{player2Overall.inputsPerMinute}</div>
                                                <div>Kills / Game</div>
                                                <div style={player1Overall.killsPerGame > player2Overall.killsPerGame ? styles.winner : null}>{player1Overall.killsPerGame}</div>
                                                <div style={player1Overall.killsPerGame < player2Overall.killsPerGame ? styles.winner : null}>{player2Overall.killsPerGame}</div>
                                                <div>Neutral Win %</div>
                                                <div style={player1Overall.neutralWinsPer > player2Overall.neutralWinsPer ? styles.winner : null}>{player1Overall.neutralWinsPer}%</div>
                                                <div style={player1Overall.neutralWinsPer < player2Overall.neutralWinsPer ? styles.winner : null}>{player2Overall.neutralWinsPer}%</div>
                                                <div>Openings / Kill</div>
                                                <div style={player1Overall.openingsPerKill < player2Overall.openingsPerKill ? styles.winner : null}>{player1Overall.openingsPerKill}</div>
                                                <div style={player1Overall.openingsPerKill > player2Overall.openingsPerKill ? styles.winner : null}>{player2Overall.openingsPerKill}</div>
                                                <div>Successful Conversions %</div>
                                                <div style={player1Overall.conversionSuccess > player2Overall.conversionSuccess ? styles.winner : null}>{player1Overall.conversionSuccess}%</div>
                                                <div style={player1Overall.conversionSuccess < player2Overall.conversionSuccess ? styles.winner : null}>{player2Overall.conversionSuccess}%</div>
                                                <div>Damage / Game</div>
                                                <div style={player1Overall.damagePerGame > player2Overall.damagePerGame ? styles.winner : null}>{player1Overall.damagePerGame}%</div>
                                                <div style={player1Overall.damagePerGame < player2Overall.damagePerGame ? styles.winner : null}>{player2Overall.damagePerGame}%</div>
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

    return (
        <>
            {loading
                ? <CardLoader />
                : error || !data.matchup.length
                    ? navigate('/404')
                    : renderH2H(data)}
        </>
    )
}

export default Head2Head