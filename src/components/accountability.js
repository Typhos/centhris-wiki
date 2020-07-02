import DataLoader from "components/utils/dataLoader";

export default accountability () {

  const allData = DataLoader.all;

  console.log( Object.keys(allData).length );

}