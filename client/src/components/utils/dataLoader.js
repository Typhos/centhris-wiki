// ==== LORE DATA IMPORTS
import {allLore, historicalData, holidayData, pantheon, calendarData} from "data/lore/allLore";

// ==== PEOPLE DATA IMPORTS
import playerCharacters  from 'data/people/characters';
import allPeople         from "data/people/allPeople";


import allMonsters       from "data/monsters/allMonsters";

// ==== ORGANIZATION DATA IMPORTS
import allGroups         from "data/organizations/allGroups";

// ==== ALL DATA IMPORTS FOR LOCATIONS
import allPlaces         from "data/places/allPlaces";

import spellData         from 'data/spells/allSpells';
  
import allItems          from 'data/items/allItems';


export default class DataLoader {

  static places = {...allPlaces};
  
  static lore = {...allLore};
  
  static people = {...allPeople};
  
  static items = {...allItems};

  static organizations = {...allGroups};

  static characters = {...playerCharacters};

  static creatures = { ...allMonsters};

  static gods = {...pantheon};

  static holidays = {...holidayData};

  static calendar = {...calendarData};

  static historical = {...historicalData};

  static spells = {...spellData};

  static all = { 
    ...this.people, 
    ...this.places, 
    ...this.lore, 
    ...this.items, 
    ...this.organizations, 
    ...this.characters, 
    ...this.gods, 
    ...this.holidays,
    ...this.historical, 
    ...this.spells, 
    ...this.creatures
  };

}