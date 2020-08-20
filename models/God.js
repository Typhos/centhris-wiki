const mongoose = require("mongoose");

const model = {
  name: String,
  nickname: String,
  linkingWords: Array,
  tags: Array,
  path: String,
  playerKnown: Boolean,

  trueName: String,
  gender: String,
  symbol: String,
  type: String,
  alignment: String,

  parents: Array,
  siblings: Array,
  consorts: Array,
  children: Array,

  epithets: Array,
  portfolio: Array,
  titles: Array,
  worshipers: Array,

  majorTemples: Array,
  shrineImg: Array,

  description: Array,
  articles: Array,
  dmArticles: Array,
};

// model creation params: name of the model, the model object, name of the remote collection.
// if no remote collection is provided, it will default to the plural of the model name
module.exports.God = mongoose.model("god", model, "gods");
