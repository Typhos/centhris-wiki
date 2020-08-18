// model must be defined as a mongoose model to access find functionality.
const { Person } = require("./models/Person");
const { God } = require("./models/God");
const { Lore } = require("./models/Lore");
const { Item } = require("./models/Item");

module.exports.resolvers = {
  Query: {
    person: () => Person.find(),
    god: () => God.find(),
    lore: () => Lore.find(),
    item: () => Item.find(),

    personByName: (_, args) => Person.find({ name: args.name }),
    personByRace: (_, args) => Person.find({ race: args.race }),

    godByName: (_, args) => God.find({ name: args.name }),
    godByAlignment: (_, args) => God.find({ alignment: args.alignment }),
  },

  Mutation: {
    createPerson: async (_, { name }) => {
      const person = new Person({ name });
      await person.save();
      return person;
    },
  },
};
