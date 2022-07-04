import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      button: true,
    };
  }

  handleChange = (e) => {
    const minCaracters = 1;
    if (e.target.value.length > minCaracters) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  };

  render() {
    const { button } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          data-testid="search-artist-input"
          type="text"
          onChange={ this.handleChange }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ button }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}
export default Search;
