import React from 'react';
import { Link } from 'react-router-dom';
import DataLoader from 'components/utils/dataLoader';
import Modal from 'components/utils/modal';

export default class WikiUtils {

  static combinedPlaces = DataLoader.places;
  static lore = DataLoader.lore;
  static peopleData = DataLoader.people;
  static characterData = DataLoader.characters;
  static orgData = DataLoader.organizations;
  static gods = DataLoader.gods;
  static calendar = DataLoader.calendar;
  static historical = DataLoader.historical;

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
    const images = require.context('img', true);

    // This function allows for content entries to be formatted before linking. 
    // Text in entries must be wrapped with a specific indicator in order to receive the following formatting:
    // No Links      =   @~ string ~@  
    // ITALICS       =   @* string *@
    // BOLD          =   @+ string +@
    // H4            =   @# string #@
    // super         =   @^ string ^@
    // colorize      =   @; string ;@
    // external link =   @? string | url ?@
    // inline img    =   @& imgurl | caption &@

    if (typeof entryData === "string") entryData = [entryData];

    if ( Array.isArray(entryData) ) {

      entryData = entryData.map( string => {

        // split the string by the @ marker to ensure proper replacements
        return string.split(/@(.*?)@/).map( substr => {

          // Test for various markers only at the start and end of each string
          if ( /^\*(.*?)\*$/.test(substr) ) {

            substr = substr.replace(/\*/g,"");
            substr = <i key={substr}>{substr}</i>;

          } else if ( /^~(.*?)~$/.test(substr) ) {

            substr = substr.replace(/~/g, "");
            substr = <span>{substr}</span>;

          } else if ( /^\+(.*?)\+$/.test(substr) ) {

            substr = substr.replace(/\+/g, "");
            substr = <strong key={substr}>{substr}</strong>;

          } else if ( /^\^(.*?)\^$/.test(substr) ) {

            substr = substr.replace(/\^/g, "");
            substr = <sup key={substr}>{substr}</sup>;
          
          } else if ( /^#(.*?)#$/.test(substr) ) {
            
            substr = substr.replace(/#/g, "");
            substr = <h4 className="subheading" key={substr}>{substr}</h4>;
          
          } else if ( /^;(.*?);$/.test(substr) ) {
            
            substr = substr.replace(/;/g, "");
            substr = <span className="colorize" key={substr}>{substr}</span>;
          
          } else if ( /^\?(.*?)\?$/.test(substr) ) {
            
            substr = substr.replace(/\?/g, "");
            const text = substr.split(/\|/)[0];
            const url = substr.split(/\|/)[1];

            substr = <a href={url} className="externalLink">{text}</a>;
          
          } else if ( /^&(.*?)&$/.test(substr) ) {
            
            substr = substr.replace(/&/g, "");
            const path = substr.split(/\|/)[0];
            const caption = substr.split(/\|/)[1];
            const position = substr.split(/\|/)[2];
            const inlineImg = images.keys().filter(x => x === path);

            substr = <figure className={`articleImgBox ${ (position) ? position : ""}`}>
                      <a href={`${images(`${inlineImg}`)}`} target="_blank" rel="noopener noreferrer">
                        <img src={`${images(`${inlineImg}`)}`} className="articleImg" alt={caption} onClick={this.expandedImageModal} />
                      </a>
                      <figcaption className="imgCaption">{caption}</figcaption>
                    </figure>;

          }

          return substr;
        });
      });
    }

    return entryData;
  }

  static expandedImageModal (e) {
    // TODO: MAKE MODAL POPUP FOR IMAGES
  }

  static linkContent(target, descriptionArray) {

    if ( !Array.isArray(descriptionArray) ) descriptionArray = [descriptionArray];

    let mapped = descriptionArray.map( (paragraph, index) => {

      // ensure that if the paragraph is a String or an Object, make it an Array.
      // 

      if ( !Array.isArray(paragraph) ) paragraph = [paragraph];

      const dataGroupsObj = {
        "person": this.peopleData,
        "player-character": this.characterData,  
        "location": this.combinedPlaces,      
        "lore": {...DataLoader.lore, ...DataLoader.gods},
        "creature": DataLoader.creatures,
        "history": this.historical,
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

      paragraph = paragraph.filter( x => x !== "" );

      if ( paragraph[0] && (paragraph[0].type === "h3" || paragraph[0].type === "h4" ) ) {
        return paragraph;
      } else {
        return <p className="linkedContent" key={target+index}>{paragraph}</p>;
      }
    });

    return mapped;
  }

  static replaceNestedValue( dataset, name, link) {

    for ( let i in dataset ) {
      if ( Array.isArray(dataset[i]) ) {
        dataset[i].map( subArr =>  this.replaceNestedValue(subArr, name, link) );  
      }

      if ( typeof dataset[i] === 'string' ) {
        let matcher = new RegExp(name + "[" + /\s/ + ".,;!?\"()':-]","g");
        if ( matcher.test(dataset[i]) || dataset[i] === name ) {
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