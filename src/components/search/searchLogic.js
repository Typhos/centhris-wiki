
import dataLoader from "components/utils/dataLoader";

export default function SearchLogic (searchString, dmView) {
  const data = dataLoader.all;
  const dataKeys = Object.keys(data);
  const search = searchString;

  let finalResultsArray = [];

  
    // only check search strings if there are least 2 letters to the search
    finalResultsArray = [...nameCheck()];
    let tags  = tagCheck();
    let info = informationCheck();

    finalResultsArray = [...finalResultsArray, ...tags, ...info]

    return orderResults(finalResultsArray);
  // }

  function searchResultObjectFomatting (entry, matchArray) {
    return {
      "name": entry,
      "displayName": data[entry].name,
      "count": matchArray.length,
      "playerKnown": data[entry].playerKnown,
      "path": data[entry].path
    }
  }

  function nameCheck() {
    // check names, nicknames and linkingWords for matches
    let resultsArray = dataKeys.map( entry => {
      let checkArray = [data[entry].name, data[entry.nickname]];
      if (data[entry].linkingWords) checkArray = [...checkArray, ...data[entry].linkingWords] 
      
      checkArray = checkArray.filter( n => {
        if (n) {
          return n.toLowerCase().includes(search) 
        }
      });

      if (checkArray.length > 0) {
        return searchResultObjectFomatting(entry, checkArray);
      }

    });

    return resultsArray.filter(x => x !== undefined);
  }

  function tagCheck () {

    // loop through all entries
    let resultsArray = dataKeys.map( entry => {
      let tags = data[entry].tags;
      let checkArray = [];

      // if the entry has a tags array (which all should)
      if (tags) {

        // reduce the entry array to only the tags that include the search string.
        // TODO: expand the search to include partial matches
        
        checkArray = tags.filter( e => {
          if (e) {
            return e.toLowerCase().includes(search);
          }
        });


        // if there are matches in the data to the search string
        if ( checkArray.length > 0 ) {
          const match = finalResultsArray.find( x => x.displayName === data[entry].name );
          
          // check for entries already added to the final array. 
          // if there was already a match, increment the count by one, otherwise make a new entry.

          if ( match ) {
            const index = finalResultsArray.findIndex( x => x.displayName === data[entry].name );
            
            finalResultsArray[index].count = finalResultsArray[index].count + 1;

            return undefined;
          } else {
            return searchResultObjectFomatting(entry, checkArray);
          }
        }
      }

      return undefined;
    });

    return resultsArray.filter(x => x !== undefined);
  }

  function informationCheck() {
    let array = [];
    let descriptions = dataKeys.map( key => {
      let res = data[key].description;
      if (res) return res.join(" ");
    });

    descriptions = descriptions.filter( x => x !== undefined ).filter( x => x.toLowerCase().includes(search) );
    array = [...descriptions]
    
    return array;
  }

  function orderResults (arr) {
    
    arr.sort( (a,b) => {
      if (a.count > b.count) {
        return 1
      } else if ( b.count > a.count ) {
        return -1;
      } else {

        if ( a.name >= b.name ) {
          return 1;
        } else {
          return -1;
        }

      }


    });

    return arr;
  }
}