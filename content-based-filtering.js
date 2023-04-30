// content-based-filtering.js

const natural = require('natural');
const _ = require('lodash');

// Define tokenizer and stemmer
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

// Create a function to calculate the similarity score between two items
function similarity(item1, item2) {
  // Tokenize and stem the item titles
  const tokens1 = tokenizer.tokenize(item1.title.toLowerCase());
  const tokens2 = tokenizer.tokenize(item2.title.toLowerCase());
  const stemmed1 = tokens1.map(token => stemmer.stem(token));
  const stemmed2 = tokens2.map(token => stemmer.stem(token));

  // Calculate the Jaccard similarity score
  const intersection = _.intersection(stemmed1, stemmed2);
  const union = _.union(stemmed1, stemmed2);
  const score = intersection.length / union.length;
  return score;
}

// Create a function to get similar items based on a given item
function getSimilarItems(item, allItems) {
  // Calculate the similarity score between the given item and all other items
  const scores = allItems.map(otherItem => ({
    item: otherItem,
    score: similarity(item, otherItem)
  }));

  // Sort the items by similarity score in descending order
  const sortedItems = _.orderBy(scores, 'score', 'desc');

  // Return the top 5 most similar items
  const similarItems = sortedItems.slice(1, 6).map(item => item.item);
  return similarItems;
}

module.exports = { getSimilarItems };
