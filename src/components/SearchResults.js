import React from 'react';

const SearchResults = props => {
  const { searchResults } = props;
  const { handleClick } = props;
  return (
    <div className="col s12 m7">
      {searchResults.map(song => (
        <div className="card horizontal" key={song.id}>
          <div className="card-image">
            <img src={song.album.images[1].url} alt="Album Art" />
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <h3>{song.name}</h3>
              <h4>{song.artists[0].name}</h4>
            </div>
            <div className="card-action">
              <button
                className="btn-floating btn-large waves-effect waves-light red"
                onClick={() => handleClick(song.uri)}
              >
                <i className="material-icons">add</i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
