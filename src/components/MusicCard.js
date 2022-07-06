import React from 'react';
import propTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import LoadingMessage from '../pages/LoadingMessage';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  favoriteMusic = async () => {
    const { songs } = this.props;
    this.setState({ loading: true });
    await addSong(songs);
    this.setState({ loading: false });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor={ `checkbox-music-${trackId}` }
          data-testid={ `checkbox-music-${trackId}` }
        >
          Favorita
          <input
            type="checkbox"
            onChange={ this.favoriteMusic }
            id={ `checkbox-music-${trackId}` }
          />
        </label>
        { loading && <LoadingMessage /> }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string,
  previewUrl: propTypes.string,
  trackId: propTypes.number,
  songs: propTypes.arrayOf(),
}.isRequired;

export default MusicCard;
