import DataLoader from "components/utils/dataLoader";

export default function accountability () {

  const allData = DataLoader.all;
  const articleCount = Object.keys(allData).length;

  const missingDescriptions = Object.keys(allData).filter( x => {
    if (allData[x].description === undefined || allData[x].description.length < 1) {
      return true;
    }

    if ( allData[x].description !== undefined && allData[x].description.length >= 1 ) {
      let string = allData[x].description.join(" ");

      if ( ( string.match(/\./g) && string.match(/\./g).length >= 3 ) || string.length > 50 ) {
        return false;
      } else {
        return true;
      }
    }

    return false;
  });

  console.warn(`--------------------------------------------`);
  console.warn(`There are a total of ${articleCount} articles in the wiki.`);
  console.warn(`There are currently ${missingDescriptions.length} articles which lack a basic description.`); 

  // const missingArticles = Object.keys(allData).filter( x => {
  //   const articles = allData[x].articles && Object.keys(allData[x].articles).length;
  //   const dmArticles = allData[x].dmArticles && Object.keys(allData[x].dmArticles).length;

  //   if ( articles < 1 && dmArticles < 1 ) {
  //     return x;
  //   }
  // });

  // console.warn(`There are ${missingArticles.length} articles without content articles or dm articles.`);
  // console.warn(missingArticles);

  console.warn(`--------------------------------------------`);

}