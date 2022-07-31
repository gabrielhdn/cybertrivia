import React from 'react';
import { createPortal } from 'react-dom';
import { IoCloseSharp } from 'react-icons/io5';
import PropTypes from 'prop-types';
import { fetchCategories } from '../services/fetchTrivia';
import './ConfigModal.css';

class ConfigModal extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    const anyCategory = { id: '', name: 'Any Category' };
    const categoriesArr = await fetchCategories();
    const categories = [anyCategory, ...categoriesArr];
    this.setState({ categories });
  }

  render() {
    const { toggle, change, diff, category, questions } = this.props;
    const { categories } = this.state;
    const questionsArr = [5, 6, 7, 8, 9, 10];
    return createPortal(
      <main className="modal-overlay">
        <section className="modal-container">
          <div className="title-div">
            <h2>settings</h2>
          </div>
          <IoCloseSharp
            size={ 40 }
            className="close-button"
            onClick= { toggle }
          />
          <div className="options-container">
            <label>number of questions
              <select
                name="questions"
                value={ questions }
                onChange={ change }
              >
                {questionsArr.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </label>
            <label>difficulty
              <select
                name="difficulty"
                value={ diff }
                onChange={ change }
              >
                <option value="">any difficulty</option>
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </select>
            </label>
            <label>category
              <select
                name="category"
                value={ category }
                onChange={ change }
                className="category-select"
              >
                {Boolean(categories.length) && categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name.toLowerCase()}</option>
                ))}
              </select>
            </label>
          </div>
        </section>
      </main>,

      document.getElementById('modal-root'),
    );
 }
}

ConfigModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  diff: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  questions: PropTypes.number.isRequired,
};

export default ConfigModal;
