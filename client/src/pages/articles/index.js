import React, { Component } from "react";
import axios from "axios";
import { TitleComponent } from "components/titleComponent.js";

import Loading from "components/loading";
import Page from "components/page";
import Back from "components/back";
import InfoCard from "components/infoCard";

import buildQuery from "components/articles/buildQuery";

import noData from "../../img/data-not-found.webp";

import WikiUtils from "components/utils/wikiUtils";
// import DataLoader from "components/utils/dataLoader";

class Article extends Component {
  constructor(props) {
    super(props);

    const pathArray = window.location.pathname.split("/").filter((str) => str !== "/" && str !== "");
    const type = pathArray[0];
    const articleName = pathArray[1];

    this.state = {
      dmView: localStorage.getItem("dmView") === "true",
      articleName: articleName,
      loading: true,
      pageData: undefined,
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
    const { type, articleName } = this.state;

    try {
      const response = await axios.post("/graphql", {
        query: buildQuery(type, articleName),
      });

      if (response.statusText !== "OK") {
        throw Error(response.statusText);
      }

      let data = Object.values(response.data.data)[0];

      this.setState({
        loading: false,
        pageData: data,
        requestError: false,
      });
    } catch (err) {
      this.setState({ requestError: true, loading: false });
      console.error(err);
    }
  }

  render() {
    const { articleName, loading, requestError, pageData, type } = this.state;

    return (
      <Page.Article>
        <TitleComponent title={`${articleName} - Centhris Wiki`} />
        <Back />

        {loading && <Loading />}

        {requestError && (
          <div className='error'>
            <h2 className='error__heading'>Sorry, this page is having problems</h2>
            <p className='error__text'>
              There seems to have been an issue getting the <em>{articleName}</em> article.
            </p>
            <img src={noData} />
          </div>
        )}

        {pageData && (
          <article className='article'>
            <h1 className='article__heading'>{pageData.nickname}</h1>

            <InfoCard entry={pageData} display={type} />

            <section className='article__content'>
              {pageData.quote ? <em className='article__quote'>{pageData.quote}</em> : ""}

              {pageData.description &&
                pageData.description.map((str, i) => {
                  return (
                    <p key={articleName + "_description_" + i} className='article__paragraph'>
                      {WikiUtils.textFormatting(str)}
                    </p>
                  );
                })}
            </section>
          </article>
        )}

        {}
      </Page.Article>
    );
  }
}

export { Article };

// constructor(props) {
//   super(props);

//   const pathArray = window.location.pathname.split("/").filter(str => str !== "/" && str !== "");
//   const type = pathArray[0];
//   const entryName = pathArray[1];

//   this.state = {
//     "pathname": window.location.pathname,
//     "type": type,
//     "entry": DataLoader.all[ decodeURI(entryName) ],
//     "dmView": localStorage.getItem('dmView') === 'true'
//   }

//   this.getArticles = this.getArticles.bind(this);
// }

// static getDerivedStateFromProps (nextProps, prevState){
//   const pathArray = window.location.pathname.split("/").filter(str => str !== "/" && str !== "");
//   const type = pathArray[0];
//   const entryName = pathArray[1];

//   if ( nextProps.location.pathname !== prevState.pathname ) {
//     return {
//       "pathname": nextProps.location.pathname,
//       "type": type,
//       "entry": DataLoader.all[ decodeURI(entryName) ]
//     };
//   }
//   return null;
// }

// getArticles(articles) {
//   const {entry} = this.state;
//   let content = [WikiUtils.linkContent(entry, WikiUtils.textFormatting( entry.description), {"paragraphName": "article__paragraph", "linkName": "article__link"} )];

//   if (entry.articles) {
//     for ( let [heading, array] of Object.entries(articles) ) {
//       content.push(
//         <React.Fragment key={heading}>
//           <h2 className="article__headline">{heading}</h2>
//           {WikiUtils.linkContent(entry,  WikiUtils.textFormatting( array), {"paragraphName": "article__paragraph", "linkName": "article__link"} )}
//         </React.Fragment>
//       );
//     }
//   }

//   if ( this.state.dmView && entry.dmArticles ) {
//     for ( let [heading, array] of Object.entries(entry.dmArticles) ) {
//       content.push(
//         <React.Fragment key={heading}>
//           <h2 className="article__headline">{heading}</h2>
//           {WikiUtils.linkContent(entry,  WikiUtils.textFormatting( array ), {"paragraphName": "article__paragraph", "linkName": "article__link"} )}
//         </React.Fragment>
//       );
//     }
//   }

//   return content;
// }

// render () {
//   const { entry, type } = this.state;

//   if ( !entry ) {
//     return (
//       <Redirect to="/404" />
//     )
//   }

//   return (
//     <Page.Article>
//       <TitleComponent title={`${entry.name} - Centhris Wiki`} />

//       <Back/>

//       <article className="article" id={entry.name.replace(/\s/g,"-")}>
//         <h1 className="article__heading">{entry.nickname}</h1>

// <InfoCard entry={entry} display={type} />

// <section className="article__content">
//   { WikiUtils.stubCheck(entry) }
//   { (entry.quote) ? <em className="article__quote">{entry.quote}</em> : ""}

//   {
//     this.getArticles(entry.articles)
//   }
// </section>

//       </article>
//     </Page.Article>
//   )
// }
