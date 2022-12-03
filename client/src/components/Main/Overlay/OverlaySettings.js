import { useState } from "react"

const OverlaySettings = ({ overlaySettings, theme, handleSettingsChange }) => {
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
    const [numHeader, setNumHeader] = useState(overlaySettings.headerSettings.length)

    const [useFooter, setFooter] = useState(overlaySettings.footer)
    const [numFooter, setNumFooter] = useState(overlaySettings.footerSettings.length)

    const [useLeftBar, setLeftBar] = useState(overlaySettings.leftBar)
    const [numLeftBar, setNumLeftBar] = useState(overlaySettings.leftBarSettings.length)

    const [useRightBar, setRightBar] = useState(overlaySettings.rightBar)
    const [numRightBar, setNumRightBar] = useState(overlaySettings.rightBarSettings.length)

    const renderNumComponents = ({ numComponents, component, componentSettings }) => {
        let render = []
        for (let i = 0; i < numComponents; i++) {
            render.push(
                <div className="col-auto">
                    <label htmlFor="theme" className="form-label">Title</label>
                    <div className="mb-3">
                        <input type="text" className="form-control" id={`title${component}${i + 1}`} name={`${component}Title`} defaultValue={componentSettings[i] ? componentSettings[i].title : ``} />
                    </div>
                    <label htmlFor="theme" className="form-label">Text</label>
                    <div className="mb-3">
                        <input type="text" className="form-control" id={`text${component}${i + 1}`} name={`${component}Text`} defaultValue={componentSettings[i] ? componentSettings[i].text : ``} />
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
        if (e.target.value === '# of Divs') {
            return
        }
        const number = parseInt(e.target.value)
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
        // TODO: add the name attribute so this actually works
        // use formdata to make it easy to refactor if needed
        const formData = new FormData(e.target)
        const values = [...formData.entries()]

        const chroma = formData.get(`chroma`)

        const ratio = formData.get(`ratio`)

        let themePrimary = formData.get(`themePrimary`).trim()
        let themeSecondary = formData.get(`themeSecondary`).trim()
        let themeTertiary = formData.get(`themeTertiary`).trim()
        let themeAccent = formData.get(`themeAccent`).trim()
        let themeText = formData.get(`themeText`).trim()
        console.log(themeText)
        if (!themePrimary) {
            themePrimary = '#303134'
        }
        if (!themeSecondary) {
            themeSecondary = `#202124`
        }
        if (!themeTertiary) {
            themeTertiary = `#303134`
        }
        if (!themeAccent) {
            themeAccent = `#F88A8A`
        }
        if (!themeText) {
            themeText = `#BDC1C6`
        }
        const newTheme = {
            primary: themePrimary,
            secondary: themeSecondary,
            tertiary: themeTertiary,
            accent: themeAccent,
            text: themeText,
        }
        const headerTitles = formData.getAll('headerTitle')
        const headerTexts = formData.getAll(`headerText`)
        let headerSettings = []
        for (let i = 0; i < numHeader; i++) {
            headerSettings.push({ title: headerTitles[i], text: headerTexts[i] })
        }
        const leftBarTitles = formData.getAll(`leftBarTitle`)
        const leftBarTexts = formData.getAll(`leftBarText`)
        let leftBarSettings = []
        for (let i = 0; i < numLeftBar; i++) {
            leftBarSettings.push({ title: leftBarTitles[i], text: leftBarTexts[i] })
        }

        const rightBarTitles = formData.getAll(`rightBarTitle`)
        const rightBarTexts = formData.getAll(`rightBarText`)
        let rightBarSettings = []
        for (let i = 0; i < numRightBar; i++) {
            rightBarSettings.push({ title: rightBarTitles[i], text: rightBarTexts[i] })
        }

        const footerTitles = formData.getAll(`footerTitle`)
        const footerTexts = formData.getAll(`footerText`)
        let footerSettings = []
        for (let i = 0; i < numFooter; i++) {
            footerSettings.push({ title: footerTitles[i], text: footerTexts[i] })
        }
        const newSettings = {
            chroma: chroma,
            header: useHeader,
            headerSettings: headerSettings,
            leftBar: useLeftBar,
            leftBarSettings: leftBarSettings,
            rightBar: useRightBar,
            rightBarSettings: rightBarSettings,
            footer: useFooter,
            footerSettings: footerSettings,
            ratio: ratio,
            theme: newTheme,
        }
        console.log(newSettings)
        console.log(overlaySettings)
        handleSettingsChange(newSettings)
        // console.table({ headerSettings: headerSettings, leftBarSettings: leftBarSettings, rightBarSettings: rightBarSettings, footerSettings: footerSettings })
        return
        // setSettings(newSettings)
    }


    // Look on my Works, ye Mighty, and despair!
    return (
        <form style={styles.container} onSubmit={handleSubmit} name='overlay settings'>
            <div className="row">
                <label htmlFor="chroma and theme" className="form-label">Colors and Theme</label>

                <div className="col">
                    <div className="mb-3">
                        <label htmlFor="chroma" className="form-label">Chroma Color</label>
                        <input type="text" className="form-control" id="chroma" name='chroma' aria-describedby="chroma" defaultValue={overlaySettings.chroma} />
                        <div id="chroma" className="form-text">This will be used to set the background color of the overlay</div>
                    </div>
                    <select className="form-select" aria-label="Default select example" id="ratio" name="ratio">
                        <option>Ratio</option>
                        <option value="4/3">4/3</option>
                        <option value="73/60">73/60</option>
                        <option value="16/9">16/9</option>
                        <option value="16/10">16/10</option>
                        <option value="native">native</option>
                        <option value="fill">fill</option>
                    </select>
                </div>
                <div className="col">
                    <label htmlFor="theme" className="form-label">Theme</label>

                    <div className="mb-3">
                        <input type="text" className="form-control" id="primary" name="themePrimary" placeholder="primary" defaultValue={overlaySettings.theme.primary} />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="secondary" name="themeSecondary" placeholder="secondary" defaultValue={overlaySettings.theme.secondary} />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="tertiary" name="themeTertiary" placeholder="tertiary" defaultValue={overlaySettings.theme.tertiary} />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="accent" name="themeAccent" placeholder="accent" defaultValue={overlaySettings.theme.accent} />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="text" name="themeText" placeholder="text" defaultValue={overlaySettings.theme.text} />
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
                                            {renderNumComponents({ numComponents: numHeader, component: 'header', componentSettings: overlaySettings.headerSettings })}
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
                                            {renderNumComponents({ numComponents: numLeftBar, component: 'leftBar', componentSettings: overlaySettings.leftBarSettings })}

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
                                            {renderNumComponents({ numComponents: numRightBar, component: 'rightBar', componentSettings: overlaySettings.rightBarSettings })}
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
                                            {renderNumComponents({ numComponents: numFooter, component: 'footer', componentSettings: overlaySettings.footerSettings })}
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