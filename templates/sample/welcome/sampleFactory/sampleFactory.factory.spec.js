'use strict';

describe('Service: sampleFactory', function () {

	// load the service's module
	beforeEach(module('<%= scriptAppName %>'));

	// instantiate service
	var sampleFactory;
	beforeEach(inject(function (_sampleFactory_) {
		sampleFactory = _sampleFactory_;
	}));

	it('should do something', function () {
		expect(!!sampleFactory).toBe(true);
	});

});
