// model must be defined as a mongoose model to access find functionality.
import { Person } from "./models/Person";
import { God } from "./models/god";
import { Lore } from "./models/Lore";
import { Item } from "./models/Item";
import { Location } from "./models/Location";

export const resolvers = {
  Query: {
    people: () => Person.find(),
    gods: () => God.find(),
    lores: () => Lore.find(),
    items: () => Item.find(),
    locations: () => Location.find(),

    person: (_, args) => Person.find(args),
    personById: (_, { id }) => Person.findById(id),

    god: (_, args) => God.find(args),
    godById: async (_, { id }) => God.findById(id),

    lore: (_, args) => Lore.find(args),
    loreById: async (_, { id }) => Lore.findById(id),
  },

  Mutation: {
    createPerson: async (_, { name }) => {
      const person = new Person({ name });
      await person.save();
      return person;
    },
  },
};
