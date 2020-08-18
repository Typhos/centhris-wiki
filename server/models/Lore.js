const mongoose = require("mongoose");

module.exports.Lore = mongoose.model("Lore", {
  _id: String,
  name: String,
  nickname: String,
  playerKnown: Boolean,
  hideOnCat: Boolean,
  linkingWords: Array,
  tags: Array,
  path: String,
  type: String,

  description: Array,
  articles: Object,
  dmArticles: Object,
});
