const natural = require('natural');
const _ = require('lodash');

// Define tokenizer and stemmer
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

// Create a function to calculate the similarity score between two items based on title
function similarityByTitle(item1, item2) {
  // Tokenize and stem the item titles
  const tokens1 = tokenizer.tokenize(item1.title.toString().toLowerCase());
  const tokens2 = tokenizer.tokenize(item2.title.toString().toLowerCase());
  const stemmed1 = tokens1.map(token => stemmer.stem(token));
  const stemmed2 = tokens2.map(token => stemmer.stem(token));

  // Calculate the Jaccard similarity score
  const intersection = _.intersection(stemmed1, stemmed2);
  const union = _.union(stemmed1, stemmed2);
  const score = intersection.length / union.length;
  return score;
}

// Create a function to get similar items based on a given item title
function getSimilarItemsByTitle(itemTitle, allItems) {
  // Tokenize and stem the given item title
  const tokens = tokenizer.tokenize(itemTitle.toString().toLowerCase());
  const stemmed = tokens.map(token => stemmer.stem(token));

  // Calculate the similarity score between the given item title and all other item titles
  const scores = allItems.map(otherItem => ({
    item: otherItem,
    score: similarityByTitle({ title: itemTitle }, { title: otherItem.title })
  }));

  // Sort the items by similarity score in descending order
  const sortedItems = _.orderBy(scores, 'score', 'desc');

  // Return the top 5 most similar items
  const similarItems = sortedItems.slice(1, 6).map(item => item.item);
  return similarItems;
}

module.exports = { getSimilarItemsByTitle };
