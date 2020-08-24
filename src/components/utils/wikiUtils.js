import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import Stub from "components/stub";
import DataLoader from "components/utils/dataLoader";
import getImgPath from "components/utils/getImgPath.js";

export default class WikiUtils {
  static combinedPlaces = DataLoader.places;
  static lore = DataLoader.lore;
  static peopleData = DataLoader.people;
  static characterData = DataLoader.characters;
  static orgData = DataLoader.organizations;
  static gods = DataLoader.gods;
  static calendar = DataLoader.calendar;
  static historical = DataLoader.historical;

  static sortByName(arr) {
    return arr.sort((a, b) => {
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  static textFormatting(entryData) {
    // This function allows for content entries to be formatted before linking.
    // Text in entries must be wrapped with a specific indicator in order to receive the following formatting:
    // No Links      =   @~ string ~@
    // ITALICS       =   @* string *@
    // BOLD          =   @+ string +@
    // H4            =   @# string #@
    // super         =   @^ string ^@
    // colorize      =   @; string ;@
    // HR            =   @---@
    // external link =   @? string | url ?@
    // inline img    =   @& image name | caption &@

    if (typeof entryData === "string") entryData = [entryData];

    if (Array.isArray(entryData)) {
      entryData = entryData.map((string, i) => {
        // split the string by the @ marker to ensure proper replacements
        return string.split(/@(.*?)@/).map((substr, j) => {
          // Test for various markers only at the start and end of each string
          if (/^\*(.*?)\*$/.test(substr)) {
            substr = substr.replace(/\*/g, "");
            substr = <em key={substr + j}>{substr}</em>;
          } else if (/^~(.*?)~$/.test(substr)) {
            substr = substr.replace(/~/g, "");
            substr = <span key={substr + j}>{substr}</span>;
          } else if (/^\+(.*?)\+$/.test(substr)) {
            substr = substr.replace(/\+/g, "");
            substr = <strong key={substr + j}>{substr}</strong>;
          } else if (/^\^(.*?)\^$/.test(substr)) {
            substr = substr.replace(/\^/g, "");
            substr = <sup key={substr + j}>{substr}</sup>;
          } else if (/^#(.*?)#$/.test(substr)) {
            substr = substr.replace(/#/g, "");
            substr = (
              <h4 className="article__subheading" key={substr + j}>
                {substr}
              </h4>
            );
          } else if (/^---$/.test(substr)) {
            substr = substr.replace(/-/g, "");
            substr = <hr className="hRule" />;
          } else if (/^;(.*?);$/.test(substr)) {
            substr = substr.replace(/;/g, "");
            substr = (
              <span className="colorize" key={substr + j}>
                {substr}
              </span>
            );
          } else if (/^\?(.*?)\?$/.test(substr)) {
            substr = substr.replace(/\?/g, "");
            const text = substr.split(/\|/)[0];
            const url = substr.split(/\|/)[1];

            substr = (
              <a href={url} key={substr + j} className="externalLink">
                {text}
              </a>
            );
          } else if (/^dr(.*?)dr$/.test(substr)) {
            // draconic font

            substr = substr.replace(/(^dr)|(dr$)/g, "");
            substr = (
              <span className="draconic" key={substr + j}>
                {substr}
              </span>
            );
          } else if (/^&(.*?)&$/.test(substr)) {
            substr = substr.replace(/&/g, "");

            const path = substr.split(/\|/)[0];
            const caption = substr.split(/\|/)[1];
            const position = substr.split(/\|/)[2];
            const imgSrc = getImgPath(path);

            substr = (
              <figure className={`figureBox ${position ? position : ""}`} key={substr + j}>
                <a href={imgSrc} target="_blank" rel="noopener noreferrer">
                  <img
                    src={imgSrc}
                    className="figureBox__img"
                    alt={caption}
                    onClick={this.expandedImageModal}
                  />
                </a>
                <figcaption className="figureBox__caption">{caption}</figcaption>
              </figure>
            );
          }

          return substr;
        });
      });
    }

    return entryData;
  }

  static expandedImageModal(e) {
    // TODO: MAKE MODAL POPUP FOR IMAGES
  }

  static linkContent(target, descriptionArray, { paragraphName, linkName } = {}) {
    if (!Array.isArray(descriptionArray)) descriptionArray = [descriptionArray];

    let mapped = descriptionArray.map((paragraph, index) => {
      // ensure that if the paragraph is a String or an Object, make it an Array.
      //

      paragraph = !Array.isArray(paragraph) ? (paragraph = [paragraph]) : paragraph;

      const dataGroupsObj = {
        person: this.peopleData,
        "player-character": this.characterData,
        location: this.combinedPlaces,
        lore: { ...DataLoader.lore, ...DataLoader.gods },
        organization: this.orgData,
        creature: DataLoader.creatures,
        history: this.historical,
      };

      // path is the key declared above in dataGroupObj
      // dataSet is the obj values
      for (let [path, dataSet] of Object.entries(dataGroupsObj)) {
        for (let obj of Object.values(dataSet)) {
          const idLinks = obj.idLinks ? Object.keys(obj.idLinks) : null;
          const namesObj = {
            idLinks: idLinks,
            linkingWords: obj.linkingWords,
            name: obj.name,
            nickname: obj.nickname,
          };

          const linkingWords = this.createLinkingWordsArray(namesObj);
          const show = dataSet[obj.name.replace(/\s/g, "-")].playerKnown;

          // Only show content that is current listed for viewing by players.
          // If the DM view parameter is enabled, show all content!
          if (show || localStorage.getItem("dmView") === "true") {
            let tempArray = paragraph;

            linkingWords.forEach((string, j) => {
              if (string !== undefined && string !== "") {
                const arrayCheck = this.arrayCheck(target, Object.keys(namesObj), linkingWords);

                let link = (
                  <Link
                    className={linkName}
                    key={`key-${j}-${string}`}
                    to={{ pathname: `/${path}/${obj.name.replace(/\s/g, "-")}`, state: "update" }}
                  >
                    {string}
                  </Link>
                );

                if (idLinks && idLinks.includes(string))
                  link = (
                    <Link
                      smooth
                      key={`key-${j}-${string}`}
                      to={{
                        pathname: `/${path}/${obj.name.replace(/\s/g, "-")}#${obj.idLinks[string]}`,
                        state: "update",
                      }}
                    >
                      {string}
                    </Link>
                  );
                if (obj.subcatLink)
                  link = (
                    <Link
                      className={linkName}
                      key={`key-${j}-${string}`}
                      to={{ pathname: `/${obj.subcatLink}`, state: "update" }}
                    >
                      {string}
                    </Link>
                  );

                if (!arrayCheck) {
                  tempArray = this.replaceNestedValue(tempArray, string, link);
                }
              }
            });

            paragraph = tempArray.filter((x) => x !== "");
          }
        }
      }

      if (paragraph[0] && (paragraph[0].type === "h3" || paragraph[0].type === "h4")) {
        return paragraph;
      } else {
        return (
          <p className={paragraphName ? paragraphName : "linkedContent"} key={target + index}>
            {paragraph}
          </p>
        );
      }
    });

    return mapped;
  }

  static replaceNestedValue(dataset, name, link) {
    for (let i in dataset) {
      if (Array.isArray(dataset[i])) {
        dataset[i].map((subArr) => this.replaceNestedValue(subArr, name, link));
      }

      if (typeof dataset[i] === "string") {
        const test = name.concat("[.,;!?'\":()/\\s-]");
        const punctuationMatcher = new RegExp(test, "gm");

        if (punctuationMatcher.test(dataset[i]) || dataset[i].includes(name)) {
          let strReplace = dataset[i]
            .replace(name, `|${name}|`)
            .split("|")
            .map((str) => (str === name ? link : str));

          dataset[i] = strReplace;
        }
      }
    }

    if (Array.isArray(dataset)) return dataset.flat(Infinity);

    return dataset;
  }

  static createLinkingWordsArray(obj) {
    if (Array.isArray(obj.linkingWords) || Array.isArray(obj.idLinks)) {
      let resp = [obj.name, obj.nickname];
      if (Array.isArray(obj.linkingWords)) {
        obj.linkingWords.forEach((x) => resp.push(x));
      }

      if (Array.isArray(obj.idLinks)) {
        obj.idLinks.forEach((x) => resp.push(x));
      }

      resp = resp.flat().sort((a, b) => {
        if (a.length > b.length) {
          return -1;
        } else if (a.length < b.length) {
          return 1;
        } else {
          return 0;
        }
      });

      return resp;
    }

    return obj.name.length > obj.nickname.length
      ? [obj.name, obj.nickname]
      : [obj.nickname, obj.name];
  }

  static arrayCheck(activePerson, keys, namesArray) {
    return keys.some((key) => {
      if (activePerson[key]) {
        return namesArray.some((words) => {
          if (words.includes(activePerson[key])) {
            if ([words].some((word) => word === activePerson[key])) {
              return true;
            }
          }
          return false;
        });
      }

      return false;
    });
  }

  static stubCheck(entry) {
    const ignored = ["spell", "item", "rune"];

    const quote = entry.quote || "";
    const description = entry.description.join(" ");
    const articles = entry.articles;
    let articleStr = "";

    if (ignored.some((cat) => cat === entry.path)) {
      return false;
    }

    if (articles) {
      articleStr = Object.keys(articles)
        .map((key) => {
          let ar = articles[key];

          return key.concat(" ", ar.join(" "));
        })
        .join(" ");
    }

    if (quote.length + description.length + articleStr.length <= 750) {
      return <Stub />;
    } else {
      return false;
    }
  }
}
