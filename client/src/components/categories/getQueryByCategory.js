export default function getQueryByCategory(type) {
  const dmView = localStorage.getItem("dmView") === "true";

  switch (type) {
    case "locations":
      return ` 
        query Location {
          location( hideOnCat: false ${dmView ? "" : ", playerKnown: true"} )  {
            id
            name
            nickname
            path
            type
            forceImg
            
            description
            articles
          }
        }
      `;
    case "lore":
      return ` 
        query Lore {
          lore( hideOnCat: false ${dmView ? "" : ", playerKnown: true"} )  {
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
    case "organizations":
      return ` 
        query Organization {
          organization( hideOnCat: false ${dmView ? "" : ", playerKnown: true"} )  {
            id
            name
            nickname
            path
            type
            forceImg

            description
            articles
          }
        }        
      `;
    case "items":
      return ` 
        query Item {
          item ( hideOnCat: false ${dmView ? "" : ", playerKnown: true"} )  {
            id
            name
            nickname
            path
            type
            forceImg

            description
            articles
          }
        }        
      `;
    case "creatures":
      return ` 
        query Creature {
          creature ( hideOnCat: false ${dmView ? "" : ", playerKnown: true"} )  {
            id
            name
            nickname
            path
            type
            forceImg
            
            description
            articles
          }
        }        
      `;
    default:
      return ``;
  }
}
