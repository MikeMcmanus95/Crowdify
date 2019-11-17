import React, { Component } from 'react';

export default class Search extends Component {
  constructor({ text }) {
    super();
    this.state = {
      query: text || '',
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeText(evt) {
    this.setState({
      query: evt.target.value,
    });
    console.log('searching for:', this.state.query);
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    console.log('Submitting: ', JSON.stringify(this.state));
    this.setState({
      query: '',
    });
  }

  render() {
    return (
      <form id="search" method="GET" onSubmit={this.handleSubmit}>
        <div>
          <input
            type="text"
            name="search"
            onChange={this.handleChangeText}
            value={this.state.query}
            placeholder="Search by song, artist or album"
          ></input>
          <button type="submit">Search</button>
        </div>
      </form>
    );
  }
}
