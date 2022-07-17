import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GiTrophy } from 'react-icons/gi';
import './Ranking.css';

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    if (!localStorage.getItem('ranking')) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.sort((a, b) => b.score - a.score);
    this.setState({ ranking });
  }

  render() {
    const { history } = this.props;
    const { ranking } = this.state;
    return (
      <main className="ranking-page">
        <GiTrophy
          data-testid="ranking-title"
          className="ranking-logo"
          size={ 60 }
        />
        <section className="ranking-section">
          {ranking.map(({ picture, name, score }, index) => (
            <div key={ picture + index } className="player-ranking">
              <div className="player-img-div">
                <img src={ picture } alt="Player avatar" className="player-img-rk"/>
              </div>
              <p data-testid={ `player-name-${index}` }>{name}</p>
              <p data-testid={ `player-score-${index}` } className="rk-score">{score}</p>
              <div className="underline"></div>
            </div>
          ))}
        </section>
        <button
          type="button"
          onClick={ () => history.push('/') }
          data-testid="btn-go-home"
          className="play-btn"
        >
          PLAY AGAIN
        </button>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Ranking);
