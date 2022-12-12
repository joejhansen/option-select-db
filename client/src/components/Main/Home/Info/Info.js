import './info.css'
const Info = () => {
    return (
        <div id="pageWrapper" className='container-fluid'>
            <div id="info-section" className="row">
                <div id="info-buffer" className="col">
                    <div id="info-slate" className="row">
                        <div id="info-main" className="col">
                            <div className="row info-columns">
                                <div className="col info-column popout">
                                    <div className="info-column-head">
                                        <p>Welcome to</p>
                                        <p>Option Select</p>
                                    </div>
                                    <div className="info-column-content">
                                        <p id="top-column-text">logline</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row mid-banner">
                                <div className="col mid-banner-buffer">
                                    <p className="mid-banner-info">The Database</p>
                                </div>
                            </div>
                            <div className="row info-columns">
                                <div className="col info-column popout">
                                    <p className="info-column-head">Mission</p>
                                    <div className="info-column-content">
                                        <p>&emsp;</p>
                                        <br />
                                    </div>
                                </div>
                                <div className="col write-share-go">
                                    <div className="row info-write">
                                        <div className="col info-column popout">
                                            <p className="info-column-head">Upload</p>
                                            <div className="info-column-content">
                                                <p>&emsp;</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row info-share">
                                        <div className="col info-column popout">
                                            <p className="info-column-head">Search</p>
                                            <div className="info-column-content">
                                                <p>&emsp;</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row info-go">
                                        <div className="col info-column popout">
                                            <p className="info-column-head">Analyze</p>
                                            <div className="info-column-content">
                                                <p>&emsp;</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="row mid-banner">
                                <div className="col mid-banner-buffer">
                                    <p className="mid-banner-info">Current Functionality</p>
                                </div>
                            </div>
                            <div className="row info-columns">
                                <div className="col write-share-go">
                                    <div className="row info-write">
                                        <div className="col info-column popout">
                                            <p className="info-column-head">Slippi Melee</p>
                                            <div className="info-column-content">
                                                <p>&emsp;</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row info-share">
                                        <div className="col info-column popout">
                                            <p className="info-column-head"></p>
                                            <div className="info-column-content">
                                                <p>&emsp;</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row info-go">
                                        <div className="col info-column popout">
                                            <p className="info-column-head">Upload and Analyze</p>
                                            <div className="info-column-content">
                                                <p>&emsp;</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col info-column popout">
                                    <p className="info-column-head">How You Can Help</p>
                                    <div className="info-column-content">
                                        <p>&emsp;</p>
                                    </div>
                                </div>
    </div> */}
                            <div className="row mid-banner">
                                <div className="col mid-banner-buffer">
                                    <p className="mid-banner-info">TL;DR</p>
                                </div>
                            </div>
                            <div className="row info-columns">
                                <div className="col info-column popout">
                                    <div className="info-column-head">
                                        <p>Upload and Test It Out</p>
                                    </div>
                                    <div className="info-column-content">
                                        <p></p>
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

export default Info