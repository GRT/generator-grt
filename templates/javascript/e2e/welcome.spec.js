'use strict';

describe('Welcome View', function() {
	var page;

	beforeEach(function() {
		browser.get('/');
		page = require('./welcome.po');
	});

	it('should do something', function() {
		expect(page.welcomeViewTextDiv.getText()).toBe('This is from the welcome view');
		expect(page.sampleDirectiveDiv.getText()).toBe('This text is from the sample directive.');
	});
});
