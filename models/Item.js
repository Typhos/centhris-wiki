const mongoose = require("mongoose");

module.exports.Item = mongoose.model("Item", {
  _id: String,
  name: String,
  nickname: String,
  linkingWords: Array,
  tags: Array,
  path: String,
  playerKnown: Boolean,
  type: String,

  class: String,
  cost: String,
  damage: String,
  weight: String,
  properties: Array,

  description: Array,
  articles: Object,
  dmArticles: Object,
});
