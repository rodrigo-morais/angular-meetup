(function() {
    'use strict';
    
    rmMeetup.directive('rmMeetupGroups',
    ['rmMeetupGroupService',rmMeetupGroupsDirective]);

    function rmMeetupGroupsDirective(rmMeetupGroupService) {

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
                    rmMeetupGroupService
                        .getById(scope.accessToken, scope.groupId)
                        .then(function(_groups){
                            scope.groups = _groups.results;
                        });
                }
                else{
                    scope.$watch('accessToken', function(newValue, oldValue) {
                        if(newValue !== oldValue){
                            rmMeetupGroupService
                            .getById(newValue, scope.groupId)
                            .then(function(_groups){
                                scope.groups = _groups.results;
                            });
                        }
                    });
                }
            }
        };

    }
})();