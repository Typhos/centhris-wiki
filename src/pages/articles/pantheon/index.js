import React, { Component } from "react";

import DataLoader from "components/utils/dataLoader";
import Back from "components/back";
import Filter from "components/filter";
import Page from "components/page";
import WikiUtils from "components/utils/wikiUtils";
import { TitleComponent } from "components/titleComponent.js";
import CategoryGroup from "components/categories/categoryGroup";

import "styles/categories.scss";

import banner from "img/lore/banners/pantheon-banner.jpg";

class Pantheon extends Component {
  constructor(props) {
    super(props);

    const data = DataLoader.gods;
    const dmView = localStorage.getItem("dmView") === "true";
    let filteredOutput = {};

    // filter out all of the player unknown characters. When making an API endpoint, refactor to just not send the hidden characters instead.
    for (let [key, obj] of Object.entries(data)) {
      if (!obj.hideOnCat && (obj.playerKnown || dmView)) {
        filteredOutput[key] = obj;
      }
    }

    // Get all categories from the category group, compile them into a big array, then use Set to eliminate duplicates
    // God categories are ordered based on the first appearance of a category group in the json data
    let categories = Object.keys(filteredOutput).map((entry) => data[entry].type);
    categories = [...new Set(categories)];

    this.state = {
      dmView: dmView,
      pageData: data,
      categories: categories,
      articles: WikiUtils.sortByName(Object.keys(filteredOutput)),
    };

    this.handleFilter = this.handleFilter.bind(this);
  }

  render() {
    const pantheonLore = DataLoader.lore["Centhrian-Pantheon"];

    return (
      <Page.CategoryArticle>
        <TitleComponent title={`Centhrian Pantheon - Centhris Wiki`} />
        <Back />

        <h1 className="article__heading">The Centhrian Pantheon</h1>
        <div
          className="article__banner"
          style={{
            backgroundImage: `url(${banner})`,
            backgroundPosition: "center 20%",
          }}
        ></div>

        <article id="pantheon" className="article">
          {WikiUtils.linkContent(
            { ...DataLoader.gods, ...pantheonLore },
            WikiUtils.textFormatting(pantheonLore.description),
            { paragraphName: "article__paragraph", linkName: "article__link" }
          )}
        </article>

        <div className="category">
          {this.state.categories.map((category) => {
            const heading = () => {
              if (category.endsWith("y")) {
                return category.substring(0, category.length - 1) + "ies";
              } else {
                return category + "s";
              }
            };

            return (
              <CategoryGroup
                key={category}
                fullWidth={true}
                articles={this.state.articles}
                category={category}
                heading={heading()}
                imgStyle={"portrait"}
                pageData={this.state.pageData}
              />
            );
          })}
        </div>
      </Page.CategoryArticle>
    );
  }

  handleFilter(results) {
    this.setState({ gods: results });
  }
}

export { Pantheon };
