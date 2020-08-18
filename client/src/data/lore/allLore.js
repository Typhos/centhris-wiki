import loreData         from 'data/lore/lore';
import eventsData       from 'data/lore/events';
import racesData        from 'data/lore/races';
import holidayData      from 'data/lore/holidays';
import historicalData   from 'data/lore/historicalDates';
import calendarData     from 'data/lore/calendar';
import battles          from 'data/lore/battles';
import wars             from 'data/lore/wars';

import majorGods        from 'data/lore/gods/major';
import minorGods        from 'data/lore/gods/minor';
import dwarvenGods      from 'data/lore/gods/dwarven';
import elvenGods        from 'data/lore/gods/elven';
import goblinGods       from 'data/lore/gods/goblinoid';
import giantGods        from 'data/lore/gods/giant';

const allLore = {
  ...racesData, 
  ...eventsData, 
  ...loreData, 
  ...wars, 
  ...battles
};

const pantheon = {
  ...majorGods,
  ...minorGods,
  ...dwarvenGods,
  ...elvenGods,
  ...goblinGods,
  ...giantGods
}

export {allLore, historicalData, holidayData, pantheon, calendarData};