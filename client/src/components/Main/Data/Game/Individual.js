import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_GAME_FULL } from "../../../../utils/apollo/queries";

const GameIndividual = () => {
    let { id } = useParams();
    const { loading, data } = useQuery(QUERY_GAME_FULL, {
        variables: { id: id },
    });
    return (
        <>
            {loading ? <p>loading</p> : <p>{JSON.stringify(data, null, 2)}</p>}
        </>
    )
}

export default GameIndividual