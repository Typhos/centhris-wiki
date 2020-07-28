import magicItems     from     "data/items/magicItems";
import ships          from     "data/items/ships";
import weapons        from     "data/items/weapons";
import elixirs        from     "data/items/elixirsAndPoisons";

export default {
  ...magicItems,
  ...ships,
  ...weapons,
  ...elixirs
}