var app = angular.module('myApp', ['rmMeetup'])
            .config(
                [
                    "rmConsumerProvider",
                    function(rmConsumerProvider) {
                        rmConsumerProvider.setKey('1h82intl8imm92ivovvphp0f9c');
                        rmConsumerProvider.setRedirectURI('http://localhost:8080');
                    }
                ]
            );

(function(){
    'use strict';

    var controllerId = 'MeetupController';

    app.controller(controllerId, ['$scope', 'rmMeetupOauthService', 'rmMeetupMembersService', 'rmMeetupGroupService', 'rmMeetupEventsService', 'rmMeetupRSVPsService', meetupontroller]);

    function meetupontroller($scope, rmMeetupOauthService, rmMeetupMembersService, rmMeetupGroupService, rmMeetupEventsService, rmMeetupRSVPsService){
        $scope.token = '';
        $scope.expiresIn = '';
        $scope.member;
        $scope.memberParameter = {'member_id': 68730302};
        $scope.groupFields = [
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
            },
            {
                'label': 'City',
                'field': 'city'
            },
            {
                'label': 'State',
                'field': 'state'
            }
        ];
        $scope.eventFields = [
            {
                'label': 'ID of Event',
                'field': 'id'
            },
            {
                'label': 'Name of Event',
                'field': 'name'
            },
            {
                'label': 'Status',
                'field': 'status'
            },
            {
                'label': 'Group',
                'field': 'group.name'
            },
            {
                'label': 'Host',
                'field': 'event_hosts.member_name'
            }
        ];

        $scope.refresh = function(token, expiresIn){
            $scope.$apply(function() {
                $scope.token = token;
                $scope.expiresIn = expiresIn;
                rmMeetupMembersService.getLoggedMember(token).then(function(member){
                    $scope.member = member;
                });
            });
        }

        $scope.clear = function(){
            $scope.token = '';
            $scope.expiresIn = '';
            $scope.member = null;
        }

        $scope.refreshOauthAccess = function(){
            var oauthAccess = rmMeetupOauthService.getOauthAccess();

            $scope.token = oauthAccess.tokenAccess;
            $scope.expiresIn = oauthAccess.expiresIn;

            rmMeetupMembersService.getLoggedMember(oauthAccess.tokenAccess).then(function(member){
                $scope.member = member;
            });
        }

        $scope.getAllGroups = function(){
            if($scope.token){
                rmMeetupGroupService
                    .getByTopic($scope.token, 'AngularJS')
                    .then(function(groups){
                    $scope.groups = groups.results;
                });
            }
        }

        $scope.getGroup = function(){
            if($scope.token){
                rmMeetupGroupService
                    .getById($scope.token, 15557752)
                    .then(function(groups){
                    $scope.groups = groups.results;
                });
            }
        }

        $scope.getGroupByParameters = function(){
            if($scope.token){
                rmMeetupGroupService
                    .get($scope.token, 
                        {
                            'member_id': 68730302
                        }
                    )
                    .then(function(groups){
                    $scope.groups = groups.results;
                });
            }
        }

        $scope.getEvents = function(){
            if($scope.token){
                rmMeetupEventsService
                    .getByGroupId($scope.token, 15557752)
                    .then(function(events){
                    $scope.events = events.results;
                });
            }
        }

        $scope.getEvent = function(){
            if($scope.token){
                rmMeetupEventsService
                    .getByEventId($scope.token, 206641902)
                    .then(function(events){
                    $scope.events = events.results;
                });
            }
        }

        $scope.getEventsByParameters = function(){
            if($scope.token){
                rmMeetupEventsService
                    .get($scope.token, 
                        {
                            'group_id': 15557752,
                            'event_id': 206641902,
                            'status': 'past'
                        }
                    )
                    .then(function(events){
                    $scope.events = events.results;
                });
            }
        }

        $scope.getRSVPsByEvent = function(){
            if($scope.token){
                rmMeetupRSVPsService
                    .getByEventId($scope.token, 206641902
                    )
                    .then(function(rsvps){
                    $scope.rsvps = rsvps.results;
                });
            }
        }
    }
})();