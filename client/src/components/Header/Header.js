import React from 'react'
import Logo from '../../optionselectdb2-cropped.svg'

// TODO: Make this a sidebar with an animation or something like that because that'd be slick
const Header = ({ children, theme }) => {

    // const [state, dispatch] = useReducer(reducer, initialState)

    const styles = {
        container: {
            backgroundColor: theme.primary,
            color: theme.text
        },
        navWrapper: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        headerWrapper: {
            margin: '.5rem'
        },
        logo: {
            display: 'flex',
            height: '70%',
            width: '50%',
            alignSelf: 'center'
        }
    }
    return (
        <>
            <header className='container-fluid' style={styles.container}>
                <div className='row' style={styles.headerWrapper}>
                    <div className='col-md-4 d-flex justify-content-center'>
                        {/* TODO: Make the connect Option Select svg logo */}
                        <img src={Logo} style={styles.logo} alt='The Option Select Databse Logo in Choral Pink' />
                    </div>
                    <div className='col-md-8' style={styles.navWrapper}>
                        {children}
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header