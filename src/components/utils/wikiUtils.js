import React from 'react';
import { Link } from 'react-router-dom';
import DataLoader from 'components/utils/dataLoader';

export default class WikiUtils {

  static combinedPlaces = DataLoader.places;
  static combinedLore = DataLoader.lore;
  static peopleData = DataLoader.people;
  static characterData = DataLoader.characters;
  static orgData = DataLoader.organizations;
  static gods = DataLoader.gods;
  static calendar = DataLoader.calendar;

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

  static textFormatting(entryData) {
    // This function allows for content entries to be formatted before linking. 
    // Text in entries must be wrapped with a specific indicator in order to receive the following formatting:
    // ITALICS  =   @>string<@
    // BOLD     =   @+string+@

    // check if we need to only format a string or a single array for various reasons (see pantheon page)
    if ( typeof entryData === "string" ) {
      entryData = entryData.split(/@(.*?)@/).map( substr => {
        if ( substr.includes(">") ) {
          substr = substr.replace(/>|</g, "");
          substr = <i>{substr}</i>;
        } else if ( substr.includes("+") ) {
          substr = substr.replace(/\+/g, "");
          substr = <strong>{substr}</strong>;
        } 

        return substr;
      });
    } else if ( Array.isArray(entryData) ) {
      entryData = entryData.map( string => {
        return string.split(/@(.*?)@/).map( substr => {
          if ( substr.includes(">") ) {
            substr = substr.replace(/>|</g, "");
            substr = <i key={substr}>{substr}</i>;
          } else if ( substr.includes("+") ) {
            substr = substr.replace(/\+/g, "");
            substr = <strong key={substr}>{substr}</strong>;
          } 

          return substr;
        });
      });
    }

    if (entryData.description) {
      // array of strings

      entryData.description = entryData.description.map( string => {
        return string.split(/@(.*?)@/).map( substr => {
          if ( substr.includes(">") ) {
            substr = substr.replace(/>|</g, "");
            substr = <i key={substr}>{substr}</i>;
          } else if ( substr.includes("+") ) {
            substr = substr.replace(/\+/g, "");
            substr = <strong key={substr}>{substr}</strong>;
          } 

          return substr;
        });
      });
    }

    if (entryData.articles) {
      // object of arrays
    }

    if (entryData.dmArticles) {
      // object of arrays
    }

    return entryData;
  }

  static linkContent(target, descriptionArray) {
    const allLore = {...this.combinedLore, ...this.gods,
      ...this.calendar};

    if ( !Array.isArray(descriptionArray) ) descriptionArray = [descriptionArray];

    let mapped = descriptionArray.map( (paragraph, index) => {

      // ensure that if the paragraph is a String or an Object, make it an Array.
      // 

      if ( !Array.isArray(paragraph) ) paragraph = [paragraph];

      const dataGroupsObj = {
        "person": this.peopleData,
        "player-character": this.characterData,  
        "location": this.combinedPlaces,      
        "lore": allLore,
        "group": this.orgData
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
                const link = ( obj.subcatLink )
                  ? <Link key={`key-${j}-${string}`} to={ {pathname: `/${obj.subcatLink}`, state: "update"}}>{string}</Link>
                  : <Link key={`key-${j}-${string}`} to={ {pathname: `/${path}/${obj.name.replace(/\s/g,"-")}`, state: "update"}}>{string}</Link>;

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
        dataset[i].map( subArr =>  this.replaceNestedValue(subArr, name, link) );  
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

        return namesArray.some( words => {
          if ( words.includes(activePerson[key]) ) {
            if ( [words].some( word => word === activePerson[key] ) ) {
              return true;
            }
          }
          return false;
        });
      }

      return false;

    });

  }
  
}