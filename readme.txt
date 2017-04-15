======================= Huong dan tao seed-project cho MEAN (A2) =================
1. Update
a. Nodejs (https://askubuntu.com/questions/426750/how-can-i-update-my-nodejs-to-the-latest-version)
    sudo npm cache clean -f
    sudo npm install -g n

    sudo n stable / sudo n latest       (Chon 1 trong 2)

    sudo ln -sf /usr/local/n/versions/node/<VERSION>/bin/node /usr/bin/node

b. Express ( https://expressjs.com/en/starter/generator.html)
    sudo npm install express-generator -g


2. Tao project
   mkdir seed-project
   express . --hbs

   npm install
   npm start

   localhost:3000


3. Thay doi vai thu

    Rename routes/index.js  -> routes/app.js
    Rename public/javascripts -> public/js
    Rename views/index.jade -> views/index.hbs

    Remove views/error.jade , views/layout.jade
    Remove public/images
    Remove data in views/index.hbs
    Remove routes/users.js


    Change routes/app.js :

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var appRoutes = require('./routes/app');        (new)

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {                              (new)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE, OPTIONS");
    next();
});

app.use('/', appRoutes);                (new)

// catch 404 and forward to error handler               (new)
app.use(function (req, res, next) {
    res.render("index");
});

module.exports = app;


4. Install angular 2
- Them vao package.json (dependency)

    "@angular/animations": "^4.0.2",
    "@angular/common": "^4.0.0",
    "@angular/compiler": "^4.0.0",
    "@angular/compiler-cli": "^4.0.0",
    "@angular/core": "^4.0.0",
    "@angular/forms": "^4.0.0",
    "@angular/http": "^4.0.0",
    "@angular/platform-browser": "^4.0.0",
    "@angular/platform-browser-dynamic": "^4.0.0",
    "@angular/platform-server": "^4.0.0",
    "@angular/router": "^4.0.0",
    "@angular/upgrade": "^4.0.0",
    "core-js": "^2.4.1",
    "rxjs": "^5.1.0",
    "typescript": "^2.2.2",
    "zone.js": "^0.8.4"
    "body-parser": "~1.17.1",
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.3",
    "express": "~4.15.2",
    "hbs": "^4.0.1",
    "morgan": "~1.8.1",
    "serve-favicon": "~2.4.2",

- Them vao dev-dependency :  (Ve sau khi up online - se khong can nhung dependency nay)

    "@types/core-js": "^0.9.41",
    "@types/node": "^7.0.12",
    "angular2-router-loader": "^0.3.5",
    "angular2-template-loader": "^0.6.2",
    "awesome-typescript-loader": "^3.1.2",
    "del-cli": "^0.2.1",
    "html-loader": "^0.4.5",
    "raw-loader": "^0.5.1",
    "typescript": "^2.2.2",
    "webpack": "^2.4.1",
    "webpack-merge": "^4.1.0"


npm install --save-dev @types/core-js @types/node
npm install --save-dev webpack webpack-merge angular2-template-loader awesome-typescript-loader del-cli html-loader typescript angular2-router-loader raw-loader


    webpack-merge: create multiple different process for production mode and dev mode
    angular2-temmplate-loader: outsource and load them correctly
    awesome-typescript-loader: compile typescript to javascript
    del-cli: delete some file using cli
    html-loader: load template correctly
    typescript:
    angular2-router-loader: lazy loading
    raw-loader:


5. Typescript config (tsconfig.json)
    {
      "compilerOptions": {
        "module": "commonjs",
        "target": "es2015",
        "declaration": false,
        "noImplicitAny": false,
        "sourceMap": false,
        "moduleResolution": "node",
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true
      },
      "exclude": [
        "node_modules",
        "public/js"
      ]
    }


6. webpack.config.common.js

   var webpack = require("webpack");
   var path = require("path");

   module.exports = {
       entry: {
           "app": "./assets/app/main.ts"       // bootstrap angular 2
       },

       resolve : {
           extensions: [".js", ".ts"]
       },

       module: {
           loaders: [
               {
                   test: /\.ts$/,
                   loaders: ['awesome-typescript-loader', 'angular2-template-loader', 'angular2-router-loader']
               },
               {
                   test: /\.html$/,
                   loaders: 'html-loader'
               },
               {
                   test: /\.css/,
                   loader: 'raw-loader'
               }
           ]
       },

       plugins: [
           new webpack.ContextReplacementPlugin(
               /angular(\\|\/)core(\\|\/)@angular/,
               path.resolve(__dirname, '../src')
           )
       ]
   };




7. webpack.config.dev.js

    var webpackMerge = require("webpack-merge");
    var commonConfig = require("./webpack.config.common");

    module.exports = webpackMerge(commonConfig, {
        devtool: "cheap-module-evel-source-map",

        output: {
            path: __dirname + "/public/js/app",
            filename: "bundle.js",
            publicPath: "/js/app/",
            chunkFilename: "[id].chunk.js"
        }
    });


8. Creat angular 2
    mkdir assets
    mkdir assets/app

    touch app.component.ts, app.component.html, app.component.css, app.module.ts, main.ts, polyfills.ts

app.component.ts :

   import {Component} from "@angular/core";

   @Component({
       selector: "my-app",
       templateUrl: "./app.component.html",
       styleUrls: ["./app.component.css"]
   })
   export class AppComponent {

   }

app.component.html:

   <h1>Hello world! Coolis</h1>


app.component.css
    h1 {
        color: red;
    }


app.module.ts:

    import {NgModule} from "@angular/core";
    import {BrowserModule} from "@angular/platform-browser";

    import {AppComponent} from "./app.component";

    @NgModule({
        declarations: [AppComponent],
        imports: [BrowserModule],
        bootstrap: [AppComponent]

    })

    export class AppModule{
    }


main.ts:

    import "./polyfills";           // load production or dev mode

    import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

    import {AppModule} from "./app.module";

    platformBrowserDynamic().bootstrapModule(AppModule);        // bootstrap AppModule


polyfills.ts:

    import "core-js/es6";
    import "core-js/es7/reflect";
    require("zone.js/dist/zone");

    if(process.env.ENV === "production") {
        // Production
    } else {
        // Development
        Error["stackTraceLimit"] = Infinity;
        require("zone.js/dist/long-stack-trace-zone");
    }


- Chinh sua file: views/index.hbs

    <!doctype html>
    <html lang="en">
    <head>

        <base href="/">         (new)

        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Angular 2 Messenger</title>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"
              integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">      (new)

        <link rel="stylesheet" href="/stylesheets/style.css">           (new)

    </head>
    <body>

    <my-app>Loading...</my-app>             (new)

    <script src="/js/app/bundle.js"></script>           (new - All angular2 will be here)

    </body>
    </html>


- Update package.json
    {
      "name": "seed-project",
      "version": "0.0.0",
      "private": true,
      "scripts": {
        "start": "node ./bin/www",
        "build": "del public/js/app && webpack --config webpack.config.dev.js --progress --profile --watch"
      },
      "dependencies": {
        "@angular/animations": "^4.0.2",
        "@angular/common": "^4.0.0",
        "@angular/compiler": "^4.0.0",
        "@angular/compiler-cli": "^4.0.0",
        "@angular/core": "^4.0.0",
        "@angular/forms": "^4.0.0",
        "@angular/http": "^4.0.0",
        "@angular/platform-browser": "^4.0.0",
        "@angular/platform-browser-dynamic": "^4.0.0",
        "@angular/platform-server": "^4.0.0",
        "@angular/router": "^4.0.0",
        "@angular/upgrade": "^4.0.0",
        "body-parser": "~1.17.1",
        "cookie-parser": "~1.4.3",
        "core-js": "^2.4.1",
        "debug": "~2.6.3",
        "express": "~4.15.2",
        "hbs": "^4.0.1",
        "morgan": "~1.8.1",
        "rxjs": "^5.1.0",
        "serve-favicon": "~2.4.2",
        "zone.js": "^0.8.4"
      },
      "devDependencies": {
        "@types/core-js": "^0.9.41",
        "@types/node": "^7.0.12",
        "angular2-router-loader": "^0.3.5",
        "angular2-template-loader": "^0.6.2",
        "awesome-typescript-loader": "^3.1.2",
        "del-cli": "^0.2.1",
        "html-loader": "^0.4.5",
        "raw-loader": "^0.5.1",
        "typescript": "^2.2.2",
        "webpack": "^2.4.1",
        "webpack-merge": "^4.1.0"
      }
    }


- Chay app:
    npm run build
    npm run start

    localhost:3000
