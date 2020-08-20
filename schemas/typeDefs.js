const { gql } = require("apollo-server-express");

// breaking out each schema into individual files for more readability.
const { God } = require("./god");
const { Person } = require("./person");
const { Lore } = require("./lore");
const { Item } = require("./item");
const { Location } = require("./location");

module.exports.typeDefs = gql`
  type Query {
    people: [Person!]!
    gods: [God!]!
    lores: [Lore!]!
    items: [Item!]!
    locations: [Location!]!

    person(
      name: String
      race: String
      class: String
      playerKnown: Boolean
      gender: String
      affiliations: String
    ): [Person]
    personById(id: ID!): Person

    god(
      name: String
      nickname: String
      playerKnown: Boolean
      alignment: String
      portfolio: String
      trueName: String
      gender: String
    ): [God]
    godById(id: ID!): God

    lore(
      name: String
      nickname: String
      playerKnown: Boolean
      hideOnCat: Boolean
      type: String
    ): [Lore]
    loreById(id: ID!): Lore
  }

  ${God}
  ${Person}
  ${Lore}
  ${Item}
  ${Location}

  type Mutation {
    createPerson(name: String!): Person!
  }
`;
