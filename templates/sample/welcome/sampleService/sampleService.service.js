(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name SampleApp.sampleService
     * @description
     * # sampleService
     * Service in the SampleApp.
     */
    angular.module('<%= scriptAppName %>')
        .service('sampleService', function sampleService() {
            this.serviceFunction = function(message) {
                console.log('service function called with: '+message);
            };
        });
})();
