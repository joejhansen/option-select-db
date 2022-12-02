import { useState } from "react"
import { redirect } from "react-router-dom"

const Overlay = ({ settings, theme }) => {
    const defaultOverlaySettings = {
        chroma: 'lightgray',
        aspectRatios: ['4/3', '100vw/100vh', '16/9', '16/10', '73/60'],
        ratio: '4/3',
        header: true,
        headerSettings: [
            {
                height: '',
                width: '',
                title: 'Header',
                text: 'this is a header',
            },
            {
                height: '',
                width: '',
                title: 'Header',
                text: 'this is a header',
            },
        ],
        footer: true,
        footerSettings: [
            {
                height: '',
                width: '',
                title: 'Footer',
                text: 'this is a footer',
            }
        ],
        leftBar: true,
        leftBarSettings: [
            {
                height: '',
                width: '',
                title: 'Left Bar',
                text: 'this is a left bar',
            }
        ],
        rightBar: true,
        rightBarSettings: [
            {
                height: '',
                width: '',
                title: 'Right Bar',
                text: 'this is a right bar',
            }
        ],

        theme: theme ? theme : {
            primary: '',
            secondary: '',
            tertiary: '',
            accent: '',
            text: '',
        }
    }
    // TODO: Set up localstorage or indexedDB for overlay settings like chroma key and fonts
    const [overlaySettings, changeSettings] = useState(
        settings ? settings : defaultOverlaySettings
    )
    const styles = {
        background: {
            backgroundColor: overlaySettings ? overlaySettings.chroma : 'lightgray',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            mindWidth: '100vh',
        },
        middle: {
            flex: '1 0 auto'
        },
    }
    // const overlaySettings = settings ? settings : {
    //     settings: {
    //         something: 'else'
    //     }
    // }

    return (
        <div className="row">
            <div className="col" style={styles.background}>
                {overlaySettings.header
                    ?
                    <div className="row">
                        {overlaySettings.headerSettings.map((column) => {
                            return (
                                <div className="col-auto">
                                    <p>{column.title}</p>
                                    <p>{column.text}</p>
                                </div>
                            )
                        })}
                    </div>
                    :<></>
                }
                <div className="row" style={styles.middle}>
                    {overlaySettings.leftBar
                        ?
                        <div className="col-auto">
                            {
                                overlaySettings.leftBarSettings.map((row) => {
                                    return (
                                        <>
                                            <p>{row.title}</p>
                                            <p>{row.text}</p>
                                        </>
                                    )
                                })
                            }
                        </div>
                        :<></>
                    }
                    <div className="col-auto">
                        <p>Title</p>
                        <p>text</p>
                    </div>
                    {overlaySettings.rightBar
                        ?
                        <div className="col-auto">
                            {
                                overlaySettings.rightBarSettings.map((row) => {
                                    return (
                                        <>
                                            <p>{row.title}</p>
                                            <p>{row.text}</p>
                                        </>
                                    )
                                })
                            }
                        </div>
                        : <></>
                    }
                </div>
                {overlaySettings.footer
                    ?
                    <div className="row">
                        {overlaySettings.footerSettings.map((column) => {
                            return (
                                <div className="col-auto">
                                    <p>{column.title}</p>
                                    <p>{column.text}</p>
                                </div>
                            )
                        })}
                    </div>
                    :
                    <></>
                }
            </div>
        </div>
    )
}

export default Overlay