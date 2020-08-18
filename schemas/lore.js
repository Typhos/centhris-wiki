module.exports.Lore = `
  type Lore {
    id: ID!,
    name: String!
    nickname: String!
    playerKnown: Boolean!,
    hideOnCat: Boolean,
    linkingWords: [String],
    tags: [String],
    path: String,
    type: String,

    description: [String],
    articles: [String],
    dmArticles: [String],
  }
`;
