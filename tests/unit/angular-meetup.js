describe('Unit test to use Meetup.com API', function() {
  var $compile,
      $rootScope,
      $timeout;

  beforeEach(module('rmMeetup'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
  }));

});