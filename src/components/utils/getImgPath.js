export default class getImgPath {

  constructor (id, entry, style) {
    this.id = id;
    this.entry = entry;
    this.style = style;
  }

  get src () {
    return this.imgSrc();
  }

  imgSrc () {
    const images = require.context('img/', true);
    const foldersToAvoid = ["maps/","crests/","currency/"];

    let imgPath = undefined;

    if ( this.entry && this.entry.forceImg ) {
      this.id = this.entry.forceImg;
    }

    let imgExists = images.keys().some( x => x.includes( this.id ) );

    if ( imgExists) {
      const len = images.keys().filter( x => x.includes( this.id ) ).length;
      let pathArray = images.keys().filter( x => x.includes( this.id ) );

      // remove entries in the folders to avoid, such as maps, coins or crests.
      if ( this.entry ) {
        pathArray = pathArray.filter( path => ( foldersToAvoid.some( folder => path.includes(folder)) ) ? false : path );
      }
     
      if ( len === 1 ) {
        // one image? display it.
        imgPath = pathArray;

      } else if ( len > 1 ) {
        // multiple images with the keyword? sort it out.

        let testArray = pathArray.map( item => {
          // split up path by / and . then remove image extensions
          let imgName = item.split(/[/.]/g).filter( x => x !== "" && !(/(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(x) );
          return imgName = imgName[ imgName.length - 1 ];
        });

        // test each fileName for the best match with the entry ID
        let bestMatch = "";
        let matchPercent = -1;

        testArray.forEach( str => {
          const diff = (diffMe, diffBy) => diffMe.split(diffBy).join('');

          const strLen = str.length;
          const compareLen = diff(str, this.id).length;

          if ( (strLen - compareLen) / strLen * 100 > matchPercent ) {
            matchPercent = (strLen - compareLen) / strLen * 100;
            bestMatch = str;
          }

        });

        // path is set to the index it matches in the pathArray
        imgPath = pathArray[ testArray.indexOf(bestMatch) ];
      }
    }

    if ( !imgPath ) {
      imgPath = (this.style === "portrait") ? './portraits/unknown.jpg' : './placeholder.png';
    }

    return images(imgPath);
  }
}