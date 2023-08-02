import PATH_LIST from './constant';
import Pages from '../pages';
import { loader as newsLoader,}  from '../pages/PlayerDetail';

const routeList = (sport) => [
    {
      path: `${sport}${PATH_LIST.PLAYER}`,
      element: <Pages.Players />,
    },
    {
      path: `${sport}${PATH_LIST.PLAYER_DETAIL}`,
      element: <Pages.PlayerDetail />,
    },
    {
      path: `${sport}${PATH_LIST.TEAM}`,
      element: <Pages.Team />,
    },
    {
      path: `${sport}${PATH_LIST.TEAM_DETAIL}`,
      element: <Pages.TeamDetail />,
    },
    {
      path: `${sport}${PATH_LIST.NEWS}`,
      element: <Pages.News />,
    },
    {
      path: `${sport}${PATH_LIST.FORECAST}`,
      element: <Pages.Forecasts />,
    },
    {
      path: `${sport}${PATH_LIST.FORECAST_DETAIL}/:teams/:date`,
      element: <Pages.ForecastDetail />,
      loader: newsLoader
    },
    {
      path: `${sport}${PATH_LIST.SOCIAL_BETS}`,
      element: <Pages.SocialBets />,
    },
    {
      path: `${sport}${PATH_LIST.STATS}`,
      element: <Pages.Stats />,
    },
    {
      path: `${sport}${PATH_LIST.TUTORIAL}`,
      element: <Pages.Tutorial />,
    },
  ]

const routeListTennis = [
    {
      path: PATH_LIST.PLAYER,
      element: <Pages.Players />,
    },
    {
      path: PATH_LIST.PLAYERTENNIS,
      element: <Pages.PlayersTennis />,
    },
    {
      path: PATH_LIST.PLAYER_DETAIL,
      element: <Pages.PlayerDetail />,
    },
    {
      path: PATH_LIST.TEAM,
      element: <Pages.Team />,
    },
    {
      path: PATH_LIST.TEAM_DETAIL,
      element: <Pages.TeamDetail />,
    },
    {
      path: PATH_LIST.NEWS,
      element: <Pages.News />,
    },
    {
      path: PATH_LIST.FORECAST,
      element: <Pages.Forecasts />,
    },
    {
      path: PATH_LIST.FORECASTTENNIS,
      element: <Pages.ForecastsTennis />,
    },
    {
      path: `${PATH_LIST.FORECAST_DETAIL}/:teams/:date`,
      element: <Pages.ForecastDetail />,
      loader: newsLoader
    },
    {
      path: `${PATH_LIST.FORECAST_DETAIL_TENNIS}/:teams/:date`,
      element: <Pages.ForecastDetailTennis />,
      loader: newsLoader
    },
    {
      path: PATH_LIST.SOCIAL_BETS,
      element: <Pages.SocialBets />,
    },
    {
      path: PATH_LIST.STATS,
      element: <Pages.Stats />,
    },
    {
      path: PATH_LIST.TUTORIAL,
      element: <Pages.Tutorial />,
    },
    {
      path: PATH_LIST.STANDING_TENNIS,
      element: <Pages.StandingTennis />,
    },
  ]

export default {
  MLB: routeList('mlb'),
  TENNIS: routeList('tennis')
}