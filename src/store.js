import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';

export default configureStore({
  reducer: {
    sport: reducers.sportReducer,
  },
});
