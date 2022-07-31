import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetStore, saveSettings, saveUserInfo } from '../redux/actions';
import { IoMdSettings } from 'react-icons/io';
import logo from '../images/CyberTrivia-cut.png';
import title from '../images/TriviaTitle2-ed.png';
import './Login.css';
import ConfigModal from '../components/ConfigModal';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      showSettings: false,
      difficulty: '',
      category: '',
      questions: 5,
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
        const { difficulty, category, questions } = this.state;
        dispatch(saveUserInfo(this.state));
        dispatch(saveSettings({
          difficulty,
          category,
          questions
        }));
        localStorage.setItem('token', token);
        history.push('/game');
      });
  }

  validateLogin = () => {
    const { name, email } = this.state;
    return !(name.length && email.length);
  }

  toggleSettings = () => {
    this.setState((prev) => ({ showSettings: !prev.showSettings }));
  }

  render() {
    const { email, name, showSettings, difficulty, category, questions } = this.state;
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
            <IoMdSettings
              className="settings-button"
              onClick={ this.toggleSettings }
            />
          </form>
        </section>
        <img src={logo} alt="CyberTrivia" className="logo"/>
      {showSettings && <ConfigModal
        toggle={ this.toggleSettings }
        change={ this.handleChange }
        diff={ difficulty }
        category={ category }
        questions={ +questions }
      />}
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
