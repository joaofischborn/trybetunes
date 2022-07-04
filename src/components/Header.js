import React from 'react';
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
          <p>{ loading ? <LoadingMessage /> : null }</p>
          <h2 data-testid="header-user-name">{ name }</h2>
        </header>
      );
    }
}

export default Header;
