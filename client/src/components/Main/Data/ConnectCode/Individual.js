import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_CONNECT_CODE } from '../../../../utils/apollo/queries';

const ConnectCodeIndividual = ({ theme }) => {
    let { id } = useParams();
    const { loading, error, data } = useQuery(QUERY_CONNECT_CODE, {
        variables: { id: id },
    });
    const navigate = useNavigate()
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
    const renderConnectCode = (data) => {
        const individual = data.codeIdById
        let render = []
        let displayNames = []
        for (let displayName of individual.displayNames) {
            const linkToDisplayName = `../../displayname/${displayName._id}`
            displayNames.push(
                <li><Link to={linkToDisplayName} style={styles.link}>{displayName.displayName}</Link></li>
            )
        }
        let games = []
        for (let game of data.codeIdById.games) {
            const linkTo = `../../game/${game._id}`
            const date = new Date(parseInt(game.metadata.startAt))
            games.push(<li>Game Played on <Link to={linkTo} style={styles.link}>{JSON.stringify(date)}</Link></li>)
        }
        render.push(
            <div className='row'>
                <div className="col">
                    <div className="card" style={styles.card}>
                        <p>{data.codeIdById.connectCode}</p>
                        <p>{data.codeIdById.createdAt}</p>
                        <p>Display Names</p>
                        <ul>{displayNames}</ul>
                        <p>Games</p>
                        <ul>{games}</ul>
                    </div>
                </div>
            </div>
        )
        return (render)
    }
    return (
        <>
            {loading ? <p>loading</p> 
            : error ? navigate('/404')
            : renderConnectCode(data)}
        </>
    )
}

export default ConnectCodeIndividual