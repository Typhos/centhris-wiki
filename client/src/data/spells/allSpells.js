import evocation             from 'data/spells/evocation';
import transmutation         from 'data/spells/transmutation';
import conjuration           from 'data/spells/conjuration';
import necromancy           from 'data/spells/necromancy';

export default {
    ...evocation,
    ...transmutation,
    ...conjuration,
    ...necromancy
};

//  Below is the formatting for spells.

// "Test-Spell": {
//     "playerKnown": false,
//     "name": "Test Spell",
//     "nickname": "Test Spell",
//     "tags": ["abjuration","wizard","sorcerer"],
//     "level": "5th",
//     "castingTime": "1 Action",
//     "range": "Self",
//     "components": ["verbal","somatic","material"],
//     "duration": "1 Minute",
//     "school": "Abjuration",
//     "attackOrSave": "Spell Attack",
//     "materialComponent": "a shard of self doubt",
//     "damageEffect": "Buff",
//     "classes": ["Sorcerer","Wizard"],
//     "description": [
//       "You cast \"Test\" upon yourself in order to ensure you are still an arcane caster."
//     ]
//   },