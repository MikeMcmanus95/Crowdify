import { spotifyWebApi } from './index';

export const AUTH = 'AUTH';

export const logIn = loggedIn => {
  return {
    type: AUTH,
    loggedIn,
  };
};

const initialState = {
  loggedIn: false,
};

const getHashParams = () => {
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

export const loginWithSpotify = () => async dispatch => {
  const params = getHashParams();
  if (params.access_token) {
    spotifyWebApi.setAccessToken(params.access_token);
    dispatch(logIn(true));
  }
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH: {
      return { ...state, loggedIn: action.loggedIn };
    }
    default:
      return state;
  }
};

export default loginReducer;
