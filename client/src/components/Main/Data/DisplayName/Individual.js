import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_DISPLAY_NAME } from '../../../../utils/apollo/queries';

const DisplayNameIndividual = ({ theme }) => {
    let { id } = useParams();
    const { loading, error, data } = useQuery(QUERY_DISPLAY_NAME, {
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
        }
    }
    const renderDisplayName = (data) => {
        const name = data.displayNameById
        let render = []
        const linkToDisplayName = `../${name._id}`
        const renderConnectCodes = []
        for (let code of name.codeIds) {
            const linkToConnectCode = `../../connectcode/${code._id}`
            renderConnectCodes.push(<li><Link to={linkToConnectCode} style={styles.link}>{code.connectCode}</Link></li>)
        }
        render.push(
            <div className='container'>
                <div className='row'>
                    <div className="col">
                        <div className="card" style={styles.card}>
                            <div style={styles.entryWrapper}>
                                <p>{name.displayName}</p>
                                <p>Connect Codes</p>
                                <ul>{renderConnectCodes}</ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        return render
    }
    return (
        <>
            {loading
                ? <p>loading</p>
                : error || !data.displayNameById
                    ? navigate('/404')
                    : renderDisplayName(data)}
        </>
    )
}

export default DisplayNameIndividual