import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_MATCHUP } from '../../../../utils/apollo/queries';
import { useEffect } from 'react';
import CardLoader from "../../../Loader/CardLoader"

import './h2h.css'
import H2HClass from './H2HClass';

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
        const h2h = new H2HClass({ data, players: [id1, id2] })
        return (
            <>
                <div className='container'>
                    <p>{h2h.p1.connectCode} vs {h2h.p2.connectCode}</p>
                    <div className='row'>
                        <div className='col'>
                            <div className='card' style={styles.card}>
                                <div style={styles.cardWrapper}>
                                    <div style={styles.matchupTable.outer}>
                                        <div>
                                            Matchup Statistics Over {h2h.gamesPlayed} Games
                                        </div>
                                        <div style={styles.matchupTable.body.outer}>
                                            <div style={styles.matchupTable.body.header}>
                                                <div>H2H Averages</div>
                                                <div><Link to={h2h.p1.link} style={styles.link}>{h2h.p1.connectCode}</Link></div>
                                                <div><Link to={h2h.p2.link} style={styles.link}>{h2h.p2.connectCode}</Link></div>
                                            </div>
                                            <div id="overallh2h" style={styles.matchupTable.body.data}>
                                                <div>Conversions / Game</div>
                                                <div style={h2h.p1.conversionsPerGame > h2h.p2.conversionsPerGame ? styles.winner : null}>{h2h.p1.conversionsPerGame}</div>
                                                <div style={h2h.p1.conversionsPerGame < h2h.p2.conversionsPerGame ? styles.winner : null}>{h2h.p2.conversionsPerGame}</div>
                                                <div>Damage / Opening</div>
                                                <div style={h2h.p1.damagePerOpening > h2h.p2.damagePerOpening ? styles.winner : null}>{h2h.p1.damagePerOpening}%</div>
                                                <div style={h2h.p1.damagePerOpening < h2h.p2.damagePerOpening ? styles.winner : null}>{h2h.p2.damagePerOpening}%</div>
                                                <div>Inputs / Minute</div>
                                                <div style={h2h.p1.inputsPerMinute > h2h.p2.inputsPerMinute ? styles.winner : null}>{h2h.p1.inputsPerMinute}</div>
                                                <div style={h2h.p1.inputsPerMinute < h2h.p2.inputsPerMinute ? styles.winner : null}>{h2h.p2.inputsPerMinute}</div>
                                                <div>Kills / Game</div>
                                                <div style={h2h.p1.killsPerGame > h2h.p2.killsPerGame ? styles.winner : null}>{h2h.p1.killsPerGame}</div>
                                                <div style={h2h.p1.killsPerGame < h2h.p2.killsPerGame ? styles.winner : null}>{h2h.p2.killsPerGame}</div>
                                                <div>Neutral Win %</div>
                                                <div style={h2h.p1.neutralWinsPer > h2h.p2.neutralWinsPer ? styles.winner : null}>{h2h.p1.neutralWinsPer}%</div>
                                                <div style={h2h.p1.neutralWinsPer < h2h.p2.neutralWinsPer ? styles.winner : null}>{h2h.p2.neutralWinsPer}%</div>
                                                <div>Openings / Kill</div>
                                                <div style={h2h.p1.openingsPerKill < h2h.p2.openingsPerKill ? styles.winner : null}>{h2h.p1.openingsPerKill}</div>
                                                <div style={h2h.p1.openingsPerKill > h2h.p2.openingsPerKill ? styles.winner : null}>{h2h.p2.openingsPerKill}</div>
                                                <div>Successful Conversions %</div>
                                                <div style={h2h.p1.conversionSuccess > h2h.p2.conversionSuccess ? styles.winner : null}>{h2h.p1.conversionSuccess}%</div>
                                                <div style={h2h.p1.conversionSuccess < h2h.p2.conversionSuccess ? styles.winner : null}>{h2h.p2.conversionSuccess}%</div>
                                                <div>Damage / Game</div>
                                                <div style={h2h.p1.damagePerGame > h2h.p2.damagePerGame ? styles.winner : null}>{h2h.p1.damagePerGame}%</div>
                                                <div style={h2h.p1.damagePerGame < h2h.p2.damagePerGame ? styles.winner : null}>{h2h.p2.damagePerGame}%</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className='card' style={styles.card}>
                                <div style={styles.cardWrapper}>
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