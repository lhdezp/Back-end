const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
  name: String,
  title: String,
  comment: String,
});

module.exports = mongoose.model('Comment', Comment);