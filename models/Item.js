const mongoose = require("mongoose");

const model = {
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
};

// model creation params: name of the model, the model object, name of the remote collection.
// if no remote collection is provided, it will default to the plural of the model name
module.exports.Item = mongoose.model("item", model, "items");
