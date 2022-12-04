import { Outlet } from "react-router-dom"
import SlippiConnect from "./SlippiConnection"


const Settings = ({ theme, children }) => {
    const response = {
        _id: "1234567",
        username: 'Joe',
        email: 'joe@joehansen.com',
        codeIds: ['123', '234', '345', '456'],
        createdAt: Date.now()
    }

    const styles = {
        outline: {
            outline: 'dashed red 2px'
        },
        settingsMenu: {
            outline: 'dashed red 2px'
        },
        userInfo: {
            outline: 'dashed red 2px'
        },
        menuOption: {
            outline: 'dashed red 2px'
        }
    }
    const { _id, username, email, codeIds, createdAt } = response

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="row" style={styles.settingsMenu}>
                        <div className='col-3'>
                            <div className='row'>
                                <div className='col-12' style={styles.userInfo}>
                                    {username}
                                </div>
                                <div className='col-12' style={styles.menuOption}>
                                    <ul>
                                        <li>User Preferences</li>
                                        <li>Slippi Connection</li>
                                        <li>Code IDs</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='col-9'>
                            <div className='row'>
                                <div className='col-12'>Menu Title</div>
                                <div className='col-12'>
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings