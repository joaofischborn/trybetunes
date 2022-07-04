import React from 'react';
import { Link } from 'react-router-dom';
import LoadingMessage from '../pages/LoadingMessage';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      name: '',
    };
  }

  componentDidMount() {
    this.userName();
  }

    userName = async () => {
      const user = await getUser();
      this.setState({
        name: user.name,
        loading: false });
    }

    render() {
      const { loading, name } = this.state;
      return (
        <header data-testid="header-component">
          <div>
            <span>{ loading ? <LoadingMessage /> : null }</span>
            <h2 data-testid="header-user-name">{ name }</h2>
            <Link data-testid="link-to-search" to="/search"> Pesquisar </Link>
            <Link data-testid="link-to-favorites" to="/favorites"> Favoritas </Link>
            <Link data-testid="link-to-profile" to="/profile"> Perfil </Link>
          </div>
        </header>
      );
    }
}

export default Header;
