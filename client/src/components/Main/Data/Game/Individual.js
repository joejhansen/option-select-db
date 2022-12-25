import { useQuery } from "@apollo/client";
import { useParams, Link, useNavigate } from "react-router-dom";
import { QUERY_GAME_FULL } from "../../../../utils/apollo/queries";
import './game.css'
import CardLoader from '../../../Loader/CardLoader'
import GameClass from "./gameClass";


// TODO: make individual componenents of each table passing in the correct props for eas of use/refactoring if needed
// TODO: afix two-column tables design at 1022px for readability, if<1022px then make one column for conversions since it's like 7 columns

const GameIndividual = ({ theme }) => {
    const navigate = useNavigate()
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
    const renderGameTable = (data) => {

        const testGame = new GameClass(data)
        // okay
        // so
        // we just call it game
        const game = data.gameById
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

        return (
            <>
                {/* the overall data table is normalized throughout all games, it will always have this information in this order */}
                {/* god help me when i have to update it */}
                {/* TODO: refactor this so it's easier to read */}
                {/* or make it a component itself and pass in the data idk */}
                <div className="row">
                    <div className="col">
                        {/* <OverallTable theme={theme} data={data} /> */}
                        <div className="card" style={styles.card}>
                            <div style={styles.cardWrapper}>

                                <div className="row">
                                    <div className="col">
                                        <p>Played on {testGame.stage} at {testGame.startDate.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p>Winner: {testGame.winnerCode} as "{testGame.winnerName}"</p>
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
                                                    <div><p><Link to={testGame.linkToH2H} style={styles.link} >GO TO HEAD-2-HEAD</Link></p></div>
                                                    <div>
                                                        <Link to={testGame.p1.codeLink} style={styles.link}>{testGame.p1.connectCode}</Link> as <Link to={testGame.p1.displayLink} style={styles.link}>{testGame.p1.displayName}</Link>
                                                        <p>{testGame.p1.character}</p>
                                                    </div>
                                                    <div>
                                                        <Link to={testGame.p2.codeLink} style={styles.link}>{testGame.p2.connectCode}</Link> as <Link to={testGame.p2.displayLink} style={styles.link}>{testGame.p2.displayName}</Link>
                                                        <p>{testGame.p2.character}</p>
                                                    </div>
                                                </div>
                                                <div style={styles.overallTable.data.outer}>
                                                    <div style={styles.overallTable.data.body.offense.outer}>
                                                        <div>Offense</div>
                                                        <div id="overallOffense" className="overallTable" style={styles.overallTable.data.body.offense.inner}>
                                                            <div>Kills</div>
                                                            <div style={testGame.p1.killCount > testGame.p2.killCount ? styles.winner : null}>{testGame.p1.killCount}</div>
                                                            <div style={testGame.p1.killCount < testGame.p2.killCount ? styles.winner : null}>{testGame.p2.killCount}</div>

                                                            <div>Damage Done</div>
                                                            <div style={testGame.p1.damage > testGame.p2.damage ? styles.winner : null}>{testGame.p1.damage}</div>
                                                            <div style={testGame.p1.damage < testGame.p2.damage ? styles.winner : null}>{testGame.p2.damage}</div>

                                                            <div>Opening Conversion Rate</div>
                                                            <div style={testGame.p1.conversionRate > testGame.p2.conversionRate ? styles.winner : null}>
                                                                {testGame.p1.conversionRate}%
                                                                ( {testGame.p1.conversionCount} / {testGame.p1.conversionTotal} )
                                                            </div>
                                                            <div style={testGame.p1.conversionRate < testGame.p2.conversionRate ? styles.winner : null}>
                                                                {testGame.p2.conversionRate}%
                                                                ( {testGame.p2.conversionCount} / {testGame.p2.conversionTotal} )

                                                            </div>

                                                            <div>Openings / Kill</div>
                                                            <div style={testGame.p1.openingsKill < testGame.p2.openingsKill ? styles.winner : null}>{testGame.p1.openingsKill}</div>
                                                            <div style={testGame.p1.openingsKill > testGame.p2.openingsKill ? styles.winner : null}>{testGame.p2.openingsKill}</div>

                                                            <div>Damage / Opening</div>
                                                            <div style={testGame.p1.damagePerOpening > testGame.p2.damagePerOpening ? styles.winner : null}>{testGame.p1.damagePerOpening}</div>
                                                            <div style={testGame.p1.damagePerOpening < testGame.p2.damagePerOpening ? styles.winner : null}>{testGame.p2.damagePerOpening}</div>
                                                        </div>
                                                    </div>
                                                    <div style={styles.overallTable.data.body.defense.outer}>
                                                        <div>Defense</div>
                                                        <div id="overallDefense" className="overallTable" style={styles.overallTable.data.body.defense.inner}>
                                                            <div>Rolls</div>
                                                            <div style={testGame.p1.rolls > testGame.p2.rolls ? styles.winner : null}>{testGame.p1.rolls}</div>
                                                            <div style={testGame.p1.rolls < testGame.p2.rolls ? styles.winner : null}>{testGame.p2.rolls}</div>
                                                            <div>Air Dodges</div>
                                                            <div style={testGame.p1.airdodges > testGame.p2.airdodges ? styles.winner : null}>{testGame.p1.airdodges}</div>
                                                            <div style={testGame.p1.airdodges < testGame.p2.airdodges ? styles.winner : null}>{testGame.p2.airdodges}</div>
                                                            <div>Spot Dodges</div>
                                                            <div style={testGame.p1.spotDodges > testGame.p2.spotDodges ? styles.winner : null}>{testGame.p1.spotDodges}</div>
                                                            <div style={testGame.p1.spotDodges < testGame.p2.spotDodges ? styles.winner : null}>{testGame.p2.spotDodges}</div>
                                                        </div>
                                                    </div>
                                                    <div style={styles.overallTable.data.body.neutral.outer}>
                                                        <div>Neutral</div>
                                                        <div id="overallNeutral" className="overallTable" style={styles.overallTable.data.body.neutral.inner}>
                                                            <div>Neutral Wins</div>
                                                            <div style={testGame.p1.neutralWinRatio > testGame.p2.neutralWinRatio ? styles.winner : null}>{testGame.p1.neutralWinCount} ( {testGame.p1.neutralWinRatio}% ) </div>
                                                            <div style={testGame.p1.neutralWinRatio < testGame.p2.neutralWinRatio ? styles.winner : null}>{testGame.p2.neutralWinCount} ( {testGame.p2.neutralWinRatio}% ) </div>
                                                            <div>Counter Hits</div>
                                                            <div style={testGame.p1.counterHitRatio > testGame.p2.counterHitRatio ? styles.winner : null}>{testGame.p1.counterHitCount} ( {testGame.p1.counterHitRatio}% ) </div>
                                                            <div style={testGame.p1.counterHitRatio < testGame.p2.counterHitRatio ? styles.winner : null}>{testGame.p2.counterHitCount} ( {testGame.p2.counterHitRatio}% ) </div>
                                                            <div>Beneficial Trades</div>
                                                            <div style={testGame.p1.beneficialTradeRatio > testGame.p2.beneficialTradeRatio ? styles.winner : null}>{testGame.p1.beneficialTradeCount} ( {testGame.p1.beneficialTradeRatio}% ) </div>
                                                            <div style={testGame.p1.beneficialTradeRatio < testGame.p2.beneficialTradeRatio ? styles.winner : null}>{testGame.p2.beneficialTradeCount} ( {testGame.p2.beneficialTradeRatio}% ) </div>
                                                            <div>Actions (WD/WL/DD/LG)</div>
                                                            <div>{testGame.p1.waveDash} / {testGame.p1.waveLand} / {testGame.p1.dashDance} / {testGame.p1.ledgeGrab}</div>
                                                            <div>{testGame.p2.waveDash} / {testGame.p2.waveLand} / {testGame.p2.dashDance} / {testGame.p2.ledgeGrab}</div>
                                                        </div>
                                                    </div>
                                                    <div style={styles.overallTable.data.body.general.outer}>
                                                        <div>General</div>
                                                        <div id="overallGeneral" className="overallTable" style={styles.overallTable.data.body.general.inner}>
                                                            <div>Inputs / Minute</div>
                                                            <div style={testGame.p1.inputsPerMinute > testGame.p2.inputsPerMinute ? styles.winner : null}>{testGame.p1.inputsPerMinute}</div>
                                                            <div style={testGame.p1.inputsPerMinute < testGame.p2.inputsPerMinute ? styles.winner : null}>{testGame.p2.inputsPerMinute}</div>
                                                            <div>Digital Inputs / Minute</div>
                                                            <div style={testGame.p1.digitalPerMinute > testGame.p2.digitalPerMinute ? styles.winner : null}>{testGame.p1.digitalPerMinute}</div>
                                                            <div style={testGame.p1.digitalPerMinute < testGame.p2.digitalPerMinute ? styles.winner : null}>{testGame.p2.digitalPerMinute}</div>
                                                            <div>L-Cancel Success Rate</div>
                                                            {/* TODO: finish doing this with the class, rename from testGame too */}
                                                            {/* jesus christ what the fuck is this? */}
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
                        <div className="card" style={styles.card}>
                            <div style={styles.cardWrapper}>
                                <div className="row">
                                    <div className="col">
                                        <div className="row">
                                            <div className="col">
                                                <p>Kills</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            {/* render the kills stats */}
                                            {testGame.renderKills('p1')}
                                            {testGame.renderKills('p2')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card" style={styles.card}>
                            <div style={styles.cardWrapper}>
                                <div className="row">
                                    <div className="col">
                                        <div className="row">
                                            <div className="col">
                                                <p>Openings & Conversions</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            {/* render the conversions stats */}
                                            {/* TODO: maybe make this so no args are needed, depends on if doubles is ever a wanted feature */}
                                            {testGame.renderConversions('p1')}
                                            {testGame.renderConversions('p2')}
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

    let { id } = useParams();
    const { loading, error, data } = useQuery(QUERY_GAME_FULL, {
        variables: { id: id },
    });
    return (
        <>
            {/* is it loading? show loading. if it loaded, render it */}
            {loading
                ? <CardLoader />
                : error
                    ? navigate('/404')
                    : renderGameTable(data)}
        </>
    )
}

export default GameIndividual