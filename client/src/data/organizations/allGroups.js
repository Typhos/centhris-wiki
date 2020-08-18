import clansLemuria           from 'data/organizations/clansLemuria';
import clansCibrin            from 'data/organizations/clansCibrin';
import westernKoraxonGroups   from 'data/organizations/westernKoraxon';
import militaryOrders         from 'data/organizations/militaryOrders';
import orgs                   from 'data/organizations/organizations';
import extraplanar            from 'data/organizations/extraplanar';
import guilds                 from 'data/organizations/guilds';
import governments            from 'data/organizations/governments';

export default {
  ...clansLemuria, 
  ...clansCibrin, 
  ...governments,
  ...orgs, 
  ...westernKoraxonGroups, 
  ...militaryOrders, 
  ...guilds, 
  ...extraplanar};

