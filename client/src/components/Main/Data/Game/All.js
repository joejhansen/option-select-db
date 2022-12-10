import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { QUERY_GAMES_SIMPLE } from "../../../../utils/apollo/queries"
import { Link } from "react-router-dom"

const Games = ({ theme }) => {
    const { loading, data } = useQuery(QUERY_GAMES_SIMPLE)
    const styles = {
        card: {
            backgroundColor: theme.primary,
            color: theme.text
        },
        link: {
            textDecoration: 'none',
            color: theme.accent
        }
    }
    useEffect(() => {
    }, [])

    const renderGames = (data) => {
        let render = []
        for (let game of data.games) {
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
            const startDate = new Date(parseInt(game.metadata.startAt))
            let linkToGame = `../${game._id}`
            const localDate = startDate.toLocaleDateString()
            const localTime = startDate.toLocaleTimeString()
            render.push(
                <div className='row'>
                    <div className="col">
                        <div className="card" style={styles.card}>
                            <p>Played on <Link to={linkToGame} style={styles.link}>{localDate} at {localTime}</Link></p>
                            <p>Played By</p>
                            <ul>{renderPlayers}</ul>
                        </div>
                    </div>
                </div>

            )
        }
        return render
    }

    return (
        <div className="container">
            {loading ? <p>loading</p> : renderGames(data)}

        </div>
    )
}

export default Games