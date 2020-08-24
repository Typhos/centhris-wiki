import heroData from "data/people/heroes";
import villainData from "data/people/villains";
import nobleData from "data/people/nobles";
import importantPeopleData from "data/people/important";
import merchantsData from "data/people/merchants";
import historicalPeopleData from "data/people/historical";
import mageData from "data/people/mages";
import miscPeopleData from "data/people/misc";
import soldiers from "data/people/soldiers";
import archfeyData from "data/people/archfey";
import lordsOfTheFell from "data/people/lordsOfTheFell";
import witheredCouncil from "data/people/councilOfTheWitheredKing";
import tovanis from "data/people/tovanis";
import lemuria from "data/people/lemuria";

export default {
  ...heroData,
  ...villainData,
  ...nobleData,
  ...importantPeopleData,
  ...merchantsData,
  ...historicalPeopleData,
  ...miscPeopleData,
  ...mageData,
  ...soldiers,
  ...archfeyData,
  ...lordsOfTheFell,
  ...witheredCouncil,
  ...tovanis,
  ...lemuria,
};
