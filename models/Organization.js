const mongoose = require("mongoose");

const model = {
  name: String,
  nickname: String,
  playerKnown: Boolean,
  hideOnCat: Boolean,
  linkingWords: Array,
  tags: Array,
  path: String,
  type: String,
  forceImg: String,

  description: Array,
  articles: Object,
  dmArticles: Object,
};

// model creation params: name of the model, the model object, name of the remote collection.
// if no remote collection is provided, it will default to the plural of the model name
module.exports.Organization = mongoose.model("organization", model);
