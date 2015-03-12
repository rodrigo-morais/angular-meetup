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