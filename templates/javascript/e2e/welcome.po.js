/**
 * Page Object for 'Welcome' page
 */
(function () {
    'use strict';

    var WelcomePage = function() {
        this.welcomeViewTextDiv = element(by.css('div.example'));
        this.sampleDirectiveDiv = element(by.css('div.sampleDirectiveClass'));
    };

    module.exports = new WelcomePage();

})();
