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