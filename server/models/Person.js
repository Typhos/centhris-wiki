const mongoose = require("mongoose");

module.exports.Person = mongoose.model("Person", {
  _id: String,
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
});
