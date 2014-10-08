/**
 * Created by Oakley Hall on 9/17/14.
 */
(function (ns) {
    'use strict';
    var yeoman  = require('yeoman-generator');
    var chalk   = require('chalk');
    var yosay   = require('yosay');
    var path    = require('path');
    var util    = require('util');
    var _       = require('lodash');
    var angularUtils = require('../util.js');
    var REQUIRED_DEPS = ['angular','angular-route','lodash','bootstrap','jquery','jasmine','karma','font-awesome'];
    var templateFiles = '../../templates/';

    var Generator = module.exports = function Generator(args, options, config) {
        yeoman.generators.Base.apply(this, arguments);

        this.argument('appname', { type: String, required: false });
        this.appname = this.appname || path.basename(process.cwd());
        this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

        this.option('app-suffix', {
            desc: 'Allow a custom suffix to be added to the module name',
            type: String,
            required: 'false'
        });
        this.env.options['app-suffix'] = this.options['app-suffix'];
        this.scriptAppName = this.appname + angularUtils.appName(this);

        this.log( yosay(chalk.blue('Yeoman') + ' is kicking off your ' +
                        chalk.bold.green('GRT') + ' app with ' +
                        chalk.red('AngularJS') + '!' ));

    };

    util.inherits(Generator, yeoman.generators.Base);


    /**
     * Prompt user for app name
     */
    Generator.prototype.promptForAppName = function promptForAppName() {
        var done = this.async();
        var prompts = [
            {
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: this.appname // Default to current folder name
            }
        ];

        this.prompt(prompts, function (props) {
            this.appName = props.name;
            this.scriptAppName = this.appName;
            done();
        }.bind(this));

    };

    /**
     * Add config files to project root and app files to app root
     */
    Generator.prototype.copyStaticFiles = function copyStaticFiles() {
        this.log( chalk.magenta('Installing static files') );
        this.directory( templateFiles + 'common/static', './' );
    };

    /**
     * Add example end to end tests
     */
    Generator.prototype.copyE2e = function copyE2e() {
        this.log( chalk.magenta('Example e2e tests') );
        this.directory( templateFiles + 'javascript/e2e','e2e'  );
    };

    /**
     * Add app dir files
     */
    Generator.prototype.addAppFiles = function addAppFiles() {
        this.template( templateFiles + 'common/app/app.js','app/app.js'  );
        this.template( templateFiles + 'common/app/app.less','app/app.less' );
        this.template( templateFiles + 'common/app/index.html','app/index.html' );
        this.template( templateFiles + 'common/app/namespace.js','app/namespace.js' );
        this.template( templateFiles + 'common/app/TODO.md','app/TODO.md' );
    };

    /**
     * Add root project dir files
     */
    Generator.prototype.addRootFiles = function addRootFiles() {
        this.template(templateFiles + 'common/root/_Gruntfile.js', 'Gruntfile.js');
        this.template(templateFiles + 'common/root/_package.json', 'package.json');
        this.template(templateFiles + 'common/root/_README.md', 'README.md');
        this.template(templateFiles + 'common/root/_bower.json', 'bower.json');
        this.template(templateFiles + 'common/root/_bower.json', 'bower.json');
    };

    /**
     * Prompts for App Name and optional Angular Modules
     */
    Generator.prototype.promptAngModsTask = function promptAngModsTask() {
        var done = this.async();

        var prompts = [{
            type: 'checkbox',
            name: 'modules',
            message: 'Which modules would you like to include? Arrow to Nav, Space to select.',
            choices: [
                { value: 'animateModule',   name: 'angular-animate.js', checked: false },
                { value: 'cookiesModule',   name: 'angular-cookies.js', checked: false },
                { value: 'resourceModule',  name: 'angular-resource.js',checked: false },
                { value: 'sanitizeModule',  name: 'angular-sanitize.js',checked: false },
                { value: 'touchModule',     name: 'angular-touch.js',   checked: false }
            ]
        }];

        this.prompt(prompts, function (props) {
            var hasMod = function (mod) { return props.modules.indexOf(mod) !== -1; };
            this.animateModule = hasMod('animateModule');
            this.cookiesModule = hasMod('cookiesModule');
            this.resourceModule = hasMod('resourceModule');
            this.sanitizeModule = hasMod('sanitizeModule');
            this.touchModule = hasMod('touchModule');

            var angMods = [];

            if (this.animateModule) {   angMods.push('angular-animate'); }
            if (this.cookiesModule) {   angMods.push('angular-cookies'); }
            if (this.resourceModule) {  angMods.push('angular-resource'); }
            if (this.sanitizeModule) {  angMods.push('angular-sanitize'); }
            if (this.touchModule) {     angMods.push('angular-touch'); }

            if ( angMods.length ) {
                this.env.options.angularDeps = '\n    ' + angMods.join(',\n    ') + '\n  ';
                this.log( chalk.magenta('Installing Selected Angular Modules and required dependencies') );
                this.bowerInstall( angMods, { 'save': true }, done );
            }else{
                done();
            }

        }.bind(this));
    };


    /**
     * Add sample app components
     */
    Generator.prototype.sampleAppTemplates = function sampleAppTemplates() {
        this.log( chalk.magenta('Installing Sample App') );
        var source = templateFiles + 'sample', destination = 'app/components';

        var root = this.isPathAbsolute(source) ? source : path.join(this.sourceRoot(), source);
        console.log( root );
        var files = this.expandFiles('**', { dot: true, cwd: root });
        console.log( files );

        for (var i = 0; i < files.length; i++) {
            var f = files[i];
            console.log('file: ' + f );
            var src = path.join(root, f);
            console.log('src: ' + src );
            var dest = path.join(destination, f);
            console.log('dest: ' + dest );
            this.template(src, dest);
        }
    };

    /**
     * Install remaining dev dependencies
     */
    Generator.prototype.installRemaining = function installRemaining() {
        var gen = this;
        var instr = function(){
            gen.log( '\n\n' );
            gen.log( chalk.bold.bgGreen.black('  OK. What now?  ') );
            gen.log( chalk.yellow('Launch the demo page:') );
            gen.log( chalk.italic.green('   grunt serve') );

        };
        this.log( chalk.magenta('Installing remaining dev dependencies') );
        this.installDependencies(instr);
    };
})();