module.exports.Organization = `
  type Organization {
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

    description: [String],
    articles: [String],
    dmArticles: [String],
  }
`;
