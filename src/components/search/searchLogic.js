
import dataLoader from "components/utils/dataLoader";

export default function SearchLogic (searchString, dmView) {
  const data = dataLoader.all;
  const dataKeys = Object.keys(data);
  const search = searchString;

  let finalResultsArray = [];

  
    // only check search strings if there are least 2 letters to the search
    let names = nameCheck(); 
    let info = informationCheck();

    // console.log(names)

    return orderResults(names);
  // }

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
        return {
          "name": entry,
          "displayName": data[entry].name,
          "count": checkArray.length + 10,
          "playerKnown": data[entry].playerKnown,
          "path": data[entry].path
        }
      }

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