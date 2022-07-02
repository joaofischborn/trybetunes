import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import LoadingMessage from './LoadingMessage';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      button: true,
      loading: false,
      load: false,
    };
  }

  handleChange = (e) => {
    const minCaracters = 2;
    this.setState({ userName: e.target.value });
    if (e.target.value.length > minCaracters) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  }

  onClickButton = async () => {
    const { userName } = this.state;
    this.setState({ loading: true });
    await createUser({ name: userName });
    this.setState({ loading: false, load: true });
  };

  render() {
    const { userName, button, loading, load } = this.state;
    return (
      <div data-testid="page-login">
        { load ? <Redirect to="/search" /> : null }
        { loading ? <LoadingMessage />
          : (
            <>
              <input
                data-testid="login-name-input"
                type="text"
                value={ userName }
                onChange={ this.handleChange }
              />
              <button
                data-testid="login-submit-button"
                type="button"
                disabled={ button }
                onClick={ this.onClickButton }
              >
                Entrar
              </button>
            </>
          )}
      </div>
    );
  }
}
export default Login;
