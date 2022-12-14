import AllConnectCodes from './All.js'
import { useEffect, useState } from "react"
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { QUERY_CONNECT_CODE_BY_CODE, QUERY_DISPLAY_NAME_BY_NAME } from '../../../../utils/apollo/queries.js'



const ConnectCodesLanding = () => {
   const styles = {
      searchForm: {
         display: 'flex',
         justifyContent: 'center'
      }
   }
   const navigate = useNavigate()
   const [query, setQuery] = useState(``)
   const [getConnectCode, { loading, error, data }] = useLazyQuery(QUERY_CONNECT_CODE_BY_CODE, {
      variables: { 'connectCode': query }
   })
   const [notFound, setNotFound] = useState(false)
   const handleSetQuery = (e) => {
      e.preventDefault()
      setQuery((e.target.value).trim())
   }
   const handleMakeQuery = async (e) => {
      e.preventDefault()
      setQuery((e.target.children[0].value).trim())
      if (!query) {
         return navigate('/data/connectcode/all')
      }
      const exists = await getConnectCode()
      if (error || !exists.data.codeIdByCode) {
         setNotFound(true)
         return
      }
      setNotFound(false)
      const codeIdLink = query.replace('#','-')
      return navigate(`/data/connectcode/${codeIdLink}`)
      // const { loading, data } = useQuery(QUERY_CONNECT_CODE_BY_CODE)

   }
   return (
      <div className='row'>
         <div className='col'>
            <div className='row'>

               <div className='col-12'>
                  <form type='submit' onSubmit={handleMakeQuery} style={styles.searchForm}>
                     <input type="search" onChange={handleSetQuery} placeholder="Searchy by Connect Code"></input>
                     <button>search</button>
                  </form>
               </div>
            </div>
            {notFound ? <p>Connect Code Not Found!</p> : <></>}
            <div className='row'>
               <div className='col'>
                  <Outlet />
               </div>
            </div>
         </div>
      </div>
   )
}

export default ConnectCodesLanding