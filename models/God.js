const mongoose = require("mongoose");

module.exports.God = mongoose.model("God", {
  _id: String,
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
});
