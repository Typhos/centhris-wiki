import React, { Component } from 'react';
import Page from 'components/page';
import Back from 'components/back';

import 'styles/404.scss';
import image from 'img/404.png';

class Error404 extends Component {

  render () {
    const style = {
      backgroundImage: `url(${image})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center'
    };

    return (
      <Page.Error404>
        <Back/>
        <section id="error404" className="article" style={style} >
          <h2>404</h2>
          <h3>Sorry, That Does Not Appear to Exist on Centhris</h3>
        </section>
      </Page.Error404>
    )
  }
}

export { Error404 };

