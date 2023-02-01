import React, { useReducer, useState } from 'react'
import './Home.css'
import Info from './Info/Info'


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
                <Info theme={theme}/>

    )
}

export default Home