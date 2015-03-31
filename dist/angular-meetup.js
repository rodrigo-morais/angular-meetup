var rmMeetup = angular.module('rmMeetup', ['ngSanitize', 'ngResource'])
                    .config(
                        [
                            '$httpProvider',
                            function ($httpProvider) {
                                $httpProvider.defaults.useXDomain = true;
                                delete $httpProvider.defaults.headers.common['X-Requested-With'];
                            }
                        ]
                    )
                    .value('OauthAccess', {
                        tokenAccess: '',
                        expiresId: ''
                    });
angular.module('rmMeetup').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('component/templates/eventsList.html',
    "<ul>\n" +
    "    <li data-ng:repeat=\"event in events\">\n" +
    "        {{event.name}}\n" +
    "    </li>\n" +
    "</ul>"
  );


  $templateCache.put('component/templates/eventsTable.html',
    "<table data-ng:if=\"hasEvents\">\n" +
    "    <thead>\n" +
    "        <tr class=\"eventHeaderLine\">\n" +
    "            <th data-ng:repeat=\"field in fields\" class=\"{{field.field}}Label\">\n" +
    "                {{field.label}}\n" +
    "            </th>\n" +
    "        </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "        <tr data-ng:repeat=\"event in events\" class=\"eventBodyLine\">\n" +
    "            <td data-ng:repeat=\"field in fields\" class=\"{{field.field}}Value\">\n" +
    "                {{getData(event, field.field)}}\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "</table>"
  );


  $templateCache.put('component/templates/groupsList.html',
    "<ul>\n" +
    "    <li data-ng:repeat=\"group in groups\">\n" +
    "        {{group.name}}\n" +
    "    </li>\n" +
    "</ul>"
  );


  $templateCache.put('component/templates/groupsTable.html',
    "<table data-ng:if=\"hasGroups\">\n" +
    "    <thead>\n" +
    "        <tr class=\"groupHeaderLine\">\n" +
    "            <th data-ng:repeat=\"field in fields\" class=\"{{field.field}}Label\">\n" +
    "                {{field.label}}\n" +
    "            </th>\n" +
    "        </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "        <tr data-ng:repeat=\"group in groups\" class=\"groupBodyLine\">\n" +
    "            <td data-ng:model=\"group.name\" data-ng:repeat=\"field in fields\" class=\"{{field.field}}Value\">\n" +
    "                {{group[field.field]}}\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "</table>"
  );


  $templateCache.put('component/templates/meetupOauth.html',
    "<a  data-ng:transclude>\n" +
    "</a>"
  );

}]);

(function(){
    'use strict';

    rmMeetup.controller('rmMeetupOauthController',
    ['$q', '$scope', 'rmMeetupOauthService', rmMeetupOauthController]);

    function rmMeetupOauthController($q, $scope, rmMeetupOauthService){
        
    }

})();
(function() {
    'use strict';
    
    rmMeetup.directive('rmMeetupEvents',
    ['rmMeetupEventsService',rmMeetupEventsDirective]);

    function rmMeetupEventsDirective(rmMeetupEventsService) {

        var _setEvents = function(scope, _events){
            scope.events = _events.results;
            scope.hasEvents = (scope.events !== undefined && scope.events.length > 0);
        };

        var _getEventByGroupId = function(scope){
            rmMeetupEventsService
                .getByGroupId(scope.accessToken, scope.groupId)
                .then(function(_events){
                    _setEvents(scope, _events);
                });
        };

        var _getEventById = function(scope){
            rmMeetupEventsService
                .getByEventId(scope.accessToken, scope.eventId)
                .then(function(_events){
                    _setEvents(scope, _events);
                });
        };

        var _getEventByParameters = function(scope){
            rmMeetupEventsService
                .get(scope.accessToken, scope.parameters)
                .then(function(_events){
                    _setEvents(scope, _events);
                });
        };

        var _getEvents = function(scope){
            if(scope.groupId){
                _getEventByGroupId(scope);
            }
            else if(scope.eventId){
                _getEventById(scope);
            }
            else if(scope.parameters){
                _getEventByParameters(scope);
            }
        };

        var html = 'component/templates/';

        return {
            restrict: 'E',
            templateUrl: function(element, attr){
                if(attr.type === 'table'){
                    return html + 'eventsTable.html';
                }

                return html + 'eventsList.html';
            },
            transclude: true,
            scope: {
                accessToken: '@',
                groupId: '@',
                eventId: '@',
                parameters: '=',
                type: '@',
                fields: '='
            },
            link: function (scope, element, attrs, controller) {
                scope.events = [];
                scope.hasEvents = false;

                if(scope.accessToken){
                    _getEvents(scope);
                }
                else{
                    scope.$watch('accessToken', function(newValue, oldValue) {
                        if(newValue !== oldValue){
                            _getEvents(scope);
                        }
                    });
                }

                if(attrs.type === 'table'){
                    if(scope.fields === undefined || !Array.isArray(scope.fields)){
                        scope.fields = [
                            {
                                'label': 'ID of Event',
                                'field': 'id'
                            },
                            {
                                'label': 'Name of Event',
                                'field': 'name'
                            }
                        ];
                    }
                }

                scope.getData = function(event, field){
                    var fields = field.split('.'),
                        data = event,
                        actual = fields[0],
                        counter = 0;

                    while(actual && data){
                        data = data[actual];
                        counter = counter + 1;
                        actual = fields[counter];
                    }

                    return data;
                };
            }
        };

    }
})();
(function() {
    'use strict';
    
    rmMeetup.directive('rmMeetupGroups',
    ['rmMeetupGroupService',rmMeetupGroupsDirective]);

    function rmMeetupGroupsDirective(rmMeetupGroupService) {

        var _setGroups = function(scope, _groups){
            scope.groups = _groups.results;
            scope.hasGroups = (scope.groups !== undefined && scope.groups.length > 0);
        };

        var _getGroupById = function(scope){
            rmMeetupGroupService
                .getById(scope.accessToken, scope.groupId)
                .then(function(_groups){
                    _setGroups(scope, _groups);
                });
        };

        var _getGroupByTopic = function(scope){
            rmMeetupGroupService
                .getByTopic(scope.accessToken, scope.topic)
                .then(function(_groups){
                    _setGroups(scope, _groups);
                });
        };

        var _getGroupByParameters = function(scope){
            rmMeetupGroupService
                .get(scope.accessToken, scope.parameters)
                .then(function(_groups){
                    _setGroups(scope, _groups);
                });
        };

        var _getGroups = function(scope){
            if(scope.groupId){
                _getGroupById(scope);
            }
            else if(scope.topic){
                _getGroupByTopic(scope);
            }
            else if(scope.parameters){
                _getGroupByParameters(scope);
            }
        };

        var html = 'component/templates/';

        return {
            restrict: 'E',
            templateUrl: function(element, attr){
                if(attr.type === 'table'){
                    return html + 'groupsTable.html';
                }

                return html + 'groupsList.html';
            },
            transclude: true,
            scope: {
                accessToken: '@',
                groupId: '@',
                topic: '@',
                parameters: '=',
                type: '@',
                fields: '='
            },
            link: function (scope, element, attrs, controller) {
                scope.groups = [];
                scope.hasGroups = false;

                if(scope.accessToken){
                    _getGroups(scope);
                }
                else{
                    scope.$watch('accessToken', function(newValue, oldValue) {
                        if(newValue !== oldValue){
                            _getGroups(scope);
                        }
                    });
                }

                if(attrs.type === 'table'){
                    if(scope.fields === undefined || !Array.isArray(scope.fields)){
                        scope.fields = [
                            {
                                'label': 'ID of Group',
                                'field': 'id'
                            },
                            {
                                'label': 'Name of Group',
                                'field': 'name'
                            }
                        ];
                    }
                }
            }
        };

    }
})();
(function() {
    'use strict';
    
    rmMeetup.directive('rmMeetupOauth',
    ['$window', 'rmConsumer', 'OauthAccess',rmMeetupOauthDirective]);

    function rmMeetupOauthDirective($window, rmConsumer, OauthAccess) {

        var _requestAuthorization = function() {
            var width = 500,
                height = 350,
                top = (screen.height - height)/2,
                left = (screen.width - width)/2;
            $window.open(
                rmConsumer.authorize_uri,
                "Meetup",
                ["height=", height, ",width=", width,
                 ",top=", top, ",left=", left].join(''));    
        };

        var _isAuthorized = function(){
            var frag = '';

            if(window.location.pathname.indexOf('access_token') >= 0){
                frag = window.location.pathname;
            }
            else{
                frag =  window.location.hash;
            }
            
            if(frag.split('/').length > 1){
                frag = '#' + frag.split('/')[1];
            }

            if(frag) {
                var fp = frag.substring(1).split('&'),
                    i = fp.length,
                    params = {},
                    re = /(\S+)=(\S+)/,
                    inject = function(pair) {
                        if(re.test(pair)) {
                            var kv = re.exec(pair).splice(1, 2);
                            params[kv[0]] = kv[1];
                        }
                    };

                    while(i--){
                        inject(fp[i]);
                    }

                    if(params.access_token) {
                        $window.close();
                        $window
                            .opener
                            .onMeetupAuth(params.access_token, params.expires_in);
                    } else if(params.error) {
                        $window.close();
                        $window.opener.onMeetupDenial(params.error);
                    }
                }
        };

        var html = 'component/templates/meetupOauth.html';

        return {
            restrict: 'E',
            templateUrl: html,
            replace: true,
            transclude: true,
            scope: {
                refreshToken: '&'
            },
            controller: 'rmMeetupOauthController',
            link: function (scope, element, attrs, controller) {
                $window.onMeetupAuth = function(tok, expiresIn) {
                    OauthAccess.tokenAccess = tok;
                    OauthAccess.expiresIn = expiresIn;

                    if(scope.refreshToken){
                        scope.refreshToken({token:tok, expiresIn: expiresIn});
                    }
                };

                $window.onMeetupDenial = function(err) {
                    console.log(err);
                };

                _isAuthorized();

                element.on('click', function(){
                    _requestAuthorization();
                });
            }
        };

    }
})();
(function() {
    'use strict';

    rmMeetup.provider("rmConsumer", function(){
        var key = '',
            secret = '',
            redirect_uri = '',
            authorize_uri = 'https://secure.meetup.com/oauth2/authorize/?response_type=token&scope=ageless';

        this.setAuthorizeURI = function(_uri){
            this.authorize_uri = _uri;
        };

        this.setKey = function(_key){
            this.key = _key;
        };

        this.setSecret = function(_secret){
            this.secret = _secret;
        };

        this.setRedirectURI = function(_uri){
            this.redirect_uri = _uri;
        };

        this.$get = function(){
            if( this.authorize_uri === undefined ||
                this.authorize_uri === ''){
                this.authorize_uri = 'https://secure.meetup.com/oauth2/authorize/?response_type=token&scope=ageless';
            }


            return{
                key: this.key,
                secret: this.secret,
                redirect_uri: this.redirect_uri,
                authorize_uri: this.authorize_uri + '&client_id=' + this.key + '&redirect_uri=' + this.redirect_uri
            };
        };
    });
})();
(function(){
    'use strict';

    rmMeetup.factory('rmMeetupEventsService',
    ['$q', '$resource', rmMeetupEventsService]);

    function rmMeetupEventsService($q, $resource) {
        var Events = $resource(
            'https://api.meetup.com/2/events'
        );

        return{
            getByGroupId: function(access_token, group_id, status){
                var deferred = $q.defer();

                if(status === null || status === undefined){
                    status = 'upcoming,past,proposed,suggested';
                }

                Events.get(
                    {
                        access_token: access_token,
                        group_id: group_id,
                        status: status
                    }
                )
                .$promise
                .then(function(events){
                    deferred.resolve(events);
                });

                return deferred.promise;
            },
            getByEventId: function(access_token, event_id, status){
                var deferred = $q.defer();

                if(status === null || status === undefined){
                    status = 'upcoming,past,proposed,suggested';
                }

                Events.get(
                    {
                        access_token: access_token,
                        event_id: event_id,
                        status: status
                    }
                )
                .$promise
                .then(function(events){
                    deferred.resolve(events);
                });

                return deferred.promise;
            },
            get: function(access_token, parameters){
                var deferred = $q.defer();

                if(parameters){
                    parameters.access_token = access_token;
                }
                else{
                    parameters = {
                        'access_token': access_token
                    };
                }

                Events.get(
                    parameters
                )
                .$promise
                .then(function(events){
                    deferred.resolve(events);
                });

                return deferred.promise;
            }
        };
    }
})();
(function(){
    'use strict';

    rmMeetup.factory('rmMeetupGroupService',
    ['$q', '$resource', rmMeetupGroupService]);

    function rmMeetupGroupService($q, $resource) {
        var Group = $resource(
            'https://api.meetup.com/2/groups'
        );

        return{
            get: function(access_token, parameters){
                var deferred = $q.defer();

                if(parameters){
                    parameters.access_token = access_token;
                }
                else{
                    parameters = {
                        'access_token': access_token
                    };
                }

                Group.get(
                    parameters
                )
                .$promise
                .then(function(groups){
                    deferred.resolve(groups);
                });

                return deferred.promise;
            },
            getById: function(access_token, group_id){
                var deferred = $q.defer();

                Group.get(
                    {
                        access_token: access_token,
                        group_id: group_id
                    }
                )
                .$promise
                .then(function(groups){
                    deferred.resolve(groups);
                });

                return deferred.promise;
            },
            getByTopic: function(access_token, topic){
                var deferred = $q.defer();

                Group.get(
                    {
                        access_token: access_token,
                        topic: topic
                    }
                )
                .$promise
                .then(function(groups){
                    deferred.resolve(groups);
                });

                return deferred.promise;
            }
        };
    }
})();
(function(){
    'use strict';

    rmMeetup.factory('rmMeetupMembersService',
    ['$q', '$resource', rmMeetupMembersService]);

    function rmMeetupMembersService($q, $resource) {
        var Member = $resource(
            'https://api.meetup.com/2/member/self?access_token=:access_token',
            {access_token: '@_access_token'}
        ); 

        return{
            getLoggedMember: function(access_token){
                var deferred = $q.defer();

                Member.get(
                    {
                        access_token: access_token
                    }
                )
                .$promise
                .then(function(member){
                    deferred.resolve(member);
                });

                return deferred.promise;
            }
        };
    }
})();
(function(){
    'use strict';

    rmMeetup.factory('rmMeetupOauthService',
    ['$q', '$resource', 'OauthAccess', rmMeetupOauthService]);

    function rmMeetupOauthService($q, $resource, OauthAccess) {
        var Authentication = $resource('');

        return{
            getOauthAccess: function(){
                return OauthAccess;
            }
        };
    }
})();
(function(){
    'use strict';

    rmMeetup.factory('rmMeetupRSVPsService',
    ['$q', '$resource', rmMeetupRSVPsService]);

    function rmMeetupRSVPsService($q, $resource) {
        var RSVPs = $resource('https://api.meetup.com/2/rsvps');

        return{
            getByEventId: function(access_token, event_id){
                var deferred = $q.defer();

                RSVPs.get(
                    {
                        access_token: access_token,
                        event_id: event_id
                    }
                )
                .$promise
                .then(function(rsvps){
                    deferred.resolve(rsvps);
                });

                return deferred.promise;
            }
        };
    }
})();