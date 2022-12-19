import './info.css'
import Logo from '../../../../optionselectdb2-cropped.svg'
const Info = () => {
    const styles = {
        logo: {
            height: '25%',
            width: '25%'
        }
    }
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
                                        <p><img src={Logo}  style={styles.logo}/></p>
                                    </div>
                                    <div className="info-column-content">
                                        <p id="top-column-text">"An Option Select is a tactic in which a player takes advantage of certain input priority systems to cover multiple different scenarios at once from the same input." - Street Fighter Wiki</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row mid-banner">
                                <div className="col mid-banner-buffer">
                                    <p className="mid-banner-info">The Database</p>
                                </div>
                            </div>
                            <div className="row info-columns">
                                <div className="col-md-6 popout column-wrapper">
                                    <div className=' info-column '>
                                        <p className="info-column-head">Mission</p>
                                        <div className="info-column-content">
                                            <p>&emsp;I grew up playing fighting games with my friends, having a blast while executing combos and kicking ass. As I got older, my appreciation of these games grew and I wanted to improve my gameplay and results at local tournaments.</p>
                                            <p>&emsp;However, it's hard to get a sense of your holistic improvement as a player without data to back up your perceptions. Each game has its own UX that makes it difficult to compare data, if it even has that data in the first place.</p>
                                            <p>&emsp;My goal with the Option Select Database is to create a semi-centralized, open-source database for fighting game replays and analytics available through the web app or its API, starting with Super Smash Bros: Melee.</p>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-6 write-share-go">
                                    <div className='column-wrapper'>
                                        <div className="row info-write">
                                            <div className="col info-column popout">
                                                <p className="info-column-head">.slp Upload</p>
                                                <div className="info-column-content">
                                                    <p>&emsp;Upload your Slippi Melee files and allow for the server to parse and analyze your games using Slippi-JS</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row info-share">
                                            <div className="col info-column popout">
                                                <p className="info-column-head">Search</p>
                                                <div className="info-column-content">
                                                    <p>&emsp;Search individual Connect Codes, Display Names, and games or get a full list of everything. There's no red tape or secrets: if the file has it, the database has it too.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row info-go">
                                            <div className="col info-column popout">
                                                <p className="info-column-head">Analyze</p>
                                                <div className="info-column-content">
                                                    <p>&emsp;Analyze stats available through the Slippi Launcher with more options such as Head-to-Head matchups coming soon.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row mid-banner">
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
                                            <p id="tldr">&emsp;Upload your .slp files and search up whatever you want. The web app is in alpha currently so most of the files are my own. feel free to scrutinize my lack of improvement in 5 years of playing Melee!</p>
                                            <p id="tldr">&emsp;And check out the GitHub (https://github.com/joejhansen/option-select-db)</p>
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

export default Info