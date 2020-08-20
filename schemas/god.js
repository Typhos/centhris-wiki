module.exports.God = `
  type God {
    id: ID!
    name: String!
    nickname: String!
    playerKnown: Boolean!
    linkingWords: [String]
    type: String!
    tags: [String]
    path: String

    trueName: String
    gender: String
    symbol: String
    alignment: String

    parents: [String]
    siblings: [String]
    consorts: [String]
    children: [String]

    epithets: [String]
    portfolio: [String]
    titles: [String]
    worshipers: [String]

    majorTemples: [String]
    shrineImg: [String]

    description: [String]
    articles: [String]
    dmArticles: [String]
  }
`;
