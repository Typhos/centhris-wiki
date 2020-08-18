module.exports.Person = `
  type Person {
    id: ID!
    name: String!
    nickname: String!
    playerKnown: Boolean!
    hideOnCat: Boolean
    race: String
    gender: String
    occupation: String
    languages: [String]
    player: String
    background: String
    class: String
    subclass: String

    age: String
    birthYear: String
    deathYear: String

    titles: [String]
    linkingWords: [String]
    tags: [String]
    affiliations: [String]

    quote: String
    description: [String]
    articles: [String]
    dmArticles: [String]
  }
`;
