import React, { useReducer, useState } from 'react'
// TODO: MAKE ACTIONS AND IMPORT THEM



const Home = ({ theme, setThemeHandler }) => {
    const styles = {
        container: {
            backgroundColor: theme.primary
        },
        text: {
            color: theme.text
        }
    }
    const renderThemeChange = () => {
        const options = []
        for (let i = 0; i < Object.keys(theme).length; i++) {
                options.push(<input type="text" id={Object.keys(theme)[i]} key={Object.keys(theme)[i]} placeholder={Object.keys(theme)[i]}></input>)
        }
        return options
    }
    return (
        <div className='container' style={styles.container}>
            <p style={styles.text}>Home</p>
            {/* <form className='d-flex flex-column' onSubmit={setThemeHandler}> */}
                {/* {renderThemeChange()} */}
                {/* <button>Submit Theme</button> */}
            {/* </form> */}
        </div>
    )
}

export default Home