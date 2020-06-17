
import dataLoader from "components/utils/dataLoader";

export default function SearchLogic (searchString, dmView) {
  const data = dataLoader.all;
  const dataKeys = Object.keys(data);
  const search = searchString;

  let finalResultsArray = [];

  
    // only check search strings if there are least 2 letters to the search
    let names = nameCheck(); 
    let info = informationCheck();

    return names.map( x => x.replace(/\s/g,"-") ).slice(0,9);

    // return orderResults(finalResultsArray);
  // }

  function nameCheck() {
    let array = [];
    let names = dataKeys.map( key => data[key].name );
    let nicknames = dataKeys.map( key => data[key].nickname );

    names = names.filter( n => {
      if (n) {
        return n.toLowerCase().includes(search) 
      }
    });

    nicknames = nicknames.filter( n => {
      if (n) {
        n.toLowerCase().includes(search);
      }
    });

    const uniqueSet = new Set( [...names, ...nicknames] );
    return [...uniqueSet];
  }

  function informationCheck() {
    let array = [];
    let descriptions = dataKeys.map( key => {
      let res = data[key].description;
      if (res) return res.join(" ");
    });

    // let articles = dataKeys.map( key => {
    //   let aObj = data[key].articles;
    //   if ( aObj ) {
    //     let aKeys = Object.keys(aObj);
    //     let text = aKeys.map( a => {
    //       if (a) {
    //         return aObj[a];
    //       }
    //     });
    //   }
    // }).join(" ");

    descriptions = descriptions.filter( x => x !== undefined ).filter( x => x.toLowerCase().includes(search) );
    // articles = articles.filter( x => articles.toLowerCase().includes(search) );

    // console.log(descriptions)
    // console.log(articles)
  }

  function orderResults (arr) {
    return arr;
  }
}