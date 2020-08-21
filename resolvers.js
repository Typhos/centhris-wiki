// model must be defined as a mongoose model to access find functionality.
import { Person } from "./models/Person";
import { God } from "./models/god";
import { Lore } from "./models/Lore";
import { Item } from "./models/Item";
import { Organization } from "./models/Organization";
import { Location } from "./models/Location";

export const resolvers = {
  Query: {
    people: () => Person.find(),
    gods: () => God.find(),
    lores: () => Lore.find(),
    items: () => Item.find(),
    locations: () => Location.find(),
    organizations: () => Organization.find(),

    person: (_, args) => Person.find(args),
    personById: (_, { id }) => Person.findById(id),

    god: (_, args) => God.find(args),
    godById: async (_, { id }) => God.findById(id),

    lore: (_, args) => Lore.find(args),
    loreById: async (_, { id }) => Lore.findById(id),

    organization: (_, args) => Organization.find(args),
    organizationById: async (_, { id }) => Organization.findById(id),

    location: (_, args) => Location.find(args),
    locationArticle: (_, args) => Location.findOne(args),
    locationById: async (_, { id }) => Location.findById(id),
  },

  Mutation: {
    createPerson: async (_, { name }) => {
      const person = new Person({ name });
      await person.save();
      return person;
    },
  },
};
