import React, { useReducer, useState } from 'react'

// TODO: add links and light/dark theme changer

const Footer = ({ theme, page }) => {

    const styles = {
        container: {
            backgroundColor: theme.primary,
            color: theme.text
        }
    }
    return (
        <footer className='container-fluid' style={styles.container}>
            <div className='row'>
                <div className='col'>
                    <div className='d-flex align-self-center justify-content-center'>
                        <p>Footer</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer