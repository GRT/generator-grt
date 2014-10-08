'use strict';

describe('Controller: welcomeCtrl', function () {

  // load the controller's module
  beforeEach(module('<%= scriptAppName %>'));

  var MainCtrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
	  scope = $rootScope.$new();
	  MainCtrl = $controller('WelcomeCtrl', {
		  $scope: scope
	  });
  }));

  it('should have a test defined here', function () {
	  expect(1).toBe(1);
  });
});
