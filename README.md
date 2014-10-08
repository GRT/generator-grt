## Usage

Install `generator-grt`:
```
npm install -g generator-grt
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo grt`
```
yo grt
```

Run `grunt` for building and `grunt serve` for preview



## Launch your app in the browser
    grunt serve
    
------

## Concantenate and minify css and js file and build with index.html in /dist directory
    grunt build
    
------
    
## Run ALL tests
    grunt test
    
## Run Protractor tests
    grunt e2e
    
## Run unit tests
    grunt unittest

------
    
## Create a new component
### Subgenerators will create files named per convention and organized by component name 
    yo grt:controller coolcomponent
    yo grt:directive coolcomponent
    yo grt:service coolcomponent
    yo grt:view coolcomponent
    yo grt:filter coolcomponent
    yo grt:constant coolcomponent
    yo grt:factory coolcomponent
    yo grt:provider coolcomponent
    yo grt:value coolcomponent
        
##### For adding a subcomponent to an existing component  
    yo grt:directive coolcomponent/subcomponent

------

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