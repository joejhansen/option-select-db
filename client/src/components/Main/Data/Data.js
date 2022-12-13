import { Outlet, NavLink } from "react-router-dom"

// TODO: ADD LEADERBOARDS FOR STUFF LIKE # GAMES PLAYED, TOTAL DAMAGE TAKEN/GIVEN, LOWEST OPENING/KILL RATIO, ETC

const Data = ({ theme }) => {
    const styles = {
        ul: {
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignSelf: 'center',
            padding: '0',
            // color: theme ? theme.text : 'black',
        },
        active: {
            color: theme.accent,
            textDecoration: 'none',
            backgroundColor: theme.primary,
            padding: '.5rem',
            borderRadius: '.25rem',
            boxShadow: 'inset -.2rem .2rem 0 0'
        },
        inactive: {
            color: theme.text,
            textDecoration: 'none',
        },
        dataWrappe: {
            padding: '0',
        },
        navWrapper: {
            margin: '1rem 0'
        }
    }
    return (
        <div className="container-fluid" style={styles.dataWrappe}>
            <div className="row">
                <div className="col" style={styles.navWrapper}>
                    <ul style={styles.ul}>
                        <li>
                            <NavLink
                                style={({ isActive }) => {
                                    return (
                                        isActive
                                            ? styles.active
                                            : styles.inactive
                                    )
                                }}
                                to={`/data/connectcode`}>
                                Connect Codes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                style={({ isActive }) => {
                                    return (
                                        isActive
                                            ? styles.active
                                            : styles.inactive
                                    )
                                }}
                                to={`/data/displayname`}>
                                Display Names
                            </NavLink>

                        </li>
                        <li>
                            <NavLink
                                style={({ isActive }) => {
                                    return (
                                        isActive
                                            ? styles.active
                                            : styles.inactive
                                    )
                                }}
                                to={`/data/game`}>
                                Games
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                style={({ isActive }) => {
                                    return (
                                        isActive
                                            ? styles.active
                                            : styles.inactive
                                    )
                                }}
                                to={`/data/upload`}>
                                Upload
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Data