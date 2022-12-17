const KillsTable = ({ theme, data }) => {
    let killsStats = [[], []]
        // an array of two arrays. should be as many arrays as there are players but doubles isn't supported otherwise
        for (let conversion of game.stats.conversions) {
            // getting all of our kill conversions for kill stats
            if (conversion.didKill) {
                killsStats[conversion.lastHitBy].push({ start: conversion.startFrame, end: conversion.endFrame, killMove: conversion.moves.length ? conversion.moves[conversion.moves.length - 1] : `Error!`, direction: null, percent: Math.floor(conversion.currentPercent * 100) / 100, })
            }
        }
        let renderKillsStats = []
        // this converts # of frames played so far into a M:SS format.
        // melee is played on the nintendo gamecube or emulated environment thereof at 60 frames per second
        const renderMinutes = (frames) => {
            if (Math.floor(frames / 60) > 60) {
                let minutes = Math.floor((frames / 60) / 60)
                let seconds = Math.floor((frames / 60) % 60)
                if (seconds.toString().length === 1) {
                    seconds = `0${seconds}`
                }
                return `${minutes}:${seconds}`
            } else {
                return `0:${(Math.floor(frames / 60))}`
            }
        }
        // for each player, traditional for to keep track of index
        for (let i = 0; i < killsStats.length; i++) {
            const kills = killsStats[i]
            // get the display info
            const { displayName, display_id } = playerDisplayNames[i]
            const { connectCode, connect_id } = playerConnectCodes[i]
            // get the links
            const linkToDisplayName = linkToDisplayNames[i]
            const linkToConnectCode = linkToConnectCodes[i]
            // now we start to keep track of kills for the individual player
            const killRows = []
            for (let kill of kills) {
                // push the information in standard format. no need for wrapper div as in conversions since these won't be broken up
                killRows.push(<>
                    <div>{renderMinutes(kill.start)}</div>
                    <div>{renderMinutes(kill.end)}</div>
                    <div>{kill.killMove.moveId ? movesList[kill.killMove.moveId].name : 'Error!'}</div>
                    <div>{kill.percent}%</div>
                </>)
            }
            // this was the tricky part.
            // we have to conditionally style each table for the ammount of rows we render
            const tableOuterStyle = {

                display: 'grid',
                gridTemplate: `1fr ${killRows.length + 1}fr / 1fr`,
                // 1fr for the top title, killRows.length+1 for the total ammount of kills + data header in the sibling element
                height: 'max-content',
                padding: '0',
                margin: '0 1rem'
            }

            const tableDataOuterStyle = {

                display: 'grid',

                gridTemplate: `1fr ${killRows.length}fr / 1fr`
                // 1fr for the data header, killRows.length fr for the total ammount of rows in the sibling element
            }
            const tableDataHeaderStyle = {

                display: 'grid',
                gridTemplate: `1fr / repeat(4, 1fr)`
                // as many columns as data showsn.
                // see conversions row for shaping irregular columns
            }
            const tableDataBodyStyle = {

                display: 'grid',
                gridTemplate: `repeat(${killRows.length}, 1fr) / repeat(4, 1fr)`
                // repeate 1fr for each row we need, 4 columns
            }
            // all together now
            const killComponent =
                <div className="col" style={tableOuterStyle}>
                    <div><Link to={linkToConnectCode} style={styles.link}>{connectCode}</Link> as <Link to={linkToDisplayName} style={styles.link}>{displayName}</Link></div>
                    <div style={tableDataOuterStyle}>
                        <div style={tableDataHeaderStyle}>
                            <div>Start</div>
                            <div>End</div>
                            <div>Kill Move</div>
                            <div>Percent</div>
                        </div>
                        <div id="killsData" className="dataRows" style={tableDataBodyStyle}>
                            {killRows}
                        </div>
                    </div>
                </div>
            // push it real good
            renderKillsStats.push(killComponent)
        }
        return(
            <>
            
            </>
        )
}