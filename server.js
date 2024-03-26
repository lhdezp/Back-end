const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const CommentModel = require('./models/comment');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors());

mongoose.connect('mongodb://localhost:27017/DBTaller', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const commentSchema = new mongoose.Schema({
  name: String,
  title: String,
  comment: String,
});

const Comment = mongoose.model('comment', commentSchema);

app.get('/comments', async (req, res) => {
  try {
    const comments = await CommentModel.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/comments', async (req, res) => {
  const comment = new Comment({
    name: req.body.name,
    title: req.body.title,
    comment: req.body.comment,
  });
  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
