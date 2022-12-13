import './About.css'
const About = () => {
    return (
        <div id="pageWrapper" className='container-fluid'>
            <div id="info-section" className="row">
                <div id="info-buffer" className="col">
                    <div id="info-slate" className="row">
                        <div id="info-main" className="col">
                            {/* <div className="row info-columns">
                                <div className="col info-column popout">

                                    <div className="info-column-head">
                                        <p>The Platform</p>
                                    </div>
                                    <div className="info-column-content">
                                        <p id="top-column-text">Find out what powers Option Select Database</p>
                                    </div>
                                </div>
                            </div> */}

                            <div className="row mid-banner">
                                <div className="col mid-banner-buffer">
                                    <p className="mid-banner-info">Slippi Melee</p>
                                </div>
                            </div>
                            <div className="row info-columns">
                                <div className="col-md-6 write-share-go">
                                    <div className='column-wrapper'>
                                        <div className="row info-write">
                                            <div className="col info-column popout">
                                                <p className="info-column-head">Slippi-JS</p>
                                                <div className="info-column-content">
                                                    <p>&emsp;Option Select parses .slp files with Slippi-JS and formats them into a searchable model</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row info-share">
                                            <div className="col info-column popout">
                                                <p className="info-column-head">React/Express</p>
                                                <div className="info-column-content">
                                                    <p>&emsp;Smoothly nagivate the site using React Router and upload files with Multer and Express.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row info-go">
                                            <div className="col info-column popout">
                                                <p className="info-column-head">ApolloGQL</p>
                                                <div className="info-column-content">
                                                    <p>&emsp;Connect from anywhere for anything using a URI key.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 popout column-wrapper">
                                    <div className=' info-column '>
                                        <p className="info-column-head">Special Thanks</p>
                                        <div className="info-column-content">
                                            <p>&emsp;Option Select is built with the MERN stack but would not be possible let alone conceivable without the dedicated work of Jas "Fizzi" Laferriere, Vince Au, Nikhil "Nikki" Narayana, and all the other contributors to Slippi-JS.</p>
                                            <br />
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div className="row mid-banner">
                                <div className="col mid-banner-buffer">
                                    <p className="mid-banner-info">Expanding Functionality</p>
                                </div>
                            </div>
                            <div className="row info-columns">
                                <div className="col-md-6 popout column-wrapper">
                                    <div className=' info-column '>
                                        <p className="info-column-head">The FGC</p>
                                        <div className="info-column-content">
                                            <p>&emsp;If this can be done with a 20 year old game, who's to say it can't be done for the latest releases and their own legacy titles?</p>
                                            <p>&emsp;</p>
                                            <p>&emsp;</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 write-share-go">
                                    <div className='column-wrapper'>
                                        <div className="row info-write">
                                            <div className="col info-column popout">
                                                <p className="info-column-head">Any Game</p>
                                                <div className="info-column-content">
                                                    <p>&emsp;Street Fighter, Tekken, Killer Instinct, BlazBlue, hopefully one day even Dive Kick.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row info-share">
                                            <div className="col info-column popout">
                                                <p className="info-column-head">Anywhere</p>
                                                <div className="info-column-content">
                                                    <p>&emsp;Use the API to search for anything, anywhere, anytime</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row info-go">
                                            <div className="col info-column popout">
                                                <p className="info-column-head">Anyone</p>
                                                <div className="info-column-content">
                                                    <p>&emsp;No secrets, no red tape, no freemium bullshit. This app wouldn't be possible without the work of people a lot smarter than myself. If the information is there, you should have access to it.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {/* <div className="row mid-banner">
                                <div className="col mid-banner-buffer">
                                    <p className="mid-banner-info">TL;DR</p>
                                </div>
                            </div>
                            <div className='column-wrapper'>

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
                            </div> */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About