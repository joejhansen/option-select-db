const { Schema, model } = require('mongoose');
const actionCountsSchema = new Schema({
    playerIndex: {
        type: Number
    },
    wavedashCount: {
        type: Number
    },
    wavelandCount: {
        type: Number
    },
    airDodgeCount: {
        type: Number
    },
    dashDanceCount: {
        type: Number
    },
    spotDodgeCount: {
        type: Number
    },
    ledgegrabCount: {
        type: Number
    },
    rollCount: {
        type: Number
    },
    lCancelCount: {
        success: {
            type: Number
        },
        fail: {
            type: Number
        }
    },
    attackCount: {
        jab1: {
            type: Number
        },
        jab2: {
            type: Number
        },
        jab3: {
            type: Number
        },
        jabm: {
            type: Number
        },
        dash: {
            type: Number
        },
        ftilt: {
            type: Number
        },
        utilt: {
            type: Number
        },
        dtilt: {
            type: Number
        },
        fsmash: {
            type: Number
        },
        usmash: {
            type: Number
        },
        dsmash: {
            type: Number
        },
        nair: {
            type: Number
        },
        fair: {
            type: Number
        },
        bair: {
            type: Number
        },
        uair: {
            type: Number
        },
        dair: {
            type: Number
        }
    },
    grabCount: {
        success: {
            type: Number
        },
        fail: {
            type: Number
        }
    },
    throwCount: {
        up: {
            type: Number
        },
        forward: {
            type: Number
        },
        back: {
            type: Number
        },
        down: {
            type: Number
        }
    },
    groundTechCount: {
        away: {
            type: Number
        },
        in: {
            type: Number
        },
        neutral: {
            type: Number
        },
        fail: {
            type: Number
        }
    },
    wallTechCount: {
        success: {
            type: Number
        },
        fail: {
            type: Number
        }
    }
})


module.exports = actionCountsSchema