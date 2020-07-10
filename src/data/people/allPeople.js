import heroData             from 'data/people/heroes';
import villainData          from 'data/people/villains';
import nobleData            from 'data/people/nobles';
import importantPeopleData  from 'data/people/important';
import merchantsData        from 'data/people/merchants';
import historicalPeopleData from 'data/people/historical';
import mageData             from 'data/people/mages';
import miscPeopleData       from 'data/people/misc';
import archfeyData          from 'data/people/archfey';
import lordsOfTheFell       from 'data/people/lordsOfTheFell';

export default {...heroData,...villainData,...nobleData,...importantPeopleData,...merchantsData,...historicalPeopleData,...miscPeopleData, ...mageData, ...archfeyData, ...lordsOfTheFell};