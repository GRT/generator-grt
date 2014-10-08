'use strict';

describe('Sample Directive Controller', function () {

	// load the directive's module
	beforeEach(module('<%= scriptAppName %>'));

	var SampleDirectiveCntrl,
		scope

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		SampleDirectiveCntrl = $controller('SampleDirectiveCntrl', {
			$scope: scope
		});
	}));

	it('should have a test defined here', function () {
		expect(1).toBe(1);
	});
});
