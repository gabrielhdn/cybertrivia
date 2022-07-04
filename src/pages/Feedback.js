import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import './Feedback.css';

class Feedback extends React.Component {
  render() {
    const { assertions, score, history } = this.props;
    const number = 3;
    return (
      <main className="feedback-page">
        <Header />
        <section className="feedback-section">
          <section className="feedback-card">
            <div className="text-div">
              <p data-testid="feedback-text" className="feedback-text">
                {assertions < number ? 'Could be better...' : 'Well Done!'}
              </p>
              <p className="feedback-assertions">
                You've got
                {' '}
                <span
                  data-testid="feedback-total-question"
                >
                  {assertions}
                </span>
                {' '}
                { assertions === 1 ? "question" : "questions" } right!
              </p>
              <p className="feedback-points">
                <span data-testid="feedback-total-score">{score}</span>
                {' '}
                points
              </p>
            </div>
            <div className="btn-div">
              <button
                type="button"
                onClick={ () => history.push('/') }
                data-testid="btn-play-again"
              >
                PLAY AGAIN
              </button>
              <button
                type="button"
                onClick={ () => history.push('/ranking') }
                data-testid="btn-ranking"
              >
                RANKING
              </button>
            </div>
          </section>
        </section>
      </main>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
