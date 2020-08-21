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
            
            description
            articles
          }
        }
      `;
    default:
      return ``;
  }
}
