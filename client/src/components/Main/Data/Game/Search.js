import AllConnectCodes from './All.js'
import { useEffect, useState } from "react"
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { QUERY_GAME_BY_ID, QUERY_GAME_FULL } from '../../../../utils/apollo/queries.js'



const GamesLanding = () => {
    const styles = {
        searchForm: {
            display: 'flex',
            justifyContent: 'center'
        }
    }
    const navigate = useNavigate()
    const [query, setQuery] = useState(``)
    const [getGame, { loading, error, data }] = useLazyQuery(QUERY_GAME_BY_ID, {
        variables: { 'id': query }
    })
    const [notFound, setNotFound] = useState(false)
    const handleSetQuery = (e) => {
        e.preventDefault()
        setQuery((e.target.value).trim())
    }
    const handleMakeQuery = async (e) => {
        setQuery((e.target.children[0].value).trim())
        e.preventDefault()
        if (!query) {
            return navigate('/data/game/all')
        }
        const exists = await getGame()
        if (error || !exists.data.gameById) {
            setNotFound(true)
            return
        }
        setNotFound(false)
        return navigate(`/data/game/${exists.data.gameById._id}`)
        // const { loading, data } = useQuery(QUERY_CONNECT_CODE_BY_CODE)

    }
    return (
        <>
            <form type='submit' onSubmit={handleMakeQuery} style={styles.searchForm}>
                <input type="search" onChange={handleSetQuery} placeholder="Search by Game ID"></input>
                <button>search</button>
            </form>
            {notFound ? <p>Game not found!</p> : <></>}
            <Outlet />
        </>
    )
}

export default GamesLanding