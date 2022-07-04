import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { addImageUrl } from '../redux/actions';
import './Header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      hash: '',
    };
  }

  componentDidMount() {
    const { gravatarEmail, dispatch } = this.props;
    const hash = md5(gravatarEmail).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    dispatch(addImageUrl(url));
    this.setState({ hash });
  }

  render() {
    const { hash } = this.state;
    const { name, score } = this.props;
    return (
      <header className="header">
        <div className="img-div">
          <img
            src={ `https://www.gravatar.com/avatar/${hash}` }
            alt="Player avatar"
            data-testid="header-profile-picture"
            className="player-img"
          />
          <p data-testid="header-player-name" className="player-name">
            {' '}
            {name}
            {' '}
          </p>
        </div>
        <p
          data-testid="header-score"
          className="player-score"
        >
          {`POINTS: ${score}`}
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Header);
