import React from 'react';
import { Link } from 'react-router-dom';

import peopleData       from "data/people";
import characterData    from 'data/characters';

import loreData         from 'data/lore/lore';
import eventsData       from 'data/lore/events';
import godsData         from 'data/lore/gods';
import racesData        from 'data/lore/races';
import creaturesData    from 'data/lore/creatures';
import calendarData    from 'data/lore/calendar';

import orgData          from 'data/organizations';
// import dwarfRunes from '../../data/characters';

// ==== ALL DATA IMPORTS FOR LOCATIONS
import structures       from 'data/places/structures';
import worldRegions     from 'data/places/worldRegions';
import politicalStates  from 'data/places/politicalStates';
import cityDistricts    from 'data/places/cityDistricts';
import cityStates       from 'data/places/cityStates';
import settlements      from 'data/places/settlements';
import dungeons         from 'data/places/dungeons';
import fortifications   from 'data/places/fortifications';
import dwarfHolds       from 'data/places/dwarfHolds';
import mythic           from 'data/places/mythic';


export default class WikiUtils {

  static combinedPlaces = {...structures, ...worldRegions, ...cityDistricts, ...cityStates, ...settlements, ...dungeons, ...fortifications, ...dwarfHolds, ...politicalStates, ...mythic};
  static combinedLore = {...godsData, ...racesData, ...eventsData, ...creaturesData, ...loreData, ...calendarData};

  static sortByName (arr) {
    return arr.sort( (a,b) => {
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        return 0;
      }
    })
  }

  static linkContent(target, descriptionArray) {
    if ( !Array.isArray(descriptionArray) ) descriptionArray = [descriptionArray];

    let mapped = descriptionArray.map( (paragraph, index) => {

      // ensure that if the paragraph is a String or an Object, make it an Array.
      // 

      if ( !Array.isArray(paragraph) ) paragraph = [paragraph];

      const dataGroupsObj = {
        "person": peopleData,
        "player-character": characterData,  
        "location": this.combinedPlaces,      
        "lore": this.combinedLore,
        "group": orgData
      };

      for ( let [path, dataSet] of Object.entries(dataGroupsObj) ) {

        for ( let obj of Object.values(dataSet) ) {

          const namesObj = {
            linkingWords: obj.linkingWords,
            name: obj.name,
            nickname: obj.nickname
          };

          const linkingWords = this.createLinkingWordsArray(namesObj);
          const show = dataSet[ obj.name.replace(/\s/g,"-") ].playerKnown;

          // Only show content that is current listed for viewing by players.
          // If the DM view search para is enabled, show all content!
          if ( show || localStorage.getItem('dmView') === 'true' ) {

            linkingWords.forEach( (string, j) => {
              if (string !== undefined && string !== "") {
                const arrayCheck = this.arrayCheck(target, Object.keys(namesObj), linkingWords );
                const link = <Link key={`key-${j}-${string}`} to={ {pathname: `/${path}/${obj.name.replace(/\s/g,"-")}`, state: "update"}}>{string}</Link>;    

                if ( !arrayCheck ) {
                  const nP = paragraph;
                  paragraph = this.replaceNestedValue(nP, string, link);
                }
              }
            });
          }
        }
      }

      return <p className="linkedContent" key={target+index}>{paragraph}</p>;
    });

    return mapped;
  }

  static replaceNestedValue( dataset, name, link) {

    for ( let i in dataset ) {
      if ( Array.isArray(dataset[i]) ) {
        dataset[i].map( subArr => {
          this.replaceNestedValue(subArr, name, link);
        });  
      }

      if ( typeof dataset[i] === 'string' ) {
        if ( dataset[i].includes(name) ) {
          let strReplace = dataset[i].replace(name, `|${name}|`).split("|").map( str => ( str === name ) ? link : str);

          dataset[i] = strReplace;
        }
      }
    }

    return dataset.flat(Infinity)
  }

  static createLinkingWordsArray(obj) {
    if ( Array.isArray(obj.linkingWords) ) {
      let resp = [obj.name, obj.nickname];
      obj.linkingWords.forEach( x => resp.push(x) );

      resp = resp
        .flat()
        .sort( (a,b) => {
          if (a.length > b.length) {
            return -1;
          } else if (a.length < b.length) {
            return 1;
          } else {
            return 0;
          }
        })

      return resp;
    }

    return ( obj.name.length > obj.nickname.length ) ? [obj.name, obj.nickname] : [obj.nickname, obj.name];
  }

  static arrayCheck(activePerson, keys, namesArray) {

    return keys.some( key => {
      if ( activePerson[key] ) {
        let forceArray = ( Array.isArray(activePerson[key]) ) ? activePerson[key] : [activePerson[key]];

        return namesArray.some( words => {
          if ( words.includes(activePerson[key]) ) {
            if ( [words].some( word => word === activePerson[key] ) ) {
              return true;
            }
          }
        });
      }

      return false;

    });

  }
  
}