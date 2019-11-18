import React, { Component } from 'react';
import SearchResults from './SearchResults';
import { connect } from 'react-redux';
import { searchSongsThunk, addToPlaylistThunk } from '../store/music';

class Search extends Component {
  constructor({ text }) {
    super();
    this.state = {
      query: text || '',
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChangeText(evt) {
    this.setState({
      query: evt.target.value,
    });
    console.log('searching for:', this.state.query);
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    this.props.searchSongs(this.state.query);
    this.setState({
      query: '',
    });
  }

  handleClick(track) {
    this.props.addToPlaylist(this.props.playlists[0].id, [track]);
  }

  render() {
    return (
      <div>
        <div>
          <form id="search" method="GET" onSubmit={this.handleSubmit}>
            <div>
              <input
                type="text"
                name="search"
                onChange={this.handleChangeText}
                value={this.state.query}
                placeholder="Search by song, artist or album"
              ></input>
              <button type="submit" className="waves-effect waves-light btn">
                Search
              </button>
            </div>
          </form>
        </div>
        {this.props.searchResults ? (
          <SearchResults
            searchResults={this.props.searchResults}
            handleClick={this.handleClick}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapState = state => {
  return {
    searchResults: state.music.searchResults,
    playlists: state.music.playlists,
  };
};

const mapDispatch = dispatch => {
  return {
    searchSongs: query => dispatch(searchSongsThunk(query)),
    addToPlaylist: (playlistId, tracks) =>
      dispatch(addToPlaylistThunk(playlistId, tracks)),
  };
};

export default connect(mapState, mapDispatch)(Search);
