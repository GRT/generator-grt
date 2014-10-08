'use strict';

describe('Service: sampleProvider', function () {

	// load the service's module
	beforeEach(module('<%= scriptAppName %>'));

	// instantiate service
	var sampleProvider;
	beforeEach(inject(function (_sampleProvider_) {
		sampleProvider = _sampleProvider_;
	}));

	it('should do something', function () {
		expect(!!sampleProvider).toBe(true);
	});

});
