'use strict';

describe('Service: sampleService', function () {

	// load the service's module
	beforeEach(module('<%= scriptAppName %>'));

	// instantiate service
	var sampleService;
	beforeEach(inject(function (_sampleService_) {
		sampleService = _sampleService_;
	}));

	it('should do something', function () {
		expect(sampleService.serviceFunction()).toBe(undefined);
	});

});
