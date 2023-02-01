import React, { useReducer, useState } from 'react'

// TODO: add links and light/dark theme changer

const Footer = ({ theme, page }) => {

    const styles = {
        container: {
            backgroundColor: theme.primary,
            color: theme.text
        },
        link: {
            textDecoration: 'none',
            color: theme.accent
        },
    }
    return (
        <footer className='container-fluid' style={styles.container}>
            <div className='row d-flex justify-content-center'>
                <div className='col-5 d-flex justify-content-around'>
                    <a style={styles.link} href='https://github.com/joejhansen/option-select-db'>Project GitHub</a>
                    <a style={styles.link} href='#'>To Top</a>
                    <a style={styles.link} href='https://github.com/joejhansen'>Developer GitHub</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer