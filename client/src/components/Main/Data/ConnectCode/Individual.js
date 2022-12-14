import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_CONNECT_CODE } from '../../../../utils/apollo/queries';

const ConnectCodeIndividual = ({ theme }) => {
    let { id } = useParams();
    // IF YOU WANT TO USE A POUND # IN A URL
    // IT MUST BE %23 APPARENTLY
    // ANNOYING
    const { loading, error, data } = useQuery(QUERY_CONNECT_CODE, {
        variables: { id: id },
    });
    const navigate = useNavigate()
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
        entryWrapper: {
            padding: '.5rem'
        },
        link: {
            textDecoration: 'none',
            color: theme.accent
        },
        gameScroll: {
            maxHeight: '20rem',
            overflow: 'auto'
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
            const localDate = date.toLocaleDateString()
            const localTime = date.toLocaleTimeString()
            games.push(<li>Played on <Link to={linkTo} style={styles.link}>{localDate} at {localTime}</Link></li>)
        }
        render.push(
            <div className='container'>
                <div className='row'>
                    <div className="col">
                        <div className="card" style={styles.card}>
                            <div style={styles.entryWrapper}>
                                <p>{data.codeIdById.connectCode}</p>
                                <p>{data.codeIdById.createdAt}</p>
                                <p>Display Names</p>
                                <ul>{displayNames}</ul>
                                <p>Games</p>
                                <ul style={styles.gameScroll}>{games}</ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        return (render)
    }
    return (
        <>
            {loading
                ? <p>loading</p>
                : error || !data.codeIdById
                    ? navigate('/404')
                    : renderConnectCode(data)
            }
        </>
    )
}

export default ConnectCodeIndividual