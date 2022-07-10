import React from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import LoadingMessage from '../pages/LoadingMessage';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favoriteMusic: false,
    };
  }

  componentDidMount() {
    this.getFavorite();
  }

  getFavorite = async () => {
    const { songs } = this.props;
    const favoriteMusics = await getFavoriteSongs();
    const favoriteMusic = favoriteMusics.some((song) => song.trackName
    === songs.trackName);

    if (favoriteMusic) {
      this.setState({ favoriteMusic: true });
    }
  }

  favoriteMusic = async () => {
    const { favoriteMusic } = this.state;
    const { songs } = this.props;
    if (favoriteMusic === false) {
      this.setState({ loading: true });
      await addSong(songs);
      this.setState({ loading: false, favoriteMusic: true });
    } else {
      this.setState({ loading: true });
      await removeSong(songs);
      this.setState({ loading: false, favoriteMusic: false });
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, favoriteMusic } = this.state;
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
            checked={ favoriteMusic }
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
