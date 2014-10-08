(function () {
    'use strict';
    var path = require('path');
    var chalk = require('chalk');
    var util = require('util');
    var ScriptBase = require('../script-base.js');
    var angularUtils = require('../util.js');


    var Generator = module.exports = function Generator() {
      ScriptBase.apply(this, arguments);

      var bower = require(path.join(process.cwd(), 'bower.json'));
      var match = require('fs').readFileSync(path.join(
        this.env.options.appPath,
        'app.' + (this.env.options.coffee ? 'coffee' : 'js')
      ), 'utf-8').match(/\.when/);
      if (
        bower.dependencies['angular-route'] ||
        bower.devDependencies['angular-route'] ||
        match !== null
      ) {
        this.foundWhenForRoute = true;
      }

      this.hookFor('angular:controller');
      this.hookFor('angular:view');
    };

    util.inherits(Generator, ScriptBase);

    Generator.prototype.rewriteAppJs = function () {
      var coffee = this.env.options.coffee;

      if (!this.foundWhenForRoute) {
        this.on('end', function () {
          this.log(chalk.yellow(
            '\nangular-route is not installed. Skipping adding the route to ' +
            'app.' + (coffee ? 'coffee' : 'js')
          ));
        });
        return;
      }

      this.uri = this.name;
      if (this.options.uri) {
        this.uri = this.options.uri;
      }

      var config = {
        file: path.join(
          this.env.options.appPath,
          'app.' + (coffee ? 'coffee' : 'js')
        ),
        needle: '.otherwise',
        splicable: [
          '  templateUrl: "components/' + this.name.toLowerCase() + '/' + this.name.toLowerCase() + '.html"' + (coffee ? '' : ',' ),
          '  controller: "' + this.classedName + 'Ctrl"'
        ]
      };

      if (coffee) {
        config.splicable.unshift('.when "/' + this.uri + '",');
      }
      else {
        config.splicable.unshift('.when("/' + this.uri + '", {');
        config.splicable.push('})');
      }

      angularUtils.rewriteFile(config);
    };
})();