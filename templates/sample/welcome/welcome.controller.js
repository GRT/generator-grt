(function () {
    'use strict';
    angular.module('<%= scriptAppName %>')
        .controller('WelcomeCtrl', [ '$scope', 'sampleService', function ($scope, sampleService, sampleDecorator) {
            sampleService.serviceFunction("hello world!");
        }]);
})();
