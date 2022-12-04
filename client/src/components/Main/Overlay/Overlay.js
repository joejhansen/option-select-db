import { useEffect, useState } from "react"
// import { redirect } from "react-router-dom"
import OverlaySettings from "./OverlaySettings"
const Overlay = ({ theme }) => {
    // const aspectRatios = ['4/3', 'fill', 'native', '16/9', '16/10', '73/60']
    const defaultOverlaySettings = {
        chroma: 'lightgray',
        ratio: '16/9',
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
    const [viewPort, setViewPort] = useState({ width: 0, height: 0, })

    useEffect(() => {
        const viewWrapper = document.getElementById('viewWrapper')
        const resizeObserver = new ResizeObserver(async (viewWrapper, observer) => {
            const dimensions = { height: viewWrapper[0].borderBoxSize[0].blockSize, width: viewWrapper[0].borderBoxSize[0].inlineSize }
            if (JSON.stringify(viewPort) === JSON.stringify(dimensions)) {
                return null
            }
            // console.log({new: dimensions, old: viewPort})
            return setViewPort(dimensions)
        })
        resizeObserver.observe(viewWrapper)
    })
    const getScreenDimension = () => {
        const width = window.screen.width;
        const height = window.screen.height;
        return width / height
    }
    // TODO: dig a hole and bury myself
    // TODO: get useState for viewportheight and width on load, then change them on viewport change

    const convertRatio = (ratioSetting) => {
        switch (ratioSetting) {
            case 'fill':
                // this kinda works but has to be reset every time you resize the window
                return 'fill'
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

    // DO NOT UNDER ANY CIRCUMSTANCES CHANGE THIS
    // I WILL BLOCK YOU IF YOU SUBMIT AN ISSUE ON THESE TWO FUNCTIONS
    // THIS TOOK HOURS
    const handleViewPortWidth = (ratio) => {
        if (ratio === 'fill' || typeof ratio === 'number') {
            return '1fr'
        }
        const { width, height } = viewPort
        const ratioWidth = parseInt(ratio.split('/')[0])
        const ratioHeight = parseInt(ratio.split('/')[1])
        const desiredSize = `${(height * ratioWidth) / ratioHeight}px`
        return desiredSize
    }
    const handleViewPortHeight = (ratio) => {
        if (ratio === 'fill' || typeof ratio === 'number') {
            return '1fr'
        }
        // It works! kinda
        const { width, height } = viewPort
        const ratioWidth = parseInt(ratio.split('/')[0])
        const ratioHeight = parseInt(ratio.split('/')[1])
        const desiredSize = `${(width * ratioHeight) / ratioWidth}px`

        return desiredSize
    }
    // https://cssgridgarden.com/
    const styles = {
        background: {
            backgroundColor: overlaySettings.theme.accent,
            display: 'grid',
            // minHeight: '100vh',
            height: '100vh',
            width: '100vw',
        },
        middleRow: {
            // display: 'flex',
            // flex
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
            // maxHeight: '100vh'
        },
        headerFooter: {},
        gridBackground: {
            display: 'grid',
            gridTemplate: "1fr/1fr",
            height: '100vh',
            backgroundColor: overlaySettings.theme.accent,
            padding: '0'
        },
        gridRows: {
            display: 'grid',
            gridTemplate: "10% 1fr 10% / 1fr",
            outline: ''
        },
        gridHeader: {
            backgroundColor: overlaySettings.theme.secondary,
            // padding: '0'
        },
        gridFooter: {
            backgroundColor: overlaySettings.theme.secondary,
        },
        gridMiddle: {
            display: 'grid',
            gridTemplate: '1fr / 10% 1fr 10%'
        },
        gridRightBar: {
            backgroundColor: overlaySettings.theme.secondary,
        },
        gridLeftBar: {
            backgroundColor: overlaySettings.theme.secondary,
        },
        gridViewWrapper: {
            display: 'grid',
            // handleViewPortHeight()
            // handleViewPortWidth()
            // gridTemplate: `auto ${handleViewPortHeight(convertRatio(ratio))} auto / auto ${handleViewPortWidth(convertRatio(ratio))} auto`
            gridTemplate: `auto ${handleViewPortHeight(convertRatio(ratio))} auto/auto ${handleViewPortWidth(convertRatio(ratio))} auto`,
            maxHeight: `100%`,
            overflow: 'hidden',
            // gridTemplate: "auto auto auto/auto 1fr auto",
        },
        gridViewPort: {
            backgroundColor: overlaySettings.chroma,
            // overflow: 'hidden'
            // width: '100%',
            // maxHeight: '100%'
            // wdith: '100%'
        },
        gridBackgroundNew: {
            display: 'grid',
            gridTemplate: "10% 1fr 10%/10% 1fr 10%",
            minHeight: '100vh',
            maxHeight: '100vh',
            backgroundColor: overlaySettings.theme.accent,
            padding: '0'
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
                <div style={styles.gridBackgroundNew}>
                    {/* header */}
                    <div style={styles.gridHeader}></div>
                    <div style={styles.gridHeader}></div>
                    <div style={styles.gridHeader}></div>
                    {/* middle */}
                    <div style={styles.gridLeftBar}></div>
                    <div id="viewWrapper" style={styles.gridViewWrapper}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div style={styles.gridViewPort}></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div style={styles.gridRightBar}></div>
                    {/* footer */}
                    <div style={styles.gridFooter}></div>
                    <div style={styles.gridFooter}></div>
                    <div style={styles.gridFooter}></div>
                </div>
                {/* <div style={styles.gridBackground}>
                    <div style={styles.gridRows}>
                        <div style={styles.gridHeader}></div>
                        <div style={styles.gridMiddle}>
                            <div style={styles.gridRightBar}></div>
                            <div style={styles.gridViewWrapper}>
                                <div style={styles.gridViewPort}>
                                    
                                </div>
                            </div>
                            <div style={styles.gridRightBar}></div>
                        </div>
                        <div style={styles.gridFooter}></div>
                    </div>
                </div> */}
                {/* overlay with flex. don't do this */}
                {/* <div className="col" style={styles.background}>
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
                </div> */}
            </div>
            <div className="row">
                <OverlaySettings overlaySettings={overlaySettings} theme={theme} handleSettingsChange={handleSettingsChange} />
            </div>

        </>
    )
}

export default Overlay