import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getNowPlayingThunk,
  getPlaylistsThunk,
  addToPlaylistThunk,
} from '../store/music';

const Home = props => {
  const nowPlaying = props.nowPlaying;
  const playlists = props.playlists;
  const { getNowPlaying, getPlaylists } = props;

  useEffect(() => {
    getPlaylists();
    const interval = setInterval(() => {
      getNowPlaying();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div>
        <h1>
          {nowPlaying.name !== ''
            ? `${nowPlaying.name}`
            : 'Nothing currently playing'}
        </h1>
        <h5>{nowPlaying.artists ? `${nowPlaying.artists[0].name}` : ''}</h5>
      </div>
      <div>
        <img
          src={
            nowPlaying.album
              ? nowPlaying.album.images[0].url
              : props.nowPlaying.image
          }
          style={{ width: 500, height: 500 }}
        ></img>
      </div>
      <button
        className="waves-effect waves-light btn"
        onClick={() => props.addToPlaylist(playlists[0].id, [nowPlaying.uri])}
      >
        Add to Playlist
      </button>
      <div>
        <h1>Playlist: {playlists[0] ? playlists[0].name : ''}</h1>
        <img
          src={
            playlists[0] ? playlists[0].images[0].url : props.nowPlaying.image
          }
          style={{ width: 500, height: 500 }}
        ></img>
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    nowPlaying: state.music.nowPlaying,
    playlists: state.music.playlists,
  };
};

const mapDispatch = dispatch => {
  return {
    getNowPlaying: () => dispatch(getNowPlayingThunk()),
    getPlaylists: () => dispatch(getPlaylistsThunk()),
    addToPlaylist: (playlistId, tracks) =>
      dispatch(addToPlaylistThunk(playlistId, tracks)),
  };
};

export default connect(mapState, mapDispatch)(Home);
