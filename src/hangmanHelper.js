const loadingPhrases = [
  'Fetching the guillotine...',
  'Hang on Hangman...',
  'Loosening the noose...',
  'Getting a new man to replace...',
  'Looking for quality rope...',
];

const getRandomLoading = () =>
  loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)];

export {getRandomLoading};
