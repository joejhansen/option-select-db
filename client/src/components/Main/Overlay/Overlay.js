import { useState } from "react"
import { redirect } from "react-router-dom"
import OverlaySettings from "./OverlaySettings"
const Overlay = ({ settings, theme }) => {
    const defaultOverlaySettings = {
        chroma: 'lightgray',
        aspectRatios: ['4/3', 'fill', 'native', '16/9', '16/10', '73/60'],
        ratio: '4/3',
        header: true,
        headerSettings: [
            {
                title: 'Header',
                text: 'this is a header',
            },
        ],
        leftBar: true,
        leftBarSettings: [
            {
                title: 'Left Bar',
                text: 'this is a left bar',
            }
        ],
        rightBar: true,
        rightBarSettings: [
            {
                title: 'Right Bar',
                text: 'this is a right bar',
            }
        ],
        footer: true,
        footerSettings: [
            {
                title: 'Footer',
                text: 'this is a footer',
            },
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
    const [ratio, changeRatio] = useState(
        overlaySettings ? overlaySettings.ratio : '4/3'
    )
    const getScreenDimension = () => {
        const width = window.screen.width;
        const height = window.screen.height;
        return width / height
    }

    const convertRatio = (ratioSetting) => {
        switch (ratioSetting) {
            case 'fill':
                return 'auto'
            case 'native':
                return getScreenDimension()
            default:
                return ratioSetting
        }
    }

    const handleSettingsChange = (e) => {
        e.preventDefault()
        switch (e.target.id) {
            case '':

                break;

            default:
                break;
        }

    }

    const styles = {
        background: {
            backgroundColor: overlaySettings ? overlaySettings.chroma : 'lightgray',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            mindWidth: '100vh',
        },
        middleRow: {
            flex: '1 0 auto'
        },
        rightCol: {
            display: 'flex',
            justifyContent: 'flex-end'
        },
        viewportSettings: {
            display: 'flex',
            alignSelf: 'center',
            justifyContent: 'center',
            aspectRatio: ratio,
            outline: 'dashed red 2px',
        },
        viewportWrapper: {
            // height: '100%'
        }
    }


    // const overlaySettings = settings ? settings : {
    //     settings: {
    //         something: 'else'
    //     }
    // }

    return (
        <>
            <div className="row">
                <div className="col" style={styles.background}>
                    {overlaySettings.header
                        ?
                        <div className="row">
                            {overlaySettings.headerSettings.map((column) => {
                                return (
                                    <div className="col">
                                        <p>{column.title}</p>
                                        <p>{column.text}</p>
                                    </div>
                                )
                            })}
                        </div>
                        : <></>
                    }
                    <div className="row" style={styles.middleRow}>
                        {overlaySettings.leftBar
                            ?
                            <div className="col">
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
                            : <></>
                        }
                        <div className="col align-items-center" style={styles.viewportWrapper}>
                            <div id="viewport" className="" style={styles.viewportSettings}>
                            </div>
                        </div>
                        {overlaySettings.rightBar
                            ?
                            <div className="col">
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
                                    <div className="col">
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
            <OverlaySettings />
        </>
    )
}

export default Overlay