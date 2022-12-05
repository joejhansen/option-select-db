const { Schema, model } = require('mongoose');
const overallStatsSchema = new Schema({
    playerIndex: {
        type: Number
    },
    inputCounts: {
        buttons: {
            type: Number
        },
        triggers: {
            type: Number
        },
        cstick: {
            type: Number
        },
        joystick: {
            type: Number
        },
        total: {
            type: Number
        }
    },
    conversionCount: {
        type: Number
    },
    totalDamage: {
        type: Number
    },
    killCount: {
        type: Number
    },
    successfulConversions: {
        count: {
            type: Number
        },
        total: {
            type: Number
        },
        ratio: {
            type: Number
        }
    },
    inputsPerMinute: {
        count: {
            type: Number
        },
        total: {
            type: Number
        },
        ratio: {
            type: Number
        }
    },
    digitalInputsPerMinute: {
        count: {
            type: Number
        },
        total: {
            type: Number
        },
        ratio: {
            type: Number
        }
    },
    openingsPerKill: {
        count: {
            type: Number
        },
        total: {
            type: Number
        },
        ratio: {
            type: Number
        }
    },
    damagePerOpening: {
        count: {
            type: Number
        },
        total: {
            type: Number
        },
        ratio: {
            type: Number
        }
    },
    neutralWinRatio: {
        count: {
            type: Number
        },
        total: {
            type: Number
        },
        ratio: {
            type: Number
        }
    },
    counterHitRatio: {
        count: {
            type: Number
        },
        total: {
            type: Number
        },
        ratio: {
            type: Number
        }
    },
    beneficialTradeRatio: {
        count: {
            type: Number
        },
        total: {
            type: Number
        },
        ratio: {
            type: Number
        }
    }
})


module.exports = overallStatsSchema