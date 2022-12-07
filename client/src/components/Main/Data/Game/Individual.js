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
        overallTable: {
            outer: {
                outline: 'dashed red 2px',
                display: 'grid',
                gridTemplate: `2fr 10fr/1fr`,
                color: theme.text,

            },
            header: {
                outline: 'dashed red 2px',
                color: theme.text,
            },
            data: {
                outer: {
                    outline: 'dashed red 2px',
                    color: theme.text,
                    display: 'grid',
                    gridTemplate: `2fr 10fr/1fr`
                },
                header: {
                    outline: 'dashed red 2px',
                    color: theme.text,
                },
                body: {
                    color: theme.text,
                    outline: 'dashed red 2px',
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
                                <p>Overall</p>
                                <div className="row">
                                    <div className="col" style={styles.overallTable.outer}>
                                        <div style={styles.overallTable.data.header}>
                                            <div>Header</div>
                                        </div>
                                        <div style={styles.overallTable.data.outer}>
                                            <div style={styles.overallTable.header}>
                                                Data Header
                                            </div>
                                            <div style={styles.overallTable.body}>
                                                <div>
                                                    data
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