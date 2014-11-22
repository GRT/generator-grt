## Usage

```sh
$ npm install -g generator-grt
$ mkdir my-new-project && cd $_
$ yo grt
$ grunt serve
```
## Stack

- AngularJS
- Lo-dash
- Grunt, a framework for running tests, compiling stylesheets, creating a production build of your app.
- Bower, a package manager for the browser making it easy to pull in 3rd party libraries
- LESS/
- Automated JavaScript testing stack:
  - Jasmine
  - Karma
  - Protractor
- Yoeman Generators
  - generating a new application
  - generate component



## Concantenate and minify css and js file and build with index.html in /dist directory

```sh
$ grunt build
```    

## Run ALL tests

```sh
$ grunt test
```    
    
## Run Protractor tests
```sh
$ grunt e2e
```   
## Run unit tests
```sh
$ grunt unittest
```   
    
## Create a new component
### Subgenerators will create files named per convention and organized by component name 

```sh    
$ yo grt:controller coolcomponent
$ yo grt:directive coolcomponent
$ yo grt:service coolcomponent
$ yo grt:view coolcomponent
$ yo grt:filter coolcomponent
$ yo grt:constant coolcomponent
$ yo grt:factory coolcomponent
$ yo grt:provider coolcomponent
$ yo grt:value coolcomponent
```

##### For adding a subcomponent to an existing component 

```sh    
$ yo grt:directive coolcomponent/subcomponent
```


## Directory Structure

- `bower_components` Installed third party libraries. Managed by [Bower](http://bower.io/), do not modify directly.
- `node_modules`
- `bower.json` Third party libraries
- `Gruntfile.js` [Grunt](http://gruntjs.com/) build file. 
- `package.json` Any `npm` dependencies 
- `README.md`


## Generated App Includes some sample code to demonstrate sytax and style
    app/app.js    
    app/welcome/sampleDecorator
    app/welcome/sampleDirective
    app/welcome/sampleFactory
    app/welcome/sampleProvider
    app/welcome/sampleService
    app/welcome/welcome.controller.js
    app/welcome/welcome.controller.spec.js
    app/welcome/welcome.html
    app/welcome/welcome.less

###To Remove the Sample Components
    grunt remove_sample

------

##Make sure you're familiar with these included dependencies
  
####AngularJS [https://docs.angularjs.org/api](https://docs.angularjs.org/api)
####Lo-Dash [http://lodash.com/](http://lodash.com/)
####jQuery [http://api.jquery.com/](http://api.jquery.com)
####Bootstrap [http://getbootstrap.com/2.3.2/index.html](http://getbootstrap.com/2.3.2/index.html)

##License
[MIT license](http://opensource.org/licenses/MIT)