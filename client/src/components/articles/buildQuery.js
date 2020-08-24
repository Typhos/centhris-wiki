export default function buildQuery(type, entry) {
  switch (type) {
    case "location":
      return ` 
        query Location {
          locationArticle( name: "${entry}" )  {
            id
            name
            nickname
            path
            type
            
            capital
            location
            area
            population
            demonyms
            government
            emblem
            currency
            leaders
            races
            regions
            
            description
            articles
          }
        }
      `;
    default:
      return ``;
  }
}
