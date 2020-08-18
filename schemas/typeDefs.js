const { gql } = require("apollo-server-express");

// breaking out each schema into individual files for more readability.
const { God } = require("./god");
const { Person } = require("./person");
const { Lore } = require("./lore");
const { Item } = require("./item");

module.exports.typeDefs = gql`
  type Query {
    person: [Person!]!
    god: [God!]!
    lore: [Lore!]!
    item: [Item!]!

    personByName(name: String!): [Person]
    personByRace(race: String!): [Person]

    godByName(name: String!): [God]
    godByAlignment(alignment: String!): [God]
  }

  ${God}
  ${Person}
  ${Lore}
  ${Item}

  type Mutation {
    createPerson(name: String!): Person!
  }
`;
