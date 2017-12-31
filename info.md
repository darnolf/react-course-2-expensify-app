## Remove Global modules

Uninstall Global Dependencies:

```
npm uninstall -g babel-cli
```
Install Local

```
npm install live-server babel-cli@6.24.1
```
Now live-server/babel are not available from console, setup scripts in package.json

```javascript
    "scripts": {
        "serve": "live-server public/",
        "build-babel": "babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch"
    },
```
To run those modules type:
```
npm run serve
npm run build-babel
```
## Install Webpack

```
npm install webpack@3.1.0
```
Add script command to package.json
```
"build": "webpack"
```

* Create file on root folder: ```webpack.config.js```

* To get absolute machine full path add ```console.log(__dirname); ``` to top of webpack.config.js

* Then in terminal run: `node webpack.config.js`

* It will return the absolute path to root folder:  `console.log(__dirname);`

*webpack.config.js*
```javascript
const path = require('path');
// console.log(path.join(__dirname, 'public'));

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    }
}
```
```
npm run serve
npm run build
```

## Install REACT

* Install NPM packages:
```
npm install react@16.0.0 react-dom@16.0.0
```
* Import REACT to app.js
```
import React from 'react';
import ReactDOM from 'react-dom';
```
* Test import without JSX, no BABEL running yet:
```
const template = React.createElement('p', {}, 'Testing React - No Babel');
ReactDOM.render(template, document.getElementById('app'));
```

## Install BABEL
* Install NPM packages, babel-core lets you run commands from webpack
```
npm install babel-core@6.25.0
npm install babel-loader@7.1.1
```
* Add rules for webpack to use loader and trigger babel in `webpack.config.js`
```javascript
module: {
    rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
    }]
}    
```
* Create babel PRESETS file `.babelrc`

```javascript
{
    "presets": ["env","react"]
}
```
* Test BABEL output on app.js:
```
const template = <p>THIS IS JSX FROM WEBPACK !!</p>
ReactDOM.render(template, document.getElementById('app'));
```
## Install WEBPACK DEV SERVER

* Install NPM package:
```
npm install webpack-dev-server@2.5.1
```
* Configure public folder in `webpack.config.js`
```
    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
```
* Setup script trigger in package.json (Remove build-babel and --watch)
```javascript
    "scripts": {
        "serve": "live-server public/",
        "build": "webpack",
        "dev-server": "webpack-dev-server"
    },
```
## Transform CLASS babel plugin

```
npm install babel-plugin-transform-class-properties@6.24.1
```
* Configure in .babelrc
```
{
    "presets": ["env", "react"],
    "plugins": ["transform-class-properties"]
}
```
* The results, no constructor needed, no manual binding
* Converts es6 methods to class properties.

```javascript
class OldSyntax {
    constructor() {
        this.name = 'Mike';
    }
}

const oldSyntax = new OldSyntax();
console.log(oldSyntax);

// OldSyntax {name: "Mike"}

class NewSyntax {
    name = 'Jen';
}

const newSyntax = new NewSyntax();
console.log(newSyntax);

// OldSyntax {name: "Jen"}

```

## Install REACT MODAL
```
npm install react-modal@2.2.2
```

## Configure Webpack to load CSS

* Install NPM packages
```
npm install style-loader@0.18.2
npm install css-loader@0.28.4

```
* Add loader rules to webpack.config.js

* *`loader` is for a single loader, `use` takes an array of multiple loaders*

```javascript
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]

        }]
    },
```
* Import ./styles/styles.css in app.css
```
import './styles/styles.css'
```

### At this point, we load CSS from ./styles/styles.css

## Configure Webpack to load SCSS/SASS (compiler)

* Adding SASS compiler
```
npm install sass-loader@6.0.6
npm install node-sass@4.5.3
```
* Add sass loader to `webpack.config.js`
```javascript
use: [
    'style-loader',
    'css-loader',
    'sass-loader'
]
```   
* Add CSS normalizer reset from NPM.

```
npm install normalize.css@7.0.0
```
* Import in app.js
```
import 'normalize.css/normalize.css';
```         
* Fix webpack rule to accept css and scss adding '?' conditional
```
test: /\.s?css$/,
```

## Install REACT ROUTER to handle CLIENT SIDE ROUTING

Link: *https://reacttraining.com/react-router/*

* Install NPM package
```
npm install react-router-dom@4.2.2
```
* Import router to app.js
```
import {BrowserRouter, Route } from 'react-router-dom';
```
* Configure webServer in webpack.config.js to fallback to index.html

When routing a web-app, the routing is internal and not handled by the server, so /about will look for that page in the server. We configure webpack to allways fall-back to index.html and let react router to hanlde the routing.

```javascript
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    }
```
* Stop the server (Ctrl + C) and re-run: `npm run dev-server`

* To hadle path="/" which is a match for all routes, add `exact={true}`

* To handle a non existing path, use <switch> component.
```
import {BrowserRouter, Route, Switch } from 'react-router-dom';
```
* Add router Switch component to JSX:
```javascript
const ExpenseDashboardPage = () => (
    <div>
        This is from my Dashboard Component
    </div>
);

const AddExpensePage = () => (
    <div>
        This is from my add expense Component
    </div>
);

const NotFoundPage = () => (
    <div>404 !</div>
)

const routes = (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={ExpenseDashboardPage} exact={true} />
            <Route path="/create" component={AddExpensePage} />
            <Route path="/edit" component={EditExpensePage} />
            <Route path="/help" component={HelpPage} />
            <Route component={NotFoundPage} />       
        </Switch>
    </BrowserRouter>
);
```
*Now there will only be a match if none of the above routes are true*

## Create client side redirect with LINK component

```
import { Link } from 'react-router-dom'

<Link to="/about">About</Link>
```
* Get active link with NavLink react-router-dom component:
```
import { NavLink } from 'react-router-dom'

<NavLink to="/">Home</NavLink>
```
*By default the provded class is `'active'`, can be customized class name*
```
<NavLink to="/" activeClassName="is-active">Dashboard</NavLink>
```
*Since the path '/' always matches, we need to add `exact={true}` to NavLink for `/`*

```
<NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
<NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
```
## Install REDUX (Standalone for learning)

```
npm install redux@3.7.2
```
* Basic setup:
```
import { createStore} from 'redux';

const store = createStore((state = {count: 0}) => {
    return state;
});

console.log(store.getState())
```

## Install NPM UUID

```
npm install uuid@3.1.0

import uuid from 'uuid';

id: uuid() 

```

## Install Babel object spread operator {...obj}

```
npm install babel-plugin-transform-object-rest-spread
```
* Add plugin to `.babelrc`

```javascript
    "plugins": [
        "transform-class-properties",
        "transform-object-rest-spread"
    ]
```    
* Result:

```javascript
const user = {
    name: 'Jen',
    age: 24
}

console.log({
    ...user,
    location: 'Karmiel',
    age: 49 // overrides age
});
```

## Install REACT-REDUX

* Get npm package:
```
npm install react-redux@5.0.5
```
* Import component to `app.js`
```
import { Provider } from 'react-redux'
```



## Install DATE-PICKER
* Get npm package:
```
npm install moment@2.18.1
npm install react-dates@12.7.0
npm install react-addons-shallow-compare@15.6.0
```
```
import moment from 'moment';
import { DateRangePicker, DatePicker } from 'react-dates';
````

## Install JEST testing framework

```
npm install jest@20.0.4
```
```json
    "scripts": {
        "serve": "live-server public/",
        "build": "webpack",
        "dev-server": "webpack-dev-server",
        "test": "jest"
    },
```

## Webpack Separate CSS files for PRODUCTION

```
npm install extract-text-webpack-plugin@3.0.0 
```
* Add to `webpack.config.js`
```
const CSSExtract = new ExtractTextPlugin('styles.css');
```
* Change rules down below:
```javascript
module: {
    rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
    }, {
        test: /\.s?css$/,
        use: CSSExtract.extract({
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ] 
            
        })
    }]
},
```

## Install EXPRESS production server

* Install NPM package:
```
npm install express@4.15.4
```
* Create folder `server` at root and file `server.js`
```javascript
const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public')

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
})

app.listen(3000, () => {
    console.log('The server is up at http:localhost://3000')
});
```
* Now run the server
```
node server/server.js
```
* Make sure to run `npm run build:prod` to make sure all production files are in place.

* Fix refresh browser issue, the /create or /help pages don't exist, has to force browser to always redirect to '/', where the client router will provide the contents from components. Here is the fix:
```javascript
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
})
```
## Setup HEROKU

* User windows installer and check with `heroku --version`
* Run: `heroku login` add credentials, email pass.
* Create project: `heroku create reactexpensify101` (Name maybe taken)
* Check created repository: `git remote -v`: (https://git.heroku.com/reactexpensify101.git)

* Heroku needs a START script defined in `package.json`, we have to tell it where is the node server.
```
"start": "node server/server.js"
```
* Heroku provided ports are dynamic, so we need to change `server/server.js` to take the provided port or fallback to 3000 (if local)
```javascript
const port = process.env.PORT || 3000
```
* Teach Heroku how to run Webpack to create the build. Add script to `package.json`
```
"heroku-postbuild": "npm run build:prod",
```
* Add dev and map files to `.gitignore`
```
public/bundle.js
public/bundle.js.map
public/styles.js
public/styles.js.map
```
* Now we start adding and pushing to the remote server.
```
git add .
git commit -m "Setup production build and server"
git push
git push heroku master

```
* URL to live app is now provided.

## Deploy General

* Move assets to folder `dist` and setup in package.json
```javascript
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },

---------------

        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
```

* Change `.gitignore` accordingly
```
node_modules/
public/dist/
```
* Add `/dist/` to css and js file links in "index.html"

```
npm run build:prod (Creates production build with assets in /dist)
npm run dev-server (works with virtual assets for development)
node server/server.js (Runs express node server on /dist final assets)
```
* Once tested on both servers it can ge commited
```
git commit -am "Setup dev dependencies and dist folder"
git push
git push heroku master
```

## Install NUMERALJS to format numbers or currencty

* Install NPM package:
```
npm install numeral@2.0.6
```




```javascript
const arr = [1, 2, 3, 4]
arr.map((val) => "<p>val</p>")
["<p>val</p>", "<p>val</p>", "<p>val</p>", "<p>val</p>"]

arr.filter((val) => val !== 4)
[1, 2, 3]

const arr =  [1, 2, 3, 4]
[...arr, 5, 6]
[1, 2, 3, 4, 5, 6]

```