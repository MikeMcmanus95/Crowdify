import { spotifyWebApi } from './index';

const placeHolderImg =
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/eb777e7a-7d3c-487e-865a-fc83920564a1/d7kpm65-437b2b46-06cd-4a86-9041-cc8c3737c6f0.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ViNzc3ZTdhLTdkM2MtNDg3ZS04NjVhLWZjODM5MjA1NjRhMVwvZDdrcG02NS00MzdiMmI0Ni0wNmNkLTRhODYtOTA0MS1jYzhjMzczN2M2ZjAuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-bP80wHw6Jb8moQRsxURQxONZvAMnJ6xLDD8Es7mHps';

export const GET_NOW_PLAYING = 'GET_NOW_PLAYING';
export const GET_PLAYLISTS = 'GET_PLAYLISTS';
export const ADD_TO_PLAYLIST = 'ADD_TO_PLAYLIST';

const initialState = {
  nowPlaying: {
    id: '',
    name: 'Nothing currently playing',
    image: placeHolderImg,
    uri: '',
  },
  playlists: [],
};

export const getNowPlaying = nowPlaying => {
  return {
    type: GET_NOW_PLAYING,
    nowPlaying,
  };
};

export const getPlaylists = playlists => {
  return {
    type: GET_PLAYLISTS,
    playlists,
  };
};

export const addToPlaylist = track => {
  return {
    type: ADD_TO_PLAYLIST,
  };
};

export const getNowPlayingThunk = () => async dispatch => {
  const response = await spotifyWebApi.getMyCurrentPlaybackState();
  console.log(response);
  if (response.item) {
    dispatch(getNowPlaying(response.item));
  } else {
    console.log('No response');
  }
};

export const getPlaylistsThunk = () => async dispatch => {
  const response = await spotifyWebApi.getUserPlaylists();
  console.log(response);
  if (response.items) {
    dispatch(getPlaylists(response.items));
  } else {
    console.log('No response');
  }
};

export const addToPlaylistThunk = (playlistId, tracks) => async dispatch => {
  const response = await spotifyWebApi.addTracksToPlaylist(playlistId, tracks);
  if (response) {
    console.log('SUCCESS');
  } else {
    console.log('No response');
  }
};

const musicReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOW_PLAYING:
      return { ...state, nowPlaying: action.nowPlaying };
    case GET_PLAYLISTS:
      return { ...state, playlists: action.playlists };
    case ADD_TO_PLAYLIST:
      return { ...state };
    default:
      return state;
  }
};

export default musicReducer;
