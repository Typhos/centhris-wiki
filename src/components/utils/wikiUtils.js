import React from 'react';
import { Link } from 'react-router-dom';

import peopleData from "../../data/people";
import placeData from "../../data/places";
import characterData from '../../data/characters';
import loreData from '../../data/lore';
import orgData from '../../data/organizations';

import dwarfRunes from '../../data/characters';

export default class WikiUtils {

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
        "group": orgData,
        "location": placeData
        // "races": raceData,
      };

      for ( let [path, dataSet] of Object.entries(dataGroupsObj) ) {

        for ( let obj of Object.values(dataSet) ) {

          const namesObj = {
            linkingWords: obj.linkingWords,
            name: obj.name,
            nickname: obj.nickname
          };

          const linkingWords = this.createLinkingWordsArray(namesObj);
          console.log(linkingWords)

          const show = dataSet[ obj.name.replace(/\s/g,"-") ].playerKnown;

          // Only show content that is current listed for viewing by players.
          // If the DM view search para is enabled, show all content!

          if ( show || localStorage.getItem('dmView') === 'true' ) {

            for ( let [key, nameValue] of Object.entries(namesObj) ) {

              // Links could be strings or an array of multiple linking strings, eg. Kingdom of Navolin, Navolin, Navolinian.
              // The linkingWords property is always an array, or undefined.
              // Loop through the any Arrays and link their individual strings
              if (Array.isArray(nameValue)) {

                nameValue.forEach( (string, j) => {
                  const arrayCheck = target[key] && Array.isArray(target[key]) && target[key].some( words => words.includes(string) );
                  const link = <Link key={`key-${index}-${j}-${string}`} to={ {pathname: `/${path}/${obj.name.replace(/\s/g,"-")}`, state: "update"}}>{string}</Link>;                  

                  // check to make sure the link does not link back to the same page:
                  // IF the target has a linking obj, eg. linkingWords
                  // AND the linking obj is an array 
                  // AND the linking array has the string we are linking to don't link.
                  if ( !arrayCheck ) {
                    const nP = paragraph;
                    paragraph = this.replaceNestedValue(nP, string, link);
                  }
                });

              } else {

                const link = <Link key={`key-${index}-${nameValue}`} to={ {pathname: `/${path}/${obj.name.replace(/\s/g,"-")}`, state: "update"}}>{nameValue}</Link>;

                if ( nameValue !== target[key] ) {
                  const nP = paragraph;
                  paragraph = this.replaceNestedValue(nP, nameValue, link);
                }

              }
            }
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
  
}