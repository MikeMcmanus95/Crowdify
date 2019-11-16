import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import Search from './Search';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        id: '',
        name: 'None',
        image: '',
        uri: '',
      },
      playlist: {
        id: '',
        name: 'None',
        image: '',
      },
    };
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
  }
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  async getNowPlaying() {
    const response = await spotifyWebApi.getMyCurrentPlaybackState();
    console.log(response);
    if (response.item) {
      this.setState({
        nowPlaying: {
          id: response.item.id,
          name: response.item.name,
          image: response.item.album.images[0].url,
          uri: response.item.uri,
        },
      });
    } else {
      console.log('Nothing currently playing');
    }
  }

  async getPlaylists() {
    const response = await spotifyWebApi.getUserPlaylists();
    console.log('PLAYLISTS', response);
    this.setState({
      playlist: {
        id: response.items[0].id,
        name: response.items[0].name,
        image: response.items[0].images[0].url,
      },
    });
  }

  async addToPlaylist() {
    const playlistId = this.state.playlist.id;
    const trackUri = this.state.nowPlaying.uri;
    const response = await spotifyWebApi.addTracksToPlaylist(playlistId, [
      trackUri,
    ]);
    if (response) {
      console.log('success?');
      console.log(response);
    }
  }
  render() {
    const playlistObj = this.state.playlist;
    const login = (
      <a className="waves-effect waves-light btn" href="http://localhost:8888">
        Login with Spotify
      </a>
    );
    const player = (
      <div className="App">
        <Search></Search>
        <div>
          <h1>Now Playing: {this.state.nowPlaying.name}</h1>
        </div>
        <div>
          <img
            src={this.state.nowPlaying.image}
            style={{ width: 500, height: 500 }}
          ></img>
        </div>
        <button
          className="waves-effect waves-light btn"
          onClick={() => this.getNowPlaying()}
        >
          Check Now Playing
        </button>
        <button
          className="waves-effect waves-light btn"
          onClick={() => this.getPlaylists()}
        >
          Get playlists
        </button>
        <button
          className="waves-effect waves-light btn"
          onClick={() => this.addToPlaylist()}
        >
          Add to Playlist
        </button>
        <div>
          <h1>Playlist: {playlistObj.name}</h1>
          <img
            src={playlistObj.image}
            style={{ width: 500, height: 500 }}
          ></img>
        </div>
      </div>
    );
    if (this.state.loggedIn === false) {
      return login;
    }
    return player;
  }
}

export default App;
