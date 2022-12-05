const { Schema, model } = require('mongoose');
const ActionCounts = require('./ActionCounts')
const Combo = require('./Combo')
const Conversion = require('./Conversion')
const OverallStats = require('./OverallStats')
const Stock = require('./Stock')
// DONE I THINK
const gameStatsSchema = new Schema(
    {
        lastFrame: {
            type: Number
        },
        playableFrameCount: {
            type: Number
        },
        stocks: [Stock],
        conversions: [Conversion],
        combos: [Combo],
        actionCounts: [ActionCounts],
        overall: [OverallStats],
        gameComplete: {
            type: Boolean
        }
    }

)


module.exports = gameStatsSchema