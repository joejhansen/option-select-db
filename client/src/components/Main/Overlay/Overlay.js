import { useState } from "react"
// import { redirect } from "react-router-dom"
import OverlaySettings from "./OverlaySettings"
const Overlay = ({ theme }) => {
    // const aspectRatios = ['4/3', 'fill', 'native', '16/9', '16/10', '73/60']
    const defaultOverlaySettings = {
        chroma: 'lightgray',
        ratio: 'native',
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
    let savedOverlaySettings = JSON.parse(localStorage.getItem('savedOverlaySettings'))
    if (!savedOverlaySettings) {
        localStorage.setItem('savedOverlaySettings', JSON.stringify(defaultOverlaySettings))
        savedOverlaySettings = defaultOverlaySettings
    }
    // TODO: Set up localstorage or indexedDB for overlay settings like chroma key and fonts
    const [overlaySettings, setSettings] = useState(savedOverlaySettings)
    const [ratio, setRatio] = useState(overlaySettings ? overlaySettings.ratio : '4/3')

    const getScreenDimension = () => {
        const width = window.screen.width;
        const height = window.screen.height;
        return width / height
    }
    const getViewportDimension = () => {
        const width = window.innerWidth
        const height = window.innerHeight
        return width / height
    }
    const convertRatio = (ratioSetting) => {
        switch (ratioSetting) {
            case 'fill':
                // this kinda works but has to be reset every time you resize the window
                return getViewportDimension()
            case 'native':
                // this works because the screen dimensions should always be static
                return getScreenDimension()
            default:
                return ratioSetting
        }
    }

    const handleSettingsChange = (newSettings) => {
        setSettings(newSettings)
        setRatio(newSettings.ratio)
        localStorage.setItem('savedOverlaySettings', JSON.stringify(newSettings))
    }

    const styles = {
        background: {
            backgroundColor: overlaySettings.theme.accent,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            maxHeight: '100vh',
            mindWidth: '100vh',
        },
        middleRow: {
            flex: '1 0 auto',
            maxHeight: '100%'
        },
        // TODO: fix 4/3 and other settings that break at fullscreen
        viewportSettings: {
            backgroundColor: overlaySettings.chroma,
            aspectRatio: convertRatio(ratio),
            display: 'block',
            // TODO: make logic to make this work correctly with the aspect ratio
            height: 'auto',
            width: '100%',
            boxSizing: 'border-box',
            outline: 'dashed red 2px',
        },
        viewportWrapper: {
            display: 'flex',
            alignSelf: 'center',
            justifyContent: 'center',
            padding: '0'
            // maxHeight: 'inherit'
        },
        componentContainer: {
            backgroundColor: overlaySettings.theme.primary,
            color: overlaySettings.theme.text
        },
        componentInner: {
            backgroundColor: overlaySettings.theme.secondary
        },
        overlayRow: {
            maxHeight: '100vh'
        }

    }


    // const overlaySettings = settings ? settings : {
    //     settings: {
    //         something: 'else'
    //     }
    // }


    return (
        <>
            <div className="row" style={styles.overlayRow}>
                <div className="col" style={styles.background}>
                    {overlaySettings.header
                        ?
                        <div className="row" style={styles.componentContainer}>
                            {overlaySettings.headerSettings.map((column, index) => {
                                return (
                                    <div className="col" key={index} id={`heeader${index + 1}`} style={styles.componentInner}>
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
                            <div className="col-2" style={styles.componentContainer}>
                                <div style={styles.middleCol}>
                                    {
                                        overlaySettings.leftBarSettings.map((row, index) => {
                                            return (
                                                <div className="row" key={index} id={`leftBar${index + 1}`} style={styles.componentInner}>
                                                    <div className="col">
                                                        <p>{row.title}</p>
                                                        <p>{row.text}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            : <></>
                        }
                        <div className="col" style={styles.viewportWrapper}>
                            <div id="viewport" className="" style={styles.viewportSettings}>
                            </div>
                        </div>
                        {overlaySettings.rightBar
                            ?
                            <div className="col-2" style={styles.componentContainer}>
                                {
                                    overlaySettings.rightBarSettings.map((row, index) => {
                                        return (
                                            <div className="row" key={index} id={`rightBar${index + 1}`} style={styles.componentInner}>
                                                <div className="col">
                                                    <p>{row.title}</p>
                                                    <p>{row.text}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            : <></>
                        }
                    </div>
                    {overlaySettings.footer
                        ?
                        <div className="row" style={styles.componentContainer}>
                            {overlaySettings.footerSettings.map((column, index) => {
                                return (
                                    <div className="col" key={index} id={`footer${index + 1}`} style={styles.componentInner}>
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
            <OverlaySettings overlaySettings={overlaySettings} theme={theme} handleSettingsChange={handleSettingsChange} />
        </>
    )
}

export default Overlay