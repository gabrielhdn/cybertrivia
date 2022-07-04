import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetStore, saveUserInfo } from '../redux/actions';
import logo from '../images/CyberTrivia-cut.png';
import title from '../images/TriviaTitle2-ed.png';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(resetStore());
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  }

  handleClick = () => {
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then(({ token }) => {
        const { history, dispatch } = this.props;
        dispatch(saveUserInfo(this.state));
        localStorage.setItem('token', token);
        history.push('/game');
      });
  }

  validateLogin = () => {
    const { name, email } = this.state;
    return !(name.length && email.length);
  }

  render() {
    const { email, name } = this.state;
    // const { history } = this.props;
    return (
      <main className="login-page">
        <section className="form-card">
          <img src={title} alt="Trivia title" className="title"/>
          <form className="form">
            <input
              type="text"
              className="name-input"
              data-testid="input-player-name"
              placeholder="TYPE YOUR NAME"
              name="name"
              value={ name }
              autoComplete="off"
              onChange={ this.handleChange }
            />
            <input
              type="email"
              className="email-input"
              data-testid="input-gravatar-email"
              placeholder="TYPE YOUR E-MAIL"
              name="email"
              value={ email }
              autoComplete="off"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              disabled={ this.validateLogin() }
              onClick={ this.handleClick }
              className="login-button"
              data-testid="btn-play"
              >
              PLAY
            </button>
          </form>
        </section>
        <img src={logo} alt="CyberTrivia" className="logo"/>
        {/* <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          SETTINGS
        </button> */}
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
