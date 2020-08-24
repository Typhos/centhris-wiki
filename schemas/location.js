module.exports.Location = `
  type Article {
    heading: String,
    article: [String]
  }

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
    
    capital: String,
    location: String,
    area: String,
    population: String,
    demonyms: [String],
    government: String,
    emblem: String,
    currency: String,
    leaders: [String],
    races: [String],
    regions: [String],

    description: [String],
    articles: Article
  }
`;
