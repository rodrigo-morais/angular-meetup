(function() {
    'use strict';
    
    rmMeetup.directive('rmMeetupGroups',
    ['rmMeetupGroupService',rmMeetupGroupsDirective]);

    function rmMeetupGroupsDirective(rmMeetupGroupService) {

        var _getGroupById = function(scope){
            rmMeetupGroupService
                .getById(scope.accessToken, scope.groupId)
                .then(function(_groups){
                    scope.groups = _groups.results;
                });
        };

        var _getGroupByTopic = function(scope){
            rmMeetupGroupService
                .getByTopic(scope.accessToken, scope.topic)
                .then(function(_groups){
                    scope.groups = _groups.results;
                });
        };

        var _getGroupByParameters = function(scope){
            rmMeetupGroupService
                .get(scope.accessToken, scope.parameters)
                .then(function(_groups){
                    scope.groups = _groups.results;
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

        var html = 'component/templates/groupsList.html';

        return {
            restrict: 'E',
            templateUrl: html,
            replace: true,
            transclude: true,
            scope: {
                accessToken: '@',
                groupId: '@',
                topic: '@',
                parameters: '=',
                type: '@',
                fields: '=',
                filter: '@'
            },
            link: function (scope, element, attrs, controller) {
                scope.groups = [];

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
            }
        };

    }
})();