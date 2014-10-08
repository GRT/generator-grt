(function () {
    'use strict';

    // Create the main application module
    angular.module('<%= scriptAppName %>', ['ngRoute'])

        // and configure routes
        .config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'components/welcome/welcome.html',
                    controller: 'WelcomeCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode(true);
        });

})();
