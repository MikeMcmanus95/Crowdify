import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
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
    this.setState({
      nowPlaying: {
        name: response.item.name,
        image: response.item.album.images[0].url,
      },
    });
  }
  render() {
    const login = (
      <a className="waves-effect waves-light btn" href="http://localhost:8888">
        Login with Spotify
      </a>
    );
    const player = (
      <div className="App">
        <div>Now Playing: {this.state.nowPlaying.name}</div>
        <div>
          <img
            src={this.state.nowPlaying.image}
            style={{ width: 500, height: 500 }}
          ></img>
        </div>
        <a
          className="waves-effect waves-light btn"
          onClick={() => this.getNowPlaying()}
        >
          Check Now Playing
        </a>
      </div>
    );
    if (this.state.loggedIn === false) {
      return login;
    }
    return player;
  }
}

export default App;
