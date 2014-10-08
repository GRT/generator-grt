(function () {
    'use strict';

    angular.module('<%= scriptAppName %>')
        .directive('sampleDirective', function () {
            return {
                controller: 'SampleDirectiveCntrl',
                templateUrl: '/components/welcome/sampleDirective/sampleDirective.tmpl.html',
                restrict: 'EA',
                link: function (scope, element, attrs) {

                }
            };
        });
})();
