import React, { Component } from "react";
import axios from "axios";

import DataLoader from "components/utils/dataLoader";
import Back from "components/back";
import Page from "components/page";
import WikiUtils from "components/utils/wikiUtils";
import { TitleComponent } from "components/titleComponent.js";
import CategoryGroup from "components/categories/categoryGroupUpdated";

import "styles/categories.scss";

import banner from "img/lore/banners/pantheon-banner.png";

class Pantheon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dmView: localStorage.getItem("dmView") === "true",
      loading: true,
      pageData: undefined,
      categories: undefined,
      articles: undefined,
    };

    this.handleFilter = this.handleFilter.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await axios.post("/graphql", {
        query: ` 
            query Gods {
              gods {
                id
                name
                nickname
                alignment
                trueName
                type
              }
            }
          `,
      });

      if (response.statusText !== "OK") {
        throw Error(response.statusText);
      }

      const data = response.data.data.gods;

      this.setState({
        loading: false,
        categories: this.getCategoryListFromData(data),
        pageData: data,
        articles: WikiUtils.sortByName(data),
      });
    } catch (err) {
      this.setState({ requestError: true });
      console.error(err);
    }
  }

  getCategoryListFromData(data) {
    let categories = data.map((entry) => entry.type);
    return [...new Set(categories)];
  }

  render() {
    const pantheonLore = DataLoader.lore["Centhrian-Pantheon"];

    return (
      <Page.CategoryArticle>
        <TitleComponent title={`Centhrian Pantheon - Centhris Wiki`} />
        <Back />

        <h1 className='article__heading'>The Centhrian Pantheon</h1>
        <div
          className='article__banner'
          style={{
            backgroundImage: `url(${banner})`,
            backgroundPosition: "center 20%",
          }}
        ></div>

        <article id='pantheon' className='article'>
          {WikiUtils.linkContent(
            { ...DataLoader.gods, ...pantheonLore },
            WikiUtils.textFormatting(pantheonLore.description),
            { paragraphName: "article__paragraph", linkName: "article__link" }
          )}
        </article>

        {this.state.categories && (
          <div className='category'>
            {this.state.categories.map((category) => {
              const { pageData } = this.state;
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
                  pageData={pageData}
                />
              );
            })}
          </div>
        )}
      </Page.CategoryArticle>
    );
  }

  handleFilter(results) {
    this.setState({ gods: results });
  }
}

export { Pantheon };
