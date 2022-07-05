import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      songs: [],
      albumInfo: '',
    };
  }

  componentDidMount() {
    this.getMusic();
  }

  getMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({ songs: [...musics], albumInfo: musics[0] });
  }

  render() {
    const { songs, albumInfo } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{albumInfo.artistName}</p>
        <p data-testid="album-name">{albumInfo.collectionName}</p>
        { songs.filter((song) => song.trackName).map((song) => (
          <MusicCard
            key={ song.trackNumber }
            trackName={ song.trackName }
            previewUrl={ song.previewUrl }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }),
}.isRequired;

export default Album;
