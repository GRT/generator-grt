'use strict';

describe('Directive: SampleDirective', function () {

	// load the directive's module
	beforeEach(module('<%= scriptAppName %>'));

	var element,
    scope;

	beforeEach(inject(function ($rootScope) {
		scope = $rootScope.$new();
	}));

	it('should make hidden element visible', inject(function ($compile) {
		element = angular.element('<graph></graph>');
		element = $compile(element)(scope);
		expect(true).toBe(true);
	}));
});
