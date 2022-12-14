import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_MATCHUP } from '../../../../utils/apollo/queries';
import { useEffect } from 'react';

const Head2Head = ({ theme }) => {
    let { id1, id2 } = useParams();

    const { loading, error, data } = useQuery(QUERY_MATCHUP, {
        variables: { id1: id1, id2: id2 },
    });

    useEffect(() => {

    }, [])
    return (
        <>
            {loading
                ? <p>loading</p>
                : error
                    ? <p>Error!</p>
                    : <p>{JSON.stringify(data)}</p>}
        </>
    )
}

export default Head2Head