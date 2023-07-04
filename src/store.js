import {
    configureStore
} from "@reduxjs/toolkit";
import rootReducer from './reducers';
// import homeReducer from './reducers/Home';

const store = configureStore({
    reducer: {
        gameData: rootReducer.homeReducer
    }
});

export default store;