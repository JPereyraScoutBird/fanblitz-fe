import PATH_LIST from './constant';
import Pages from '../pages';
import { loader as newsLoader,}  from '../pages/mlb/PlayerDetail';

const routeList = (sport) => [
    {
      path: `/${sport}${PATH_LIST.PLAYER}`,
      element: <Pages.mlb.Players />,
    },
    {
      path: `/${sport}${PATH_LIST.PLAYER_DETAIL}/:playerId`,
      element: <Pages.mlb.PlayerDetail />,
    },
    {
      path: `/${sport}${PATH_LIST.TEAM}`,
      element: <Pages.mlb.Team />,
    },
    {
      path: `/${sport}${PATH_LIST.TEAM_DETAIL}`,
      element: <Pages.mlb.TeamDetail />,
    },
    {
      path: `/${sport}${PATH_LIST.NEWS}`,
      element: <Pages.mlb.News />,
    },
    {
      path: `/${sport}${PATH_LIST.FORECAST}`,
      element: <Pages.mlb.Forecasts />,
    },
    {
      path: `/${sport}${PATH_LIST.FORECAST_DETAIL}/:teams/:date`,
      element: <Pages.mlb.ForecastDetail />,
      loader: newsLoader
    },
    {
      path: `/${sport}${PATH_LIST.SOCIAL_BETS}`,
      element: <Pages.mlb.SocialBets />,
    },
    {
      path: `/${sport}${PATH_LIST.TUTORIAL}`,
      element: <Pages.mlb.Tutorial />,
    },
  ]


  const routeListTennis = (sport) => [
    {
      path: `/${sport}${PATH_LIST.PLAYER}`,
      element: <Pages.tennis.Players />,
    },
    {
      path: `/${sport}${PATH_LIST.PLAYER_DETAIL}/:playerId`,
      element: <Pages.tennis.PlayerDetail />,
    },
    {
      path: `/${sport}${PATH_LIST.NEWS}`,
      element: <Pages.tennis.News />,
    },
    {
      path: `/${sport}${PATH_LIST.FORECAST}`,
      element: <Pages.tennis.Forecasts />,
    },
    {
      path: `/${sport}${PATH_LIST.FORECAST_DETAIL}/:teams/:date`,
      element: <Pages.tennis.ForecastDetail />,
      loader: newsLoader
    },
    {
      path: `/${sport}${PATH_LIST.SOCIAL_BETS}`,
      element: <Pages.tennis.SocialBets />,
    },
    {
      path: `/${sport}${PATH_LIST.TUTORIAL}`,
      element: <Pages.tennis.Tutorial />,
    },
    {
      path: `/${sport}${PATH_LIST.STANDING_TENNIS}`,
      element: <Pages.tennis.StandingTennis />,
    },
  ]

export default {
  MLB: routeList('mlb'),
  TENNIS: routeListTennis('tennis')
}