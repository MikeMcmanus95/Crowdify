import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import loginReducer from './login';
import musicReducer from './music';
import { loadState, saveState } from './localStorage';
import Spotify from 'spotify-web-api-js';

export const spotifyWebApi = new Spotify();

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const persistedState = loadState();

const reducer = combineReducers({
  login: loginReducer,
  music: musicReducer,
});

const store = createStore(reducer, persistedState, middleware);

store.subscribe(() => {
  saveState({ loggedIn: store.getState().loggedIn });
});

export default store;
