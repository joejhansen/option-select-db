import React from 'react'

// TODO: Make this a sidebar because that'd be slick
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
        }
    }
    return (
        <>
            <header className='container-fluid' style={styles.container}>
                <div className='row' style={styles.headerWrapper}>
                    <div className='col-md-4 d-flex justify-content-center'>
                        {/* TODO: Make the connect Option Select svg logo */}
                        <h1>Option Select</h1>
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