describe('Unit test in consumer provider to use Meetup.com API', function() {
  var $compile,
      $rootScope,
      $timeout,
      $window,
      rmConsumer,
      rmOauthAccessService,
      oauthAccess,
      rmMembersService;

  beforeEach(module('rmMeetup', function(rmConsumerProvider){
    rmConsumer = rmConsumerProvider;
  }));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_, _$window_, $injector, _OauthAccess_, _rmMeetupOauthService_, _rmMeetupMembersService_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
    $window = _$window_;
  }));

  it('Verify if "key" property is modified in provider', function() {
    rmConsumer.setKey('new_key');
    
    expect(rmConsumer.key).toBe('new_key');
  });

  it('Verify if "secret" property is modified in provider', function() {
    rmConsumer.setSecret('new_secret');
    
    expect(rmConsumer.secret).toBe('new_secret');
  });

  it('Verify if "redirect_uri" property is modified in provider', function() {
    rmConsumer.setRedirectURI('new_redirect_uri');
    
    expect(rmConsumer.redirect_uri).toBe('new_redirect_uri');
  });

});