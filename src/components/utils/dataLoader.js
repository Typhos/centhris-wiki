// ==== LORE DATA IMPORTS
import loreData         from 'data/lore/lore';
import eventsData       from 'data/lore/events';
import godsData         from 'data/lore/gods';
import racesData        from 'data/lore/races';
import creaturesData    from 'data/lore/creatures';
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
import miscPeopleData       from 'data/people/misc';

// ==== ORGANIZATION DATA IMPORTS
import orgData  from 'data/organizations';

// ==== ALL DATA IMPORTS FOR LOCATIONS
import structures       from 'data/places/structures';
import world            from 'data/places/world';
import seas             from 'data/places/seas';
import regions          from 'data/places/regions';
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

export default class DataLoader {

  static places = {...structures, ...world, ...regions, ...seas, ...cityDistricts, ...cityStates, ...capitals, ...cities, ...towns, ...villages, ...dungeons, ...fortifications, ...dwarfHolds, ...politicalStates, ...mythic};
  
  static lore = {...racesData, ...eventsData, ...loreData, ...itemData};
  
  static people = {...heroData,...villainData,...nobleData,...importantPeopleData,...merchantsData,...historicalPeopleData,...miscPeopleData};
  
  static organizations = {...orgData};

  static characters = {...characterData};

  static creatures = { ...creaturesData};

  static gods = {...godsData};

  static calendar = {...calendarData};

  static historical = {...historicalData};

  static spells = {...spellData};

}