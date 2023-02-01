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
            <div className='row'>
                <div className='col'>
                    <div className='d-flex align-self-center justify-content-center'>
                        <a style={styles.link} href='#'>To Top</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer