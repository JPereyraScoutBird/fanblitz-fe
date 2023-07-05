import PATH_LIST from './constant';
import Pages from '../pages';

const route_list = [
    {
      path: PATH_LIST.HOME,
      element: <Pages.Home />,
    },
    {
      path: PATH_LIST.PLAYER,
      element: <Pages.Player />,
    },
    {
      path: PATH_LIST.TEAM,
      element: <Pages.Team />,
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
  ]

export default route_list