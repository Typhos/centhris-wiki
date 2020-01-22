
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
  
}