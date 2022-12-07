import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_DISPLAY_NAME } from '../../../../utils/apollo/queries';

const DisplayNameIndividual = ({ theme }) => {
    let { id } = useParams();
    const { loading, data } = useQuery(QUERY_DISPLAY_NAME, {
        variables: { id: id },
    });
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
            <div className='row'>
                <div className="col">
                    <div className="card" style={styles.card}>
                        <p>{name.displayName}</p>
                        <p>Connect Codes</p>
                        <ul>{renderConnectCodes}</ul>
                    </div>
                </div>
            </div>

        )
        return render
    }
    return (
        <>
            {loading ? <p>loading</p> : renderDisplayName(data)}
        </>
    )
}

export default DisplayNameIndividual