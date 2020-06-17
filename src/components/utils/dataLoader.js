// ==== LORE DATA IMPORTS
import loreData         from 'data/lore/lore';
import eventsData       from 'data/lore/events';
import godsData         from 'data/lore/gods';
import racesData        from 'data/lore/races';
import creaturesData    from 'data/lore/creatures';
import holidayData     from 'data/lore/holidays';
import calendarData     from 'data/lore/calendar';
import itemData         from 'data/lore/items';
import historicalData   from 'data/lore/historicalDates';

// ==== PEOPLE DATA IMPORTS
import characterData    from 'data/people/characters';

import heroData             from 'data/people/heroes';
import villainData          from 'data/people/villains';
import nobleData            from 'data/people/nobles';
import importantPeopleData  from 'data/people/important';
import merchantsData        from 'data/people/merchants';
import historicalPeopleData from 'data/people/historical';
import mageData             from 'data/people/mages';
import miscPeopleData       from 'data/people/misc';
import archfeyData          from 'data/people/archfey';

// ==== ORGANIZATION DATA IMPORTS
import orgData  from 'data/organizations';

// ==== ALL DATA IMPORTS FOR LOCATIONS
import structures       from 'data/places/structures';
import world            from 'data/places/world';
import seas             from 'data/places/seas';
import regions          from 'data/places/regions';
import mountains        from 'data/places/mountains';
import forests          from 'data/places/forests';
import deserts          from 'data/places/deserts';
import swamps           from 'data/places/swamps';
import politicalStates  from 'data/places/nationStates';
import cityDistricts    from 'data/places/cityDistricts';
import cityStates       from 'data/places/cityStates';
import capitals         from 'data/places/capitals';
import cities           from 'data/places/cities';
import towns            from 'data/places/towns';
import villages         from 'data/places/villages';
import dungeons         from 'data/places/dungeons';
import fortifications   from 'data/places/fortifications';
import dwarfHolds       from 'data/places/dwarfHolds';
import mythic           from 'data/places/mythic';

import spellData        from 'data/spells';

import ships            from 'data/misc/ships';
import items            from 'data/misc/items';

export default class DataLoader {

  static places = {...structures, ...world, ...regions, ...mountains, ...forests, ...deserts, ...swamps, ...seas, ...cityDistricts, ...cityStates, ...capitals, ...cities, ...towns, ...villages, ...dungeons, ...fortifications, ...dwarfHolds, ...politicalStates, ...mythic};
  
  static lore = {...racesData, ...eventsData, ...loreData, ...itemData};
  
  static people = {...heroData,...villainData,...nobleData,...importantPeopleData,...merchantsData,...historicalPeopleData,...miscPeopleData, ...mageData, ...archfeyData};
  
  static misc = {...ships, ...items};

  static organizations = {...orgData};

  static characters = {...characterData};

  static creatures = { ...creaturesData};

  static gods = {...godsData};

  static holidays = {...holidayData};

  static calendar = {...calendarData};

  static historical = {...historicalData};

  static spells = {...spellData};

  static all = { 
    ...this.people, 
    ...this.places, 
    ...this.lore, 
    ...this.misc, 
    ...this.organizations, 
    ...this.characters, 
    ...this.gods, 
    ...this.holidays, 
    ...this.calendar, 
    ...this.historical, 
    ...this.spells, 
    ...this.creatures};
  
}