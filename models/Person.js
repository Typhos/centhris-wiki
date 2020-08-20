const mongoose = require("mongoose");

const model = {
  name: String,
  nickname: String,
  playerKnown: Boolean,
  hideOnCat: Boolean,
  race: String,
  gender: String,
  occupation: String,
  player: String,
  background: String,
  class: String,
  subclass: String,
  languages: Array,

  age: String,
  birthYear: String,
  deathYear: String,

  titles: Array,
  linkingWords: Array,
  tags: Array,
  affiliations: Array,

  quote: String,
  description: Array,
  articles: Object,
  dmArticles: Object,
};

// model creation params: name of the model, the model object, name of the remote collection.
// if no remote collection is provided, it will default to the plural of the model name
module.exports.Person = mongoose.model("person", model, "people");
