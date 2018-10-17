import React from 'react';
import {renderToString} from 'react-dom/server';
import {Helmet} from 'react-helmet';
import App from '../../src/index/App';
import serialize from 'serialize-javascript';
import {StaticRouter} from 'react-router-dom';

async function indexRenderer(appData, req, res) {

    const store = null


    // here is where we actually render the html, once we have the required asnyc data
    const content = renderToString(
        <StaticRouter location={req.path} context={{}}>
            <App/>
        </StaticRouter>);

    //Helmet renderStatic stores all the meta tags that were defined in the components
    const helmet = Helmet.renderStatic();

    return {
        helmet,
        content,
        //INITIAL_STATE: serialize(store.getState())
    };
}

module.exports = indexRenderer;
