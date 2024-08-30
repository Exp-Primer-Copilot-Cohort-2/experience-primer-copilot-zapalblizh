// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Create a function to generate a random ID
function generateId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Create an array to store comments
const comments = [
    {
        id: generateId(),
        username: 'alice',
        comment: 'I love this blog post',
    },
    {
        id: generateId(),
        username: 'bob',
        comment: 'This is the worst blog post ever',
    }
];

// Create a route to get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Create a route to add a new comment
app.post('/comments', express.json(), (req, res) => {
    const { username, comment } = req.body;
    if (!username || !comment) {
        res.status(400).send('Username and comment are required');
        return;
    }
    const newComment = {
        id: generateId(),
        username,
        comment,
    };
    comments.push(newComment);
    res.status(201).json(newComment);
});

// Start web server
app.listen(port, () => {
    console.log(`Web server listening at http://localhost:${port}`);
});