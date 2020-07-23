import clansLemuria           from 'data/groups/clansLemuria';
import clansCibrin            from 'data/groups/clansCibrin';
import westernKoraxonGroups   from 'data/groups/westernKoraxon';
import militaryOrders         from 'data/groups/militaryOrders';
import orgs                   from 'data/groups/organizations';
import extraplanar            from 'data/groups/extraplanar';
import guilds                 from 'data/groups/guilds';
import governments            from 'data/groups/governments';

export default {
  ...clansLemuria, 
  ...clansCibrin, 
  ...governments,
  ...orgs, 
  ...westernKoraxonGroups, 
  ...militaryOrders, 
  ...guilds, 
  ...extraplanar};

