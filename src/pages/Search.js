import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import LoadingMessage from './LoadingMessage';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      button: true,
      input: '',
      inputValue: '',
      loading: false,
      response: false,
      albumsList: [],
      notFound: false,
    };
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value });
    const minCaracters = 1;
    if (e.target.value.length > minCaracters) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  };

  searchAlbum = async () => {
    const { input } = this.state;
    this.setState({ loading: true });
    const albums = await searchAlbumsAPI(input);
    this.setState({ albumsList: albums,
      inputValue: input,
      input: '',
      loading: false,
      response: true });
    if (albums.length === 0) {
      this.setState({ notFound: true, response: false });
    } else {
      this.setState({ notFound: false });
    }
  }

  render() {
    const { button,
      input,
      loading, response, inputValue, albumsList, notFound } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <LoadingMessage /> : (
          <>
            <input
              data-testid="search-artist-input"
              type="text"
              onChange={ this.handleChange }
              value={ input }
            />
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ button }
              onClick={ this.searchAlbum }
            >
              Pesquisar
            </button>
            { response
            && (
              <span>
                {`Resultado de álbuns de:
                ${inputValue}`}
              </span>
            )}
          </>
        )}
        { notFound ? <span>Nenhum álbum foi encontrado</span>
          : albumsList.map((album) => (
            <div key={ album.collectionId }>
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >
                Álbum
              </Link>
              <p>{album.artistName}</p>
              <p>{album.collectionName}</p>
              <img src={ album.artworkUrl100 } alt={ album.collectionName } />
            </div>
          ))}
      </div>
    );
  }
}
export default Search;
