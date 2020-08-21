module.exports.Location = `
  type Location {
    id: ID!,
    name: String!
    nickname: String!
    playerKnown: Boolean!,
    hideOnCat: Boolean,
    linkingWords: [String],
    tags: [String],
    path: String,
    type: String,
    forceImg: String,

    leaders: [String],

    description: [String],
    articles: [String],
    dmArticles: [String],
  }
`;
