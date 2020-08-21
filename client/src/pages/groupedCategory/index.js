import React, { Component } from "react";
import axios from "axios";
import { TitleComponent } from "components/titleComponent.js";

import Loading from "components/loading";
import Page from "components/page";
import Back from "components/back";
import getQueryByCategory from "components/categories/getQueryByCategory";
import CategoryGroupUpdated from "components/categories/categoryGroupUpdated";

import noData from "../../img/data-not-found.webp";

class GroupedCategory extends Component {
  constructor(props) {
    super(props);

    const pathArray = window.location.pathname.split("/").filter((str) => str !== "/" && str !== "");
    const type = pathArray[0].replace("Category", "");

    this.state = {
      articles: undefined,
      categories: undefined,
      dmView: localStorage.getItem("dmView") === "true",
      loading: true,
      pageData: [],
      requestError: false,
      type: type,
    };

    this.getData = this.getData.bind(this);
  }

  static getDerivedStateFromProps(_, prevState) {
    const pathArray = window.location.pathname.split("/").filter((str) => str !== "/" && str !== "");

    const type = pathArray[0].replace("Category", "");

    if (prevState.type !== type) {
      return {
        articles: undefined,
        categories: undefined,
        loading: true,
        pageData: [],
        requestError: false,
        type: type,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.path !== this.props.match.path) {
      console.log("url update");
      this.getData();
    }
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const { type } = this.state;

    try {
      const response = await axios.post("/graphql", {
        query: getQueryByCategory(type),
      });

      if (response.statusText !== "OK") {
        throw Error(response.statusText);
      }

      let data = Object.values(response.data.data)[0].sort((a, b) => {
        if (a.name < b.name) return -1;
        return 1;
      });

      this.setState({
        type: type,
        articles: data,
        categories: this.getCategoryListFromData(data),
        loading: false,
        pageData: data,
      });
    } catch (err) {
      this.setState({ requestError: true, loading: false });
      console.error(err);
    }
  }

  getHeading(type) {
    switch (type) {
      default:
        return type.substring(0, 1).toUpperCase() + type.substring(1);
    }
  }

  getCategoryListFromData(data) {
    let categories = data.map((entry) => entry.type).sort();
    return [...new Set(categories)];
  }

  render() {
    const { loading, type, categories, pageData, articles, requestError } = this.state;

    const numberOfArticles = pageData.length;

    return (
      <Page.Category>
        <TitleComponent title={`${type} - Centhris Wiki`} />
        <Back />

        {loading && <Loading />}

        {requestError && (
          <div className='error'>
            <h2 className='error__heading'>Sorry, this page is having problems</h2>
            <p className='error__text'>There seems to have been an issue getting articles for the {type} category.</p>
            <img src={noData} />
          </div>
        )}

        {categories && (
          <h1 className='category__heading'>
            {this.getHeading(type)}
            <small className='category__entryNumber'>
              ({numberOfArticles} {numberOfArticles > 1 || numberOfArticles === 0 ? "Entries" : "Entry"})
            </small>
          </h1>
        )}
        {categories && (
          <article className='category columns'>
            {categories.map((category) => {
              const heading = () => {
                if (category.endsWith("y")) {
                  return category.substring(0, category.length - 1) + "ies";
                } else if (category.toLowerCase().includes("lore")) {
                  return category;
                } else {
                  return category + "s";
                }
              };

              return (
                <CategoryGroupUpdated key={category} articles={articles} category={category} heading={heading()} pageData={pageData} />
              );
            })}
          </article>
        )}
      </Page.Category>
    );
  }
}

export { GroupedCategory };
