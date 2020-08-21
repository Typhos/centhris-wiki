const mongoose = require("mongoose");
const { isObjectType } = require("graphql");

const model = {
  name: String,
  nickname: String,
  linkingWords: Array,
  tags: Array,
  path: String,
  playerKnown: Boolean,

  hideOnCat: Boolean,
  type: String,
  leaders: Array,
  forceImg: String,

  description: Array,
  articles: mongoose.Schema.Types.Mixed,
  dmArticles: Array,
};

// model creation params: name of the model, the model object, name of the remote collection.
// if no remote collection is provided, it will default to the plural of the model name
module.exports.Location = mongoose.model("location", model);
