import capitals     from 'data/places/settlements/capitals';
import cities       from 'data/places/settlements/cities';
import cityStates   from 'data/places/settlements/cityStates';
import dwarfHolds   from 'data/places/settlements/dwarfHolds';
import towns        from 'data/places/settlements/towns';
import villages     from 'data/places/settlements/villages';

export default {
  ...capitals,
  ...cities,
  ...cityStates,
  ...dwarfHolds,
  ...towns,
  ...villages
}