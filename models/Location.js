const mongoose = require("mongoose");

const model = {
  name: String,
  nickname: String,
  linkingWords: Array,
  tags: Array,
  path: String,
  playerKnown: Boolean,

  hideOnCat: Boolean,
  type: String,
  forceImg: String,

  capital: String,
  location: String,
  area: String,
  population: String,
  demonyms: Array,
  government: String,
  emblem: String,
  currency: String,
  leaders: Array,
  races: Array,
  regions: Array,

  description: Array,
  articles: [
    {
      heading: String,
      article: Array,
    },
  ],
  dmArticles: [
    {
      heading: String,
      article: Array,
    },
  ],
};

// model creation params: name of the model, the model object, name of the remote collection.
// if no remote collection is provided, it will default to the plural of the model name
module.exports.Location = mongoose.model("location", model);
