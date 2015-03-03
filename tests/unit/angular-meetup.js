describe('Unit test to use Meetup.com API', function() {
  var $compile,
      $rootScope,
      $timeout,
      provider;

  beforeEach(module('rmMeetup', function(consumerProvider){
    provider = consumerProvider;
  }));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
  }));

  it('Verify if "key" property is modified in provider', function() {
    provider.setKey('new_key');
    
    expect(provider.key).toBe('new_key');
  });

  it('Verify if "secret" property is modified in provider', function() {
    provider.setSecret('new_secret');
    
    expect(provider.secret).toBe('new_secret');
  });

  it('Verify if "redirect_uri" property is modified in provider', function() {
    provider.setRedirectURI('new_redirect_uri');
    
    expect(provider.redirect_uri).toBe('new_redirect_uri');
  });

  it('Verify if element created correctly', function() {
    var element = $compile("<rm-meetup-oauth>Meetup</rm-meetup-oauth>")($rootScope),
        meetupReturn = '<span class="ng-scope">Meetup</span>';
    
    $rootScope.$digest();
    
    expect(element.html()).toContain(meetupReturn);
  });

});