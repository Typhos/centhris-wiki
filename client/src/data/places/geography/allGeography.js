import seas             from 'data/places/geography/seas';
import regions          from 'data/places/geography/regions';
import mountains        from 'data/places/geography/mountains';
import forests          from 'data/places/geography/forests';
import deserts          from 'data/places/geography/deserts';
import swamps           from 'data/places/geography/swamps';

export default {
  ...seas,
  ...regions,
  ...forests,
  ...mountains,
  ...deserts,
  ...swamps
}