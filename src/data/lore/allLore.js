
import loreData         from 'data/lore/lore';
import eventsData       from 'data/lore/events';
import racesData        from 'data/lore/races';
import holidayData      from 'data/lore/holidays';
import magicItems       from 'data/lore/magicItems';
import historicalData   from 'data/lore/historicalDates';
import calendarData     from 'data/lore/calendar';
import battles          from 'data/lore/battles';
import wars             from 'data/lore/wars';

import pantheon         from 'data/lore/gods';

const allLore = {...racesData, ...eventsData, ...loreData, ...magicItems, ...wars, ...battles};

export {allLore, historicalData, holidayData, pantheon, calendarData};