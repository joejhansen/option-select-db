import { useQuery } from "@apollo/client";
import { useParams, Link, useNavigate } from "react-router-dom";
import { QUERY_GAME_FULL } from "../../../../utils/apollo/queries";
import './game.css'
import CardLoader from '../../../Loader/CardLoader'
import GameClass from "./gameClass";


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

        const Game = new GameClass(data)
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
                <div className="row">
                    <div className="col">
                        <div className="card" style={styles.card}>
                            <div style={styles.cardWrapper}>

                                <div className="row">
                                    <div className="col">
                                        <p>Played on {Game.stage} at {Game.startDate.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p>Winner: {Game.winnerCode} as "{Game.winnerName}"</p>
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
                                                    <div><p><Link to={Game.linkToH2H} style={styles.link} >GO TO HEAD-2-HEAD</Link></p></div>
                                                    <div>
                                                        <Link to={Game.p1.codeLink} style={styles.link}>{Game.p1.connectCode}</Link> as <Link to={Game.p1.displayLink} style={styles.link}>{Game.p1.displayName}</Link>
                                                        <p>{Game.p1.character}</p>
                                                    </div>
                                                    <div>
                                                        <Link to={Game.p2.codeLink} style={styles.link}>{Game.p2.connectCode}</Link> as <Link to={Game.p2.displayLink} style={styles.link}>{Game.p2.displayName}</Link>
                                                        <p>{Game.p2.character}</p>
                                                    </div>
                                                </div>
                                                <div style={styles.overallTable.data.outer}>
                                                    <div style={styles.overallTable.data.body.offense.outer}>
                                                        <div>Offense</div>
                                                        <div id="overallOffense" className="overallTable" style={styles.overallTable.data.body.offense.inner}>
                                                            <div>Kills</div>
                                                            <div style={Game.p1.killCount > Game.p2.killCount ? styles.winner : null}>{Game.p1.killCount}</div>
                                                            <div style={Game.p1.killCount < Game.p2.killCount ? styles.winner : null}>{Game.p2.killCount}</div>

                                                            <div>Damage Done</div>
                                                            <div style={Game.p1.damage > Game.p2.damage ? styles.winner : null}>{Game.p1.damage}</div>
                                                            <div style={Game.p1.damage < Game.p2.damage ? styles.winner : null}>{Game.p2.damage}</div>

                                                            <div>Opening Conversion Rate</div>
                                                            <div style={Game.p1.conversionRate > Game.p2.conversionRate ? styles.winner : null}>
                                                                {Game.p1.conversionRate}%
                                                                ( {Game.p1.conversionCount} / {Game.p1.conversionTotal} )
                                                            </div>
                                                            <div style={Game.p1.conversionRate < Game.p2.conversionRate ? styles.winner : null}>
                                                                {Game.p2.conversionRate}%
                                                                ( {Game.p2.conversionCount} / {Game.p2.conversionTotal} )

                                                            </div>

                                                            <div>Openings / Kill</div>
                                                            <div style={Game.p1.openingsKill < Game.p2.openingsKill ? styles.winner : null}>{Game.p1.openingsKill}</div>
                                                            <div style={Game.p1.openingsKill > Game.p2.openingsKill ? styles.winner : null}>{Game.p2.openingsKill}</div>

                                                            <div>Damage / Opening</div>
                                                            <div style={Game.p1.damagePerOpening > Game.p2.damagePerOpening ? styles.winner : null}>{Game.p1.damagePerOpening}</div>
                                                            <div style={Game.p1.damagePerOpening < Game.p2.damagePerOpening ? styles.winner : null}>{Game.p2.damagePerOpening}</div>
                                                        </div>
                                                    </div>
                                                    <div style={styles.overallTable.data.body.defense.outer}>
                                                        <div>Defense</div>
                                                        <div id="overallDefense" className="overallTable" style={styles.overallTable.data.body.defense.inner}>
                                                            <div>Rolls</div>
                                                            <div style={Game.p1.rolls > Game.p2.rolls ? styles.winner : null}>{Game.p1.rolls}</div>
                                                            <div style={Game.p1.rolls < Game.p2.rolls ? styles.winner : null}>{Game.p2.rolls}</div>
                                                            <div>Air Dodges</div>
                                                            <div style={Game.p1.airdodges > Game.p2.airdodges ? styles.winner : null}>{Game.p1.airdodges}</div>
                                                            <div style={Game.p1.airdodges < Game.p2.airdodges ? styles.winner : null}>{Game.p2.airdodges}</div>
                                                            <div>Spot Dodges</div>
                                                            <div style={Game.p1.spotDodges > Game.p2.spotDodges ? styles.winner : null}>{Game.p1.spotDodges}</div>
                                                            <div style={Game.p1.spotDodges < Game.p2.spotDodges ? styles.winner : null}>{Game.p2.spotDodges}</div>
                                                        </div>
                                                    </div>
                                                    <div style={styles.overallTable.data.body.neutral.outer}>
                                                        <div>Neutral</div>
                                                        <div id="overallNeutral" className="overallTable" style={styles.overallTable.data.body.neutral.inner}>
                                                            <div>Neutral Wins</div>
                                                            <div style={Game.p1.neutralWinRatio > Game.p2.neutralWinRatio ? styles.winner : null}>{Game.p1.neutralWinCount} ( {Game.p1.neutralWinRatio}% ) </div>
                                                            <div style={Game.p1.neutralWinRatio < Game.p2.neutralWinRatio ? styles.winner : null}>{Game.p2.neutralWinCount} ( {Game.p2.neutralWinRatio}% ) </div>
                                                            <div>Counter Hits</div>
                                                            <div style={Game.p1.counterHitRatio > Game.p2.counterHitRatio ? styles.winner : null}>{Game.p1.counterHitCount} ( {Game.p1.counterHitRatio}% ) </div>
                                                            <div style={Game.p1.counterHitRatio < Game.p2.counterHitRatio ? styles.winner : null}>{Game.p2.counterHitCount} ( {Game.p2.counterHitRatio}% ) </div>
                                                            <div>Beneficial Trades</div>
                                                            <div style={Game.p1.beneficialTradeRatio > Game.p2.beneficialTradeRatio ? styles.winner : null}>{Game.p1.beneficialTradeCount} ( {Game.p1.beneficialTradeRatio}% ) </div>
                                                            <div style={Game.p1.beneficialTradeRatio < Game.p2.beneficialTradeRatio ? styles.winner : null}>{Game.p2.beneficialTradeCount} ( {Game.p2.beneficialTradeRatio}% ) </div>
                                                            <div>Actions (WD/WL/DD/LG)</div>
                                                            <div>{Game.p1.waveDash} / {Game.p1.waveLand} / {Game.p1.dashDance} / {Game.p1.ledgeGrab}</div>
                                                            <div>{Game.p2.waveDash} / {Game.p2.waveLand} / {Game.p2.dashDance} / {Game.p2.ledgeGrab}</div>
                                                        </div>
                                                    </div>
                                                    <div style={styles.overallTable.data.body.general.outer}>
                                                        <div>General</div>
                                                        <div id="overallGeneral" className="overallTable" style={styles.overallTable.data.body.general.inner}>
                                                            <div>Inputs / Minute</div>
                                                            <div style={Game.p1.inputsPerMinute > Game.p2.inputsPerMinute ? styles.winner : null}>{Game.p1.inputsPerMinute}</div>
                                                            <div style={Game.p1.inputsPerMinute < Game.p2.inputsPerMinute ? styles.winner : null}>{Game.p2.inputsPerMinute}</div>
                                                            <div>Digital Inputs / Minute</div>
                                                            <div style={Game.p1.digitalPerMinute > Game.p2.digitalPerMinute ? styles.winner : null}>{Game.p1.digitalPerMinute}</div>
                                                            <div style={Game.p1.digitalPerMinute < Game.p2.digitalPerMinute ? styles.winner : null}>{Game.p2.digitalPerMinute}</div>
                                                            <div>L-Cancel Success Rate</div>
                                                            <div style={Game.p1.lCancelRatio > Game.p2.lCancelRatio ? styles.winner : null}>
                                                                {Game.p1.lCancelRatio}% ( {Game.p1.lCancelSuccess} / {Game.p1.lCancelTotal} )</div>
                                                            <div style={Game.p1.lCancelRatio < Game.p2.lCancelRatio ? styles.winner : null}>
                                                                {Game.p2.lCancelRatio}% ( {Game.p2.lCancelSuccess} / {Game.p2.lCancelTotal} )</div>
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
                                            {Game.renderKills('p1')}
                                            {Game.renderKills('p2')}
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
                                            {/* MAYBE: maybe make this so no args are needed, depends on if doubles is ever a wanted feature */}
                                            {Game.renderConversions('p1')}
                                            {Game.renderConversions('p2')}
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