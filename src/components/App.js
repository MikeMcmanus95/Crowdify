import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import Search from './Search';
import { Login } from './Login';
import Routes from '../routes';
import Navbar from './Navbar';

const spotifyWebApi = new Spotify();

class App extends Component {
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
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    );
  }
}

export default App;
