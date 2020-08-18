module.exports.Item = `
  type Item {
    id: ID!
    name: String!
    nickname: String!
    linkingWords: [String]
    tags: [String]
    path: String
    playerKnown: Boolean!
    
    type: String
    
    class: String,
    cost: String,
    damage: String,
    weight: String,
    properties: [String],

    description: [String]
    articles: [String]
    dmArticles: [String]
  }
`;
