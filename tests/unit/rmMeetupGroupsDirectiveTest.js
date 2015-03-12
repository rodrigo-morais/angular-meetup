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

  it('Verify if element has one item listed using service find by group id', function() {
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

  it('Verify if element has one item with text "AngularJS" when using service find by group id', function() {
    var element,
        serviceFunction,
        deferred = $q.defer(),
        listItems;

    deferred.resolve({results: [{id: 3, name: "AngularJS"}]});

    spyOn(rmGroupsService, "getById").and.returnValue(deferred.promise);

    element = $compile("<rm-meetup-groups access-token='1111' group-id = '15557752'>Meetup</rm-meetup-groups>")($rootScope);
    
    $rootScope.$digest();

    listItems = element.find('li');
    
    expect(rmGroupsService.getById).toHaveBeenCalled();
    expect($(listItems).first().text().trim()).toBe("AngularJS");
  });

  it('Verify if element has two items when using service find by topic', function() {
    var element,
        serviceFunction,
        deferred = $q.defer(),
        listItems;

    deferred.resolve({
      results: [
        {id: 3, name: "Porto Alegre AngularJS"},
        {id: 4, name: "São Paulo AngularJS"}
      ]
    });

    spyOn(rmGroupsService, "getByTopic").and.returnValue(deferred.promise);

    element = $compile("<rm-meetup-groups access-token='1111' topic = 'AngularJS'>Meetup</rm-meetup-groups>")($rootScope);
    
    $rootScope.$digest();

    listItems = element.find('li');
    
    expect(rmGroupsService.getByTopic).toHaveBeenCalled();
    expect($(listItems).length).toBe(2);
  });

  it('Verify if element has four items when using service find by parameter', function() {
    var element,
        serviceFunction,
        deferred = $q.defer(),
        listItems,
        parameter = {'member_id': 68730302};

    deferred.resolve({
      results: [
        {id: 3, name: "Porto Alegre AngularJS"},
        {id: 4, name: "São Paulo AngularJS"},
        {id: 5, name: "MongoDB"},
        {id: 6, name: "MeteorJS"}
      ]
    });

    spyOn(rmGroupsService, "get").and.returnValue(deferred.promise);

    element = $compile("<rm-meetup-groups access-token='1111' parameters='parameters'>Meetup</rm-meetup-groups>")($rootScope);

    $rootScope.$apply(function(){
      $rootScope.parameters = parameter;
      $compile(element)($rootScope);
    });

    listItems = element.find('li');
    
    expect(rmGroupsService.get).toHaveBeenCalled();
    expect($(listItems).length).toBe(4);
  });

  it('Verify if element contain a table because in type parameter the type is informed as "table"', function() {
    var element,
        serviceFunction,
        deferred = $q.defer();

    deferred.resolve({
      results: [
        {id: 3, name: "Porto Alegre AngularJS"},
        {id: 4, name: "São Paulo AngularJS"},
        {id: 5, name: "MongoDB"},
        {id: 6, name: "MeteorJS"}
      ]
    });

    spyOn(rmGroupsService, "getById").and.returnValue(deferred.promise);

    $rootScope.$apply(function(){
      element = $compile("<rm-meetup-groups fields='fields' access-token='1111' group-id='1111' type='table'>Meetup</rm-meetup-groups>")($rootScope);
    });
    
    expect(element.html()).toContain('table');
  });

  it('Verify if colums names in table when type informed is "table"', function() {
    var element,
        serviceFunction,
        deferred = $q.defer(),
        th;

    deferred.resolve({
      results: [
        {id: 3, name: "Porto Alegre AngularJS"},
        {id: 4, name: "São Paulo AngularJS"},
        {id: 5, name: "MongoDB"},
        {id: 6, name: "MeteorJS"}
      ]
    });

    spyOn(rmGroupsService, "getById").and.returnValue(deferred.promise);

    $rootScope.$apply(function(){
      element = $compile("<rm-meetup-groups fields='fields' access-token='1111' group-id='1111' type='table'>Meetup</rm-meetup-groups>")($rootScope);
    });

    th = element.find('th');
    
    expect($(th).first().text().trim()).toContain('ID');
    expect($(th).last().text().trim()).toContain('Name');
  });

  it('Verify if has two colums names in table when type informed is "table"', function() {
    var element,
        serviceFunction,
        deferred = $q.defer(),
        th;

    deferred.resolve({
      results: [
        {id: 3, name: "Porto Alegre AngularJS"},
        {id: 4, name: "São Paulo AngularJS"},
        {id: 5, name: "MongoDB"},
        {id: 6, name: "MeteorJS"}
      ]
    });

    spyOn(rmGroupsService, "getById").and.returnValue(deferred.promise);

    $rootScope.$apply(function(){
      element = $compile("<rm-meetup-groups fields='fields' access-token='1111' group-id='1111' type='table'>Meetup</rm-meetup-groups>")($rootScope);
    });

    th = element.find('th');
    
    expect($(th).length).toBe(2);
  });

  it('Verify if colums names in table when type informed is "table" and fields are informed', function() {
    var element,
        serviceFunction,
        deferred = $q.defer(),
        th,
        fields = [
            {
                'label': 'ID of Group',
                'field': 'id'
            },
            {
                'label': 'Name of Group',
                'field': 'name'
            },
            {
                'label': 'Country',
                'field': 'country'
            }
        ];

    deferred.resolve({
      results: [
        {id: 3, name: "Porto Alegre AngularJS", country: "Brazil"},
        {id: 4, name: "São Paulo AngularJS", country: "Brazil"},
        {id: 5, name: "MongoDB", country: "Brazil"},
        {id: 6, name: "MeteorJS", country: "Brazil"}
      ]
    });

    spyOn(rmGroupsService, "getById").and.returnValue(deferred.promise);

    $rootScope.$apply(function(){
      $rootScope.fields = fields;
      element = $compile("<rm-meetup-groups fields='fields' access-token='1111' group-id='1111' type='table'>Meetup</rm-meetup-groups>")($rootScope);
    });

    th = element.find('th');
    
    expect($(th).first().text().trim()).toContain('ID of Group');
    expect($($(th)[1]).text().trim()).toContain('Name of Group');
    expect($(th).last().text().trim()).toContain('Country');
  });

  it('Verify if has three colums names in table when type informed is "table" and fields are informed', function() {
    var element,
        serviceFunction,
        deferred = $q.defer(),
        th,
        fields = [
            {
                'label': 'ID of Group',
                'field': 'id'
            },
            {
                'label': 'Name of Group',
                'field': 'name'
            },
            {
                'label': 'Country',
                'field': 'country'
            }
        ];

    deferred.resolve({
      results: [
        {id: 3, name: "Porto Alegre AngularJS"},
        {id: 4, name: "São Paulo AngularJS"},
        {id: 5, name: "MongoDB"},
        {id: 6, name: "MeteorJS"}
      ]
    });

    spyOn(rmGroupsService, "getById").and.returnValue(deferred.promise);

    $rootScope.$apply(function(){
      $rootScope.fields = fields;
      element = $compile("<rm-meetup-groups fields='fields' access-token='1111' group-id='1111' type='table'>Meetup</rm-meetup-groups>")($rootScope);
    });

    th = element.find('th');
    
    expect($(th).length).toBe(3);
  });

it('Verify if has four lines with data in table when type informed is "table" and fields are informed', function() {
    var element,
        serviceFunction,
        deferred = $q.defer(),
        th,
        fields = [
            {
                'label': 'ID of Group',
                'field': 'id'
            },
            {
                'label': 'Name of Group',
                'field': 'name'
            },
            {
                'label': 'Country',
                'field': 'country'
            }
        ];

    deferred.resolve({
      results: [
        {id: 3, name: "Porto Alegre AngularJS"},
        {id: 4, name: "São Paulo AngularJS"},
        {id: 5, name: "MongoDB"},
        {id: 6, name: "MeteorJS"}
      ]
    });

    spyOn(rmGroupsService, "getById").and.returnValue(deferred.promise);

    $rootScope.$apply(function(){
      $rootScope.fields = fields;
      element = $compile("<rm-meetup-groups fields='fields' access-token='1111' group-id='1111' type='table'>Meetup</rm-meetup-groups>")($rootScope);
    });

    tr = element.find('tbody').find('tr');
    
    expect($(tr).length).toBe(4);
  });

it('Verify if names in four lines with data in table when type informed is "table" and fields are informed', function() {
    var element,
        serviceFunction,
        deferred = $q.defer(),
        th,
        fields = [
            {
                'label': 'ID of Group',
                'field': 'id'
            },
            {
                'label': 'Name of Group',
                'field': 'name'
            },
            {
                'label': 'Country',
                'field': 'country'
            }
        ];

    deferred.resolve({
      results: [
        {id: 3, name: "Porto Alegre AngularJS"},
        {id: 4, name: "São Paulo AngularJS"},
        {id: 5, name: "MongoDB"},
        {id: 6, name: "MeteorJS"}
      ]
    });

    spyOn(rmGroupsService, "getById").and.returnValue(deferred.promise);

    $rootScope.$apply(function(){
      $rootScope.fields = fields;
      element = $compile("<rm-meetup-groups fields='fields' access-token='1111' group-id='1111' type='table'>Meetup</rm-meetup-groups>")($rootScope);
    });

    tr = element.find('tbody').find('tr');
    
    expect($(tr).first().text().trim()).toContain('Porto Alegre AngularJS');
    expect($(tr).last().text().trim()).toContain('MeteorJS');
  });

});