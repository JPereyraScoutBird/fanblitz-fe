const headerHittingStats = {
    "season": "Season",
    "ops": "OPS",
    "batter_slugging_percentage": "SLG",
    "batter_on_base_percentage": "OBP",
    "batting_average": "AVG",
    "at_bats": "AB",
    "runs": "R",
    "hits": "H",
    "second_based_hits": "2B",
    "third_base_hits": "3B",
    "homeruns": "HR",
    "runs_batted_in": "RBI",
    "batter_walks": "BB",
    "batter_strike_outs": "SO",
    "stolen_bases": "SB"
}

const headerStats = {
    "season": "Season",
    "wins": "W",
    "losses": "L",
    "pts_per_game": "PTS",
    "reb_per_game": "REB",
    "ast_per_game": "AST",
    "blk_per_game": "BLK",
    "stl_per_game": "STL",
    "tov_per_game": "TOV",
    "fg_att": "FG ATT",
    "fg_made": "FG M",
    'ft_att': 'FT ATT',
    'ft_made': 'FT M',
    'def_reb': 'DEF REB',
    'off_reb': 'OFF REB',
    'plus_minus_per_game': '+/-'
}


const headerHittingSplit = {
    "duration": "Last X days",
    "at_bats": "AB",
    "runs": "R",
    "hits": "H",
    "homeruns": "HR",
    "runs_batted_in": "RBI",
    "batter_walks": "BB",
    "batter_strike_outs": "SO",
    "stolen_bases": "SB",
    "batting_average": "AVG",
    "batter_on_base_percentage": "OBP",
    "batter_slugging_percentage": "SLG"
}

const headeSplit = {
    "duration": "Last X days",
    "wins": "W",
    "losses": "L",
    "pts": "PTS",
    "reb": "REB",
    "ast": "AST",
    "blk": "BLK",
    "stl": "STL",
    "tov": "TOV",
    "fg_att": "FG ATT",
    "fg_made": "FG M",
    'ft_att': 'FT ATT',
    'ft_made': 'FT M',
    'def_reb': 'DEF REB',
    'off_reb': 'OFF REB',
    'plus_minus': '+/-'
}

const headerHitting3Games = {
    "start_time": "Day",
    "at_bats": "AB",
    "runs": "R",
    "hits": "H",
    "homeruns": "HR",
    "runs_batted_in": "RBI",
    "batter_walks": "BB",
    "batter_strike_outs": "SO",
    "batting_average": "AVG",
    "batter_on_base_percentage": "OBP",
    "batter_slugging_percentage": "SLG",
    // "stolen_bases": "OPS"
}

const header3Games = {
    "start_time": "Day",
    "wins": "W",
    "losses": "L",
    "pts": "PTS",
    "reb": "REB",
    "ast": "AST",
    "blk": "BLK",
    "stl": "STL",
    "tov": "TOV",
    "fg_att": "FG ATT",
    "fg_made": "FG M",
    'ft_att': 'FT ATT',
    'ft_made': 'FT M',
    'def_reb': 'DEF REB',
    'off_reb': 'OFF REB',
    'plus_minus': '+/-'
}


const team_detail = {
    'ABILCH': {
        "img": "https://www.mlbstatic.com/team-logos/109.svg",
        "teamColoursHex": [
            "#a71930",
            "#e3d4ad",
            "#000000",
            "#30ced8",
            "#ffffff"
        ],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "Dbacks"
            }
        ]
    },
    'JACKST': {
        "img": "https://www.mlbstatic.com/team-logos/144.svg",
        "teamColoursHex": [],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "Braves"
            }
        ],
    },
    "BAL": {
        "img": "https://www.mlbstatic.com/team-logos/110.svg",
        "teamColoursHex": [
            "#df4601",
            "#000000"
        ],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "Orioles"
            }
        ],
    },
    "BOS": {
        "img": "https://www.mlbstatic.com/team-logos/111.svg",
        "teamColoursHex": [
            "#0c2340",
            "#bd3039",
        ],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "RedSox"
            }
        ],
    },
    "CHC": {
        "teamColoursHex": [
            "#0e3386",
            "#cc3433"
        ],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "Cubs"
            }
        ],
        "img": "https://www.mlbstatic.com/team-logos/112.svg"
    },
    "CWS": {
        "teamColoursHex": [
            "#27251f",
            "#c4ced4"
        ],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "whitesox"
            }
        ],
        "img": "https://www.mlbstatic.com/team-logos/145.svg"
    },
    "CIN": {
        "teamColoursHex": [
            "#c6011f",
            "#000000"
        ],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "Reds"
            }
        ],
        "img": "https://www.mlbstatic.com/team-logos/113.svg"
    },
    "CLE": {
        "teamColoursHex": [
            "#0c2340",
            "#e31937"
        ],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "Indians"
            }
        ],
        "img": "https://www.mlbstatic.com/team-logos/114.svg"
    },
    "COL": {
        "teamColoursHex": [
            "#33006f",
            "#c4ced4",
            "#000000"
        ],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "Rockies"
            }
        ],
        "img": "https://www.mlbstatic.com/team-logos/115.svg"
    },
    "DET": {
        "teamColoursHex": [
            "#0c2340",
            "#fa4616"
        ],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "tigers"
            }
        ],
        "img": "https://www.mlbstatic.com/team-logos/116.svg"
    },
    "HOU": {
        "teamColoursHex": [],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "astros"
            }
        ],
        "img": "https://www.mlbstatic.com/team-logos/117.svg"
    },
    "KC": {
        "teamColoursHex": [
            "#004687",
            "#bd9b60"
        ],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "Royals"
            }
        ],
        "img": "https://www.mlbstatic.com/team-logos/118.svg"
    },
    "LAA": {
        "teamColoursHex": [
            "#ba0021",
            "#003263",
            "#862633",
            "#c4ced4",
            "#ffffff"
        ],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "Angels"
            }
        ],
        "img": "https://www.mlbstatic.com/team-logos/108.svg"
    },
    "LAD": {
        "teamColoursHex": [
            '#005a9c',
            '#e71d35'
        ],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "Dodgers"
            }
        ],
        "img": "https://www.mlbstatic.com/team-logos/119.svg"
    },
    "MIA": {
        "teamColoursHex": [
            "#00a3e0",
            "#ef3340",
            "#41748d",
            "#000000"
        ],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "Marlins"
            }
        ],
        "img": "https://www.mlbstatic.com/team-logos/146.svg"
    },
    "MIL": {
        "teamColoursHex": [],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "Brewers"
            }
        ],
        "img": "https://www.mlbstatic.com/team-logos/158.svg"
    },
    "MIN": {
        "teamColoursHex": [],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "Twins"
            }
        ],
        "img": "https://www.mlbstatic.com/team-logos/142.svg"
    },
    "NYM": {
        "teamColoursHex": [
            "#002d72",
            "#ff5910",
        ],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "Mets"
            }
        ],
        "img": "https://www.mlbstatic.com/team-logos/121.svg"
    },
    "NYY": {
        "teamColoursHex": [
            "#003087",
            "#e4002c",
            "#0c2340"
        ],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "Yankees"
            }
        ],
        "img": "https://www.mlbstatic.com/team-logos/147.svg"
    },
    "OAK": {
        "teamColoursHex": [],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "Athletics"
            }
        ],
        "img": "https://www.mlbstatic.com/team-logos/133.svg"
    },
    "PHI": {
        "teamColoursHex": [
            "#e81828",
            "#002d72"
        ],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "Phillies"
            }
        ],
        "img": "https://www.mlbstatic.com/team-logos/143.svg"
    },
    "PIT": {
        "teamColoursHex": [
            "#27251f",
            "#fdb827"
        ],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "Pirates"
            }
        ],
        "img": "https://www.mlbstatic.com/team-logos/134.svg"
    },
    "SD": {
        "teamColoursHex": [
            "#002d62",
            "#a2aaad"
        ],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "Padres"
            }
        ],
        "img": "https://www.mlbstatic.com/team-logos/135.svg"
    },
    "SF": {
        "teamColoursHex": [
            "#27251f",
            "#fd5a1e",
            "#efd19f",
            "#ae8f6f"
        ],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "SFGiants"
            }
        ],
        "img": "https://www.mlbstatic.com/team-logos/137.svg"
    },
    "SEA": {
        "teamColoursHex": [
            "#0c2c56",
            "#005c5c",
            "#c4ced4",
            "#d50032"
        ],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "Mariners"
            }
        ],
        "img": "https://www.mlbstatic.com/team-logos/136.svg"
    },
    "STL": {
        "teamColoursHex": [],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "Cardinals"
            }
        ],
        "img": "https://www.mlbstatic.com/team-logos/138.svg"
    },
    "TB": {
        "teamColoursHex": [
            "#092c5c",
            "#8fbce6",
            "#f5d130"
        ],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "RaysBaseball"
            }
        ],
        "img": "https://www.mlbstatic.com/team-logos/139.svg"
    },
    "TEX": {
        "teamColoursHex": [
            "#003278",
            "#c0111f"
        ],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "Rangers"
            }
        ],
        "img": "https://www.mlbstatic.com/team-logos/140.svg"
    },
    "TOR": {
        "teamColoursHex": [
            "#134a8e",
            "#e8291c",
            "#1d2d5c",
        ],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "BlueJays"
            }
        ],
        "img": "https://www.mlbstatic.com/team-logos/141.svg"
    },
    "WAS": {
        "teamColoursHex": [
            '#ab0003',
            '#14225A'
        ],
        "socialMediaAccounts": [
            {
                "mediaType": "TWITTER",
                "value": "Nationals"
            }
        ],
        "img": 'https://www.mlbstatic.com/team-logos/120.svg'
    },

}

const headerHittingRanking = {
    "season": "Season",
    "hits": "H",
    "second_based_hits": "2B",
    "third_base_hits": "3B",
    "homeruns": "HR",
    "runs": "R",
    "runs_batted_in": "RBI",
    "batter_walks": "BB",
    "stolen_bases": "SB",
    "batter_strike_outs": "SO",
    "batting_average": "AVG",
    "batter_on_base_percentage": "OBP",
    "batter_slugging_percentage": "SLG",
    "ops": "OPS"
}

const headerPitchingRanking = {
    "season": "Season",
    "wins": "W",
    "earned_run_agerage": "ERA",
    "homeruns_allowed": "HR",
    "runs_allowed": "R",
    "earned_runs_allowed": "ER",
    "pitching_average": "AVG",
    "pitcher_strikeouts": "SO",
}

const headerNextGames = {
    "date_et": "Date",
    "home_team": "Home",
    "away_team": "Away",
    "home_score": "Home Score",
    "away_score": "Away Score"
}

const headerLastGames = {
    "date_et": "Date",
    "home_team": "Home",
    "away_team": "Away",
    "home_score": "Home Score",
    "away_score": "Away Score",
    "home_spreads_draftkings": "Vegas",
    "margin_spread_fanblitz": "BlizBot",
}

const headerLeader = {
    "feature": "Stats",
    "full_name": "Player",
    "position": "Position",
    "value": "Value"
}

const headerPlayer = {
    "image": "Image",
    "full_name": "Player",
    "birth_date": "Birth date",
    "position": "Position",
    "weight": "Weight",
    "height": "Height",
}

const links = [
    {
      label: "Last 3 Games",
      id: "#lastGames"
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
        label: "Players",
        id: "#players"
    },
    {
        label: "Past Predictions",
        id: "#pastGames"
    },
    {
        label: "News",
        id: "#news"
    }
  ]

export default {
    headerHittingStats,
    headerStats,
    headerHittingSplit,
    headeSplit,
    team_detail,
    headerHitting3Games,
    header3Games,
    API: "10e1aa76ff72457385dd58b55a97a5e6",
    headerHittingRanking,
    headerPitchingRanking,
    headerNextGames,
    headerLeader,
    headerPlayer,
    headerLastGames,
    links
}