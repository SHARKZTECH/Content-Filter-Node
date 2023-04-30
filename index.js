// index.js

const express = require('express');
const { getSimilarItemsByTitle } = require('./content-based-filtering');

const app = express();

// Define some example items
const items = [
  { id: 1, title: generateTitle() },
  { id: 2, title: generateTitle() },
  { id: 3, title: generateTitle() },
  { id: 4, title: generateTitle() },
  { id: 5, title: generateTitle() },
  { id: 6, title: generateTitle() },
];

function generateTitle() {
  const adjectives = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Black', 'White', 'Gray'];
  const nouns = ['Chair', 'Table', 'Book', 'Phone', 'Laptop', 'Shoe', 'Car', 'Bike', 'Hat', 'Shirt'];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 1000);
  return `${adjective} ${noun} ${num}`;
}


// Define a route to get similar items for a given item ID
app.get('/items/:id/similar', (req, res) => {
  const itemId = Number(req.params.id);
  const item = items.find(item => item.id === itemId);
  if (!item) {
    return res.status(404).send('Item not found');
  }
  const similarItems = getSimilarItemsByTitle(item, items);~
  res.send(similarItems);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
