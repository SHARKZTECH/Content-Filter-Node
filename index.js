// index.js

const express = require('express');
const { getSimilarItems } = require('./content-based-filtering');

const app = express();

// Define some example items
const items = [
  { id: 1, title: 'Product A' },
  { id: 2, title: 'Product B' },
  { id: 3, title: 'Product C' },
  { id: 4, title: 'Product D' },
  { id: 5, title: 'Product E' },
  { id: 6, title: 'Product F' },
];

// Define a route to get similar items for a given item ID
app.get('/items/:id/similar', (req, res) => {
  const itemId = Number(req.params.id);
  const item = items.find(item => item.id === itemId);
  if (!item) {
    return res.status(404).send('Item not found');
  }
  const similarItems = getSimilarItems(item, items);~
  res.send(similarItems);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
