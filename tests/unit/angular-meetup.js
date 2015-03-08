describe('Unit test to use Meetup.com API', function() {
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

    oauthAccess = _OauthAccess_;
    oauthAccess.tokenAccess = '';
    oauthAccess.expiresIn = '';

    rmOauthAccessService = _rmMeetupOauthService_;

    rmMembersService = _rmMeetupMembersService_;
  }));

  it('Verify if OauthAccess value has token and expiresIn property with blank value', function () {
    expect(oauthAccess.tokenAccess).toBe("");
    expect(oauthAccess.expiresIn).toBe("");
  });

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

  it('Verify if element created correctly', function() {
    var element = $compile("<rm-meetup-oauth>Meetup</rm-meetup-oauth>")($rootScope),
        meetupReturn = '<span class="ng-scope">Meetup</span>';
    
    $rootScope.$digest();
    
    expect(element.html()).toContain(meetupReturn);
  });

  it('Verify if window with Meetup login was called', function() {
    var element = $compile("<rm-meetup-oauth>Meetup</rm-meetup-oauth>")($rootScope),
        link;

    spyOn($window, 'open');
    
    $rootScope.$digest();

    link = $(element).find('a')[0];

    element[0].click();
    
    expect($window.open).toHaveBeenCalled();
  });

  it('Verify if refreshToken function was called when method onMeetupAuth from window was executed', function() {
    var element,
        scope = $rootScope.$new();

    scope.refresh = function(token, expiresIn){};

    element = $compile("<rm-meetup-oauth refresh-token='refresh(token, expiresIn)'>Meetup</rm-meetup-oauth>")(scope);

    scope.$digest();

    spyOn(element.isolateScope(), 'refreshToken');

    $window.onMeetupAuth('token', 'expiresIn');
    
    expect(element.isolateScope().refreshToken).toHaveBeenCalled();
  });

  it('Verify if properties from OauthAccess value was changed', function () {
    var element,
        scope = $rootScope.$new();

    scope.refresh = function(token, expiresIn){};

    element = $compile("<rm-meetup-oauth refresh-token='refresh(token, expiresIn)'>Meetup</rm-meetup-oauth>")(scope);

    scope.$digest();

    $window.onMeetupAuth('123', '2222');

    expect(oauthAccess.tokenAccess).toBe("123");
    expect(oauthAccess.expiresIn).toBe("2222");
  });

  it('Verify if properties from OauthAccess is in initial state when called from service', function () {
    var oauthAccessService = rmOauthAccessService.getOauthAccess();

    expect(oauthAccessService.tokenAccess).toBe("");
    expect(oauthAccessService.expiresIn).toBe("");
  });

  it('Verify if properties from OauthAccess is correct when called from service and after authorize directive executed', function () {
    var element,
        scope = $rootScope.$new(),
        oauthAccessService = rmOauthAccessService.getOauthAccess();

    scope.refresh = function(token, expiresIn){};

    element = $compile("<rm-meetup-oauth refresh-token='refresh(token, expiresIn)'>Meetup</rm-meetup-oauth>")(scope);

    scope.$digest();

    $window.onMeetupAuth('123', '2222');

    expect(oauthAccessService.tokenAccess).toBe("123");
    expect(oauthAccessService.expiresIn).toBe("2222");
  });

});