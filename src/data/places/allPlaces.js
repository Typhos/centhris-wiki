import world            from 'data/places/world';
import cityDistricts    from 'data/places/cityDistricts';
import mythic           from 'data/places/mythic';
import planes           from 'data/places/planes';

import geography        from 'data/places/geography/allGeography';
import settlements      from 'data/places/settlements/allSettlements';
import states           from 'data/places/states/allStates';
import structures       from 'data/places/structures/allStructures';

export default {
  ...world,
  ...cityDistricts,
  ...mythic,
  ...planes,

  ...geography,
  ...states,
  ...settlements,
  ...structures 
}