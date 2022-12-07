import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;
export const QUERY_CONNECT_CODE = gql`
query Query($id: ID!) {
  codeIdById(_id: $id) {
    _id
    connectCode
    appUser
    userId
    displayNames {
      _id
      displayName
    }
    games {
      _id
      metadata {
        startAt
      }
    }
    createdAt
  }
}

`
export const QUERY_CONNECT_CODES = gql`
query CodeIds {
  codeIds {
    _id
    connectCode
    displayNames {
      _id
      displayName
    }
    userId
    games {
      _id
      metadata {
        startAt
      }
    }
    createdAt
    appUser
  }
}
`

export const QUERY_CONNECT_CODE_BY_CODE = gql`
query CodeIdByCode($connectCode: String!) {
  codeIdByCode(connectCode: $connectCode) {
    _id
  }
}`

export const QUERY_DISPLAY_NAME = gql`
query DisplayNameById($id: ID!) {
  displayNameById(_id: $id) {
    _id
    displayName
    codeIds {
      _id
      connectCode
    }
  }
}
`

export const QUERY_DISPLAY_NAMES = gql`
query DisplayNames {
  displayNames {
    _id
    displayName
    codeIds {
      connectCode
      _id
      appUser
      createdAt
      userId
    }
  }
}
`

export const QUERY_DISPLAY_NAME_BY_NAME = gql`
query DisplayNameByName($displayName: String!) {
  displayNameByName(displayName: $displayName) {
    _id
  }
}`

export const QUERY_GAMES_SIMPLE = gql`
query Query {
  games {
    _id
    displayNames {
      _id
      displayName
    }
    codeIds {
      _id
      connectCode
    }
    metadata {
      startAt
      lastFrame
      players {
        names {
          code
          netplay
        }
        characters
      }
      playedOn
    }
    createdAt
  }
}
`

export const QUERY_GAME_BY_ID = gql`
query GameById($id: ID!) {
  gameById(_id: $id) {
    _id
  }
}`

export const QUERY_GAME_FULL = gql`
query GameById($id: ID!) {
  gameById(_id: $id) {
    _id
    displayNames {
      displayName
      codeIds {
        connectCode
        appUser
        _id
        userId
        createdAt
      }
      _id
    }
    settings {
      slpVersion
      isTeams
      isPAL
      stageID
      players {
        playerIndex
        port
        characterId
        characterColor
        startStocks
        type
        teamId
        controllerFix
        nametag
        displayName
        connectCode
        userId
      }
    }
    metadata {
      startAt
      lastFrame
      players {
        names {
          netplay
          code
        }
        characters
      }
      playedOn
    }
    stats {
      lastFrame
      playableFrameCount
      stocks {
        playerIndex
        startFrame
        endFrame
        startPercent
        endPercent
        currentPercent
        count
        deathAnimation
      }
      conversions {
        playerIndex
        lastHitBy
        startFrame
        endFrame
        startPercent
        currentPercent
        endPercent
        moves {
          playerIndex
          frame
          moveId
          hitCount
          damage
        }
        didKill
        openingType
      }
      combos {
        playerIndex
        startFrame
        endFrame
        startPercent
        currentPercent
        endPercent
        didKill
        lastHitBy
      }
      actionCounts {
        playerIndex
        wavedashCount
        wavelandCount
        airDodgeCount
        dashDanceCount
        ledgegrabCount
        rollCount
        lCancelCount {
          success
          fail
        }
        attackCount {
          jab1
          jab2
          jab3
          jabm
          dash
          ftilt
          utilt
          dtilt
          fsmash
          usmash
          dsmash
          nair
          fair
          bair
          uair
          dair
        }
        grabCount {
          succes
          fail
        }
        throwCount {
          up
          forward
          back
          down
        }
        groundTechCount {
          away
          in
          neutral
          fail
        }
        wallTechCount {
          success
          fail
        }
      }
      overall {
        playerIndex
        inputCounts {
          buttons
          triggers
          cstick
          joystick
          total
        }
        conversionCount
        totalDamage
        killCount
        successfulConversions {
          count
          total
          ratio
        }
        inputsPerMinute {
          count
          total
          ratio
        }
        digitalInputsPerMinute {
          count
          total
          ratio
        }
        openingsPerKill {
          count
          total
          ratio
        }
        damagePerOpening {
          count
          total
          ratio
        }
        neutralWinRatio {
          count
          total
          ratio
        }
        counterHitRatio {
          count
          total
          ratio
        }
        beneficialTradeRatio {
          count
          total
          ratio
        }
      }
      gameComplete
    }
    winners {
      playerIndex
      position
    }
    createdAt
  }
}

`