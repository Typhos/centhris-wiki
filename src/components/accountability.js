import DataLoader from "components/utils/dataLoader";
import WikiUtils from "components/utils/wikiUtils";

export default function accountability () {

  const allData = DataLoader.all;
  const articleCount = Object.keys(allData).length;

  const missingDescriptions = Object.keys(allData).filter( entry => {
    return ( WikiUtils.stubCheck( allData[entry] ) ) ? true : false;
  });

  const percentile = (100 - missingDescriptions.length / articleCount * 100).toFixed(1);

  console.info(
    `%c There are a total of ${articleCount} articles in the wiki. Of those, ${missingDescriptions.length} articles are stubs. \n ${percentile}% of the wiki is comprised of well written entries.\nThe following are stubs:`,
    'background: #222; color: #bada55; line-height: 20px; padding: 1.5em 25px;'
  );

  const missingArticles = Object.keys(allData).filter( entry => {
    return ( WikiUtils.stubCheck( allData[entry] ) ) ? true : false;
  });

  console.info(missingArticles);

}