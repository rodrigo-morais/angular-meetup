(function() {
    'use strict';
    
    rmMeetup.directive('rmMeetupGroups',
    ['rmMeetupGroupService',rmMeetupGroupsDirective]);

    function rmMeetupGroupsDirective(rmMeetupGroupService) {

        var _getGroups = function(scope){
            rmMeetupGroupService
                .getById(scope.accessToken, scope.groupId)
                .then(function(_groups){
                    scope.groups = _groups.results;
                });
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