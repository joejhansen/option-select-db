import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_MATCHUP } from '../../../../utils/apollo/queries';
import { useEffect } from 'react';

const Head2Head = ({ theme }) => {
    let { id1, id2 } = useParams();
    const navigate = useNavigate()

    const { loading, error, data } = useQuery(QUERY_MATCHUP, {
        variables: { id1: id1, id2: id2 },
    });

    useEffect(() => {

    }, [])

    const renderH2H = (data) => {
        const codeRegex = /^([A-Z]{1,4})\-(\d{1,3})$/i
        let player1, player2
        if (id1.match(codeRegex) && id2.match(codeRegex)) {
            player1 = id1.replace(/-/g, '#')
            player2 = id2.replace(/-/g, '#')
        } else {
            if (data.matchup[0].codeIds[0]._id === id1) {
                player1 = data.matchup[0].codeIds[0].connectCode
                player2 = data.matchup[0].codeIds[1].connectCode
            } else {
                player1 = data.matchup[0].codeIds[1].connectCode
                player2 = data.matchup[0].codeIds[0].connectCode

            }
        }
        let playersInfo = {}
        playersInfo[player1] = []
        playersInfo[player2] = []
        for (let game of data.matchup) {
            // The player index can change for each game, but the data is normalized to that index within the game
            let player1Index, player2Index
            if (game.settings.players[0].connectCode === player1) {
                player1Index = 0
                player2Index = 1
            } else {
                player1Index = 1
                player2Index = 0
            }
            playersInfo[player1].push(game.stats.overall[player1Index])
            playersInfo[player2].push(game.stats.overall[player2Index])
        }
        let playersInfoAvg = {}
        playersInfoAvg[player1] = {
            beneficialTradeRatio: [],
            conversionCount: [],
            counterHitRatio: [],
            damagePerOpening: [],
            digitalInputsPerMinute: [],
            inputCounts: [],
            inputsPerMinute: [],
            killCount: [],
            neutralWinRatio: [],
            openingsPerKill: [],
            successfulConversions: [],
            totalDamage: []
        }
        playersInfoAvg[player2] = {
            beneficialTradeRatio: [],
            conversionCount: [],
            counterHitRatio: [],
            damagePerOpening: [],
            digitalInputsPerMinute: [],
            inputCounts: [],
            inputsPerMinute: [],
            killCount: [],
            neutralWinRatio: [],
            openingsPerKill: [],
            successfulConversions: [],
            totalDamage: []
        }
        console.log(playersInfoAvg)
        for (let stats of playersInfo[player1]) {
            // playersInfoAvg[player1].push()
            playersInfoAvg[player1].beneficialTradeRatio.push(stats.beneficialTradeRatio)
            playersInfoAvg[player1].conversionCount.push(stats.conversionCount)
            playersInfoAvg[player1].counterHitRatio.push(stats.counterHitRatio)
            playersInfoAvg[player1].damagePerOpening.push(stats.damagePerOpening)
            playersInfoAvg[player1].digitalInputsPerMinute.push(stats.digitalInputsPerMinute)
            playersInfoAvg[player1].inputCounts.push(stats.inputCounts)
            playersInfoAvg[player1].inputsPerMinute.push(stats.inputsPerMinute)
            playersInfoAvg[player1].killCount.push(stats.killCount)
            playersInfoAvg[player1].neutralWinRatio.push(stats.neutralWinRatio)
            playersInfoAvg[player1].openingsPerKill.push(stats.openingsPerKill)
            playersInfoAvg[player1].successfulConversions.push(stats.successfulConversions)
            playersInfoAvg[player1].totalDamage.push(stats.totalDamage)
        }
        for (let stats of playersInfo[player2]) {
            // playersInfoAvg[player1].push()
            playersInfoAvg[player2].beneficialTradeRatio.push(stats.beneficialTradeRatio)
            playersInfoAvg[player2].conversionCount.push(stats.conversionCount)
            playersInfoAvg[player2].counterHitRatio.push(stats.counterHitRatio)
            playersInfoAvg[player2].damagePerOpening.push(stats.damagePerOpening)
            playersInfoAvg[player2].digitalInputsPerMinute.push(stats.digitalInputsPerMinute)
            playersInfoAvg[player2].inputCounts.push(stats.inputCounts)
            playersInfoAvg[player2].inputsPerMinute.push(stats.inputsPerMinute)
            playersInfoAvg[player2].killCount.push(stats.killCount)
            playersInfoAvg[player2].neutralWinRatio.push(stats.neutralWinRatio)
            playersInfoAvg[player2].openingsPerKill.push(stats.openingsPerKill)
            playersInfoAvg[player2].successfulConversions.push(stats.successfulConversions)
            playersInfoAvg[player2].totalDamage.push(stats.totalDamage)
        }
        console.log(playersInfoAvg[player1])
        return (
            <>
                <p>{player1} vs {player2}</p>
                <ul>{player1} stats:
                    <li>
                        Average Conversions = {playersInfoAvg[player1].conversionCount.reduce((a, v) => {
                            return (a + v)
                        }) / playersInfo[player1].length}
                    </li>
                    <li>
                        Average Damage Per Opening = {playersInfoAvg[player1].damagePerOpening.reduce((a, v) => {
                            return a+v.ratio
                        }, 0)}
                    </li>
                </ul>
                <ul>{player2} stats:
                    <li>Average Conversions = {playersInfoAvg[player2].conversionCount.reduce((a, v) => {
                        return (a + v)
                    }) / playersInfo[player2].length}</li>
                </ul>
            </>
        )
    }

    return (
        <>
            {loading
                ? <p>loading</p>
                : error || !data.matchup.length
                    ? navigate('/404')
                    : renderH2H(data)}
        </>
    )
}

export default Head2Head