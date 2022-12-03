import { useState } from "react"

const OverlaySettings = ({ overlaySettings, theme, setSettings }) => {
    const defaultOverlaySettings = {
        chroma: 'lightgray',
        aspectRatios: ['4/3', 'fill', 'native', '16/9', '16/10', '73/60'],
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

    const styles = {
        container: {
            backgroundColor: theme.primary,
            color: theme.text
        }
    }

    const [useHeader, setHeader] = useState(overlaySettings.header)
    const [numHead, setNumHeader] = useState(overlaySettings.headerSettings.length)

    const [useFooter, setFooter] = useState(overlaySettings.footer)
    const [numFooter, setNumFooter] = useState(overlaySettings.footerSettings.length)

    const [useLeftBar, setLeftBar] = useState(overlaySettings.leftBar)
    const [numLeftBar, setNumLeftBar] = useState(overlaySettings.leftBarSettings.length)

    const [useRightBar, setRightBar] = useState(overlaySettings.rightBar)
    const [numRightBar, setNumRightBar] = useState(overlaySettings.rightBarSettings.length)

    const handleNumComponentsRender = (numComponent) => {
        let render = []
        for (let i = 0; i < numComponent; i++) {
            render.push(
                <div className="col">
                    <label htmlFor="theme" className="form-label">Title</label>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="titleHeader1" />
                    </div>
                    <label htmlFor="theme" className="form-label">Text</label>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="textHeader1" />
                    </div>
                </div>
            )
        }
        return render
    }

    const handleComponentUse = (e) => {
        // do not preventDefault() or else the visual check won't work properly
        switch (e.target.id) {
            case 'header':
                return setHeader(!useHeader)
            case 'footer':
                return setFooter(!useFooter)
            case 'leftBar':
                return setLeftBar(!useLeftBar)
            case 'rightBar':
                return setRightBar(!useRightBar)
            default:
                break;
        }
    }
    const handleInnerComponentNum = (e) => {
        const number = parseInt(e.target.value)
        if (typeof number !== 'number') {
            return
        }
        switch (e.target.id) {
            case 'numsHeader':
                setNumHeader(number)
                return
            case 'numsLeftBar':
                setNumLeftBar(number)
                return
            case 'numsRightBar':
                setNumRightBar(number)
                return
            case 'numsFooter':
                setNumFooter(number)
                return
            default:
                break
        }

    }
    // this'll be a doozy
    const handleSubmit = (e) => {
        e.preventDefault()
        const primary = e.target
        let newSettings = {}
        return
    }


    // Look on my Works, ye Mighty, and despair!
    return (
        <form style={styles.container}>
            <div className="row">
                <label htmlFor="chroma and theme" className="form-label">Colors and Theme</label>

                <div className="col">
                    <div className="mb-3">
                        <label htmlFor="chroma" className="form-label">Chroma Color</label>
                        <input type="email" className="form-control" id="chroma" aria-describedby="chroma" />
                        <div id="chroma" className="form-text">This will be used to set the background color of the overlay</div>
                    </div>
                </div>
                <div className="col">
                    <label htmlFor="theme" className="form-label">Theme</label>

                    <div className="mb-3">
                        <input type="text" className="form-control" id="primary" placeholder="primary" />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="secondary" placeholder="secondary" />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="tertiary" placeholder="tertiary" />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="accent" placeholder="accent" />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="text" placeholder="text" />
                    </div>
                </div>
            </div>
            <div className="mb-3 form-check">
                <div className="row">
                    <div className="col">
                        <label className="form-check-label" htmlFor="component options">Component Options</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <label className="form-check-label" htmlFor="header">Use Header</label>
                                <input type="checkbox" className="form-check-input" id="header" onChange={handleComponentUse} checked={useHeader ? true : false} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                {useHeader
                                    ? <>
                                        <select className="form-select" aria-label="Default select example" id="numsHeader" onChange={handleInnerComponentNum}>
                                            <option ># of Divs</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                        <div className="row">
                                            {handleNumComponentsRender(numHead)}
                                        </div>
                                    </>
                                    : <p className="form-text" htmlFor="header">Header Not Selected</p>}
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <label className="form-check-label" htmlFor="leftBar">Use Left Bar</label>
                                <input type="checkbox" className="form-check-input" id="leftBar" onChange={handleComponentUse} checked={useLeftBar ? true : false} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                {useLeftBar
                                    ? <>
                                        <select className="form-select" aria-label="Default select example" id="numsLeftBar" onChange={handleInnerComponentNum}>
                                            <option ># of Divs</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                        <div className="row">
                                            {handleNumComponentsRender(numLeftBar)}

                                        </div>
                                    </>
                                    : <p className="form-text" htmlFor="leftBar">LeftBar Not Selected</p>}
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <label className="form-check-label" htmlFor="rightBar">Use Right Bar</label>
                                <input type="checkbox" className="form-check-input" id="rightBar" onChange={handleComponentUse} checked={useRightBar ? true : false} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                {useRightBar
                                    ? <>
                                        <select className="form-select" aria-label="Default select example" id="numsRightBar" onChange={handleInnerComponentNum}>
                                            <option ># of Divs</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                        <div className="row">
                                            {handleNumComponentsRender(numRightBar)}
                                        </div>
                                    </>
                                    : <p className="form-text" htmlFor="rightBar">RightBar Not Selected</p>}
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <label className="form-check-label" htmlFor="footer">Use Footer</label>
                                <input type="checkbox" className="form-check-input" id="footer" onChange={handleComponentUse} checked={useFooter ? true : false} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                {useFooter
                                    ? <>
                                        <select className="form-select" aria-label="Default select example" id="numsFooter" onChange={handleInnerComponentNum}>
                                            <option># of Divs</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                        <div className="row">
                                            {handleNumComponentsRender(numFooter)}
                                        </div>
                                    </>
                                    : <p className="form-text" htmlFor="footer">Footer Not Selected</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default OverlaySettings