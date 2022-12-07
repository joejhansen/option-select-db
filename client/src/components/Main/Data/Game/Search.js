import AllConnectCodes from './All.js'
import { useEffect, useState } from "react"
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { QUERY_GAME_BY_ID, QUERY_GAME_FULL } from '../../../../utils/apollo/queries.js'



const GamesLanding = () => {
    const navigate = useNavigate()
    const [query, setQuery] = useState(``)
    const [getGame, { loading, error, data }] = useLazyQuery(QUERY_GAME_BY_ID, {
        variables: { id: query }
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
        await getGame()
        while (loading) {
            console.log(`loading`)
        }
        if (error || !data) {
            setNotFound(true)
            return console.log(`error! ${error}`)
        }
        setNotFound(false)
        return navigate(`/data/game/${data.gameById._id}`)
        // const { loading, data } = useQuery(QUERY_CONNECT_CODE_BY_CODE)

    }
    return (
        <>
            <p>Games Landing</p>
            <form type='submit' onSubmit={handleMakeQuery}>
                <input type="search" onChange={handleSetQuery} placeholder="Search by Game ID"></input>
                <button>search</button>
            </form>
            {notFound ? <p>Game not found!</p> : <></>}
            <Outlet />
        </>
    )
}

export default GamesLanding