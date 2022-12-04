import { Outlet } from "react-router-dom"

const Data = ({ theme }) => {

    return (
        <div className="container">
            <p>Data</p>
            <Outlet />
        </div>
    )
}

export default Data