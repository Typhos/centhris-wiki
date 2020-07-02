
import dataLoader from "components/utils/dataLoader";

export default function SearchLogic (searchString, dmView) {
  const data = dataLoader.all;
  const dataKeys = Object.keys(data);
  const search = searchString;

  let finalResultsArray = [];

    finalResultsArray = [...nameCheck()];
    finalResultsArray = [...finalResultsArray, ...tagCheck()];
    finalResultsArray = [...finalResultsArray, ...informationCheck()];

    return orderResults(finalResultsArray);
  // }

  function searchResultObjectFomatting (entry, matchArray) {
    return {
      "name": entry,
      "displayName": data[entry].name,
      "count": matchArray.length + 1,
      "playerKnown": data[entry].playerKnown,
      "path": data[entry].path
    }
  }

  function nameCheck() {
    // check names, nicknames and linkingWords for matches
    let resultsArray = dataKeys.map( entry => {
      let checkArray = [data[entry].name, data[entry].nickname];

      if (data[entry].linkingWords) checkArray = [...checkArray, ...data[entry].linkingWords] 
      
      checkArray = checkArray.filter( n => {
        if (n) {
          return n.toLowerCase().includes(search) 
        }

        return undefined;
      });

      if (checkArray.length > 0) {
        return searchResultObjectFomatting(entry, checkArray);
      }

      return undefined;
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

          return undefined;
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

    let descriptions = dataKeys.map( entry => {
      let checkArray = [];
      let des = data[entry].description;

      if (des) {
        des = des.join(" ");

        if ( des.toLowerCase().includes(search) ) {
          const match = finalResultsArray.find( x => x.displayName === data[entry].name );

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

    
    return descriptions.filter(x => x !== undefined);
  }

  function orderResults (arr) {
    
    arr.sort( (a,b) => {
      if (a.count > b.count) {
        return -1
      } else if ( b.count > a.count ) {
        return 1;
      } else {

        if ( a.name >= b.name ) {
          return -1;
        } else {
          return 1;
        }

      }


    });

    return arr.slice(0,10);
  }
}