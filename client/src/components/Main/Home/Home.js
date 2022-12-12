import React, { useReducer, useState } from 'react'
import './Home.css'
// TODO: MAKE ACTIONS AND IMPORT THEM



const Home = ({ theme }) => {
    const styles = {
        container: {
            color: theme.text,
            minHeight: '100%'
        },
        text: {
            color: theme.text
        },
        row: {
            backgroundColor: theme.primary,
            margin: '1rem',
            borderRadius: '.25rem',
            boxShadow: '.25rem .25rem black'
        },
        header: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            text: {
                fontSize: '3rem',
                textAlign: 'center',
                margin: '0',
                color: theme.accent
            }
        },
        card: {
            backgroundColor: theme.secondary,
            color: theme.text,
            margin: '1rem',
            borderRadius: '.25rem',
        },
        cardHeader: {
            borderBottom: 'solid gray 2px',
            margin: '0 .5rem',
            text: {
                fontSize: '2rem',
                textAlign: 'center',
                margin: '0',
                color: theme.accent
            }
        },
        leftColumnWrapper: {
            borderRight: 'solid gray 2px',
        },
        leftColumn: {
            margin: '.25rem',

        }
    }
    return (
        <div className='container' style={styles.container}>
            <div className="row" style={styles.row}>
                <div className='col'>
                    <div className='row'>
                        <div className='col'>
                            <div className='card' style={styles.card}>
                                <div style={styles.header}>
                                    <p style={styles.header.text}>Welcome to the</p>
                                    <p style={styles.header.text}>Option Select Database</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className='card' style={styles.card}>
                                <div className='row'>
                                    <div className='col' style={styles.cardHeader}>
                                        <p style={styles.cardHeader.text}>Info Header</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6 leftColumn' >
                                        <div className='leftColumnWrapper'>
                                            <p>One column</p>
                                            <p>One column</p>
                                            <p>One column</p>
                                            <p>One column</p>
                                            <p>One column</p>
                                        </div>
                                    </div>
                                    <div className='col-md-6 rightColumn'>
                                        <div className='row rightColumnWrapper'>
                                            <div className='col-xl-6'>
                                                <p>two column top</p>
                                                <p>two column top</p>
                                                <p>two column top</p>
                                                <p>two column top</p>
                                                <p>two column top</p>
                                            </div>
                                            <div className='col-xl-6'>
                                                <p>two column bottom</p>
                                                <p>two column bottom</p>
                                                <p>two column bottom</p>
                                                <p>two column bottom</p>
                                                <p>two column bottom</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className='card' style={styles.card}>
                                <div className='row'>
                                    <div className='col-6'>
                                        <p>One column</p>
                                        <p>One column</p>
                                        <p>One column</p>
                                        <p>One column</p>
                                        <p>One column</p>
                                    </div>
                                    <div className='col-6'>
                                        <div className='row'>
                                            <div className='col-xl-6'>
                                                <p>two column top</p>
                                                <p>two column top</p>
                                                <p>two column top</p>
                                                <p>two column top</p>
                                                <p>two column top</p>
                                            </div>
                                            <div className='col-xl-6'>
                                                <p>two column bottom</p>
                                                <p>two column bottom</p>
                                                <p>two column bottom</p>
                                                <p>two column bottom</p>
                                                <p>two column bottom</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home