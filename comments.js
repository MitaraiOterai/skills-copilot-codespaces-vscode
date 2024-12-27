// Create web server with express
const express = require('express');
const app = express();
const port = 3000;

// Add the comments from the comments.js file
let comments = require('./comments.js');

// Add middleware to parse JSON
app.use(express.json());

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Get a single comment
app.get('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === parseInt(req.params.id));
  if (!comment) {
    res.status(404).send('The comment with the given ID was not found');
  } else {
    res.json(comment);
  }
});

// Create a new comment
app.post('/comments', (req, res) => {
  if (!req.body.content || req.body.content.length < 2) {
    res.status(400).send('A comment should have at least 2 characters');
    return;
  }

  const comment = {
    id: comments.length + 1,
    content: req.body.content
  };
  comments.push(comment);
  res.json(comment);
});

// Update a comment
app.put('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === parseInt(req.params.id));
  if (!comment) {
    res.status(404).send('The comment with the given ID was not found');
    return;
  }

  if (!req.body.content || req.body.content.length < 2) {
    res.status(400).send('A comment should have at least 2 characters');
    return;
  }

  comment.content = req.body.content;
  res.json(comment);
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === parseInt(req.params.id));
  if (!comment) {
    res.status(404).send('The comment with the given ID was not found');
    return;
  }

  const index = comments.indexOf(comment);
  comments.splice(index, 1);
  res.json(comment);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});