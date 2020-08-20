export default function getQueryByCategory(type) {
  const dmView = localStorage.getItem("dmView") === "true";

  switch (type) {
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
    default:
      return ``;
  }
}
