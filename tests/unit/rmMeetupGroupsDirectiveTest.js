describe('Unit test in groups directive to use Meetup.com API', function() {
  var $compile,
      $rootScope,
      $window,
      $q,
      rmGroupsService;

  beforeEach(module('rmMeetup'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_, _$window_, _$q_, $injector, _OauthAccess_, _rmMeetupOauthService_, _rmMeetupGroupService_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $window = _$window_;
    $q = _$q_;

    rmGroupsService = _rmMeetupGroupService_;
  }));

  it('Verify if element created correctly', function() {
    var element,
        serviceFunction,
        deferred = $q.defer(),
        meetupReturn = '<ul>';

    
    deferred.resolve({results: [{id: 3, name: "AngularJS"}]});

    spyOn(rmGroupsService, "getById").and.returnValue(deferred.promise);

    element = $compile("<rm-meetup-groups access-token='1111' group-id = '15557752'>Meetup</rm-meetup-groups>")($rootScope);
    
    $rootScope.$digest();
    
    expect(element.html()).toContain(meetupReturn);
  });

  it('Verify if element has one item listed', function() {
    var element,
        serviceFunction,
        deferred = $q.defer(),
        listItems;

    deferred.resolve({results: [{id: 3, name: "AngularJS"}]});

    spyOn(rmGroupsService, "getById").and.returnValue(deferred.promise);

    element = $compile("<rm-meetup-groups access-token='1111' group-id = '15557752'>Meetup</rm-meetup-groups>")($rootScope);
    
    $rootScope.$digest();

    listItems = element.find('li');
    
    expect(listItems.length).toBe(1);
  });

  it('Verify if element has one item with text "AngularJS"', function() {
    var element,
        serviceFunction,
        deferred = $q.defer(),
        listItems;

    deferred.resolve({results: [{id: 3, name: "AngularJS"}]});

    spyOn(rmGroupsService, "getById").and.returnValue(deferred.promise);

    element = $compile("<rm-meetup-groups access-token='1111' group-id = '15557752'>Meetup</rm-meetup-groups>")($rootScope);
    
    $rootScope.$digest();

    listItems = element.find('li');
    
    expect($(listItems).first().text().trim()).toBe("AngularJS");
  });

});