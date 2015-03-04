describe('Unit test to use Meetup.com API', function() {
  var $compile,
      $rootScope,
      $timeout,
      $window,
      provider;

  beforeEach(module('rmMeetup', function(rmConsumerProvider){
    provider = rmConsumerProvider;
  }));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_, _$window_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
    $window = _$window_;
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

  it('Verify if element created correctly', function() {
    var element = $compile("<rm-meetup-oauth>Meetup</rm-meetup-oauth>")($rootScope),
        link;

    //spyOn($.fn, "_requestAuthorization");
    spyOn($window, 'open');
    
    $rootScope.$digest();

    link = $(element).find('a')[0];

    element[0].click();
    
    expect($window.open).toHaveBeenCalled();
  });

});