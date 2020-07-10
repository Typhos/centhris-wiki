import aberrations  from "data/monsters/aberrations";
import giants       from "data/monsters/giants";
import undead       from "data/monsters/undead";
import dragons      from "data/monsters/dragons";
import elementals   from "data/monsters/elementals";
import fiends       from "data/monsters/fiends";
import monsters     from "data/monsters/monsters";
import fey          from "data/monsters/fey";
import plants       from "data/monsters/plants";
import constructs   from "data/monsters/constructs";
import humanoids    from "data/monsters/humanoids";
import beasts       from "data/monsters/beasts";
import celestials   from "data/monsters/celestials";

export default {
  ...aberrations, 
  ...giants,
  ...undead,
  ...dragons,
  ...elementals,
  ...fiends,
  ...monsters,
  ...dragons,
  ...fey,
  ...plants,
  ...constructs,
  ...celestials,
  ...beasts,
  ...humanoids
}