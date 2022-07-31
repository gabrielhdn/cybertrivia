export const fetchQuestions = async ({ questionsAm, difficulty, category, token }) => {
  let endpoint = '';

  if (difficulty.length && !category.length) {
    endpoint = `https://opentdb.com/api.php?amount=${questionsAm}&difficulty=${difficulty}&token=${token}`;
  }

  if (!difficulty.length && category.length) {
    endpoint = `https://opentdb.com/api.php?amount=${questionsAm}&category=${category}&token=${token}`;
  }

  if (difficulty.length && category.length) {
    endpoint = `https://opentdb.com/api.php?amount=${questionsAm}&category=${category}&difficulty=${difficulty}&token=${token}`;
  }

  if (!difficulty.length && !category.length) {
    endpoint = `https://opentdb.com/api.php?amount=${questionsAm}&token=${token}`;
  }

  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data);
};

export const fetchCategories = async () => {
  return fetch('https://opentdb.com/api_category.php')
    .then((response) => response.json())
    .then(({trivia_categories: categoriesList}) => categoriesList);
};
