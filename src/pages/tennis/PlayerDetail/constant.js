const headerStats = {
    "season": "Season",
    "type": "Type",
    "rank": "Rank",
    "titles": "Titles",
    "matches_won": "Matches won",
    "matches_lost": "Matches lost",
    "hard_won": "Hard won",
    "hard_lost": "Hard lost",
    "clay_won": "Clay won",
    "clay_lost": "Clay lost",
    "grass_won": "Grass won",
    "grass_lost": "Grass lost",
}

const headerSplit = {
    "duration": "Last X days",
    "for_score": "PS",
    "against_score": "PA",
    "for_score_set_1": "Set 1 Scored",
    "against_score_set_1": "Set 1 Allowed",
    "for_score_set_2": "Set 2 Scored",
    "against_score_set_2": "Set 2 Allowed",
    "for_score_set_3": "Set 3 Scored",
    "against_score_set_3": "Set 3 Allowed",
    "for_score_set_4": "Set 4 Scored",
    "against_score_set_4": "Set 4 Allowed",
    "for_score_set_5": "Set 5 Scored",
    "against_score_set_5": "Set 5 Allowed"
}

const header3Games = {
    "date": "Day",
    "winner2": "Home/Away",
    "for_score": "PS",
    "against_score": "PA",
    "for_score_set_1": "Set 1 Scored",
    "against_score_set_1": "Set 1 Allowed",
    "for_score_set_2": "Set 2 Scored",
    "against_score_set_2": "Set 2 Allowed",
    "for_score_set_3": "Set 3 Scored",
    "against_score_set_3": "Set 3 Allowed",
    "for_score_set_4": "Set 4 Scored",
    "against_score_set_4": "Set 4 Allowed",
    "for_score_set_5": "Set 5 Scored",
    "against_score_set_5": "Set 5 Allowed"
}

const team_detail = {
    'DEFAULT': {
        "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/WTA_logo_2010.svg/2560px-WTA_logo_2010.svg.png",
        "teamColoursHex": [
            "#002865",
            "#336699",
            "#000000",
            "#30ced8",
            "#ffffff"
        ],
        "stadium": "Chase Field",
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "Dbacks"
            }
        ]
    }
}

const links = [
    {
      label: "Last games",
      id: "#lastGames",
    },
    {
      label: "Splits",
      id: "#splits"
    },
    {
      label: "Stats",
      id: "#stats"
    },
    {
      label: "News",
      id: "#news"
    }
  ]

export default {
    headerStats,
    headerSplit,
    header3Games,
    team_detail,
    API: "10e1aa76ff72457385dd58b55a97a5e6",
    links
}