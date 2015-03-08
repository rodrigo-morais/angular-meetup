var app = angular.module('myApp', ['rmMeetup'])
            .config(
                [
                    "rmConsumerProvider",
                    function(rmConsumerProvider) {
                        rmConsumerProvider.setKey('li1i10kfumgoi7sk58stlhjac');
                        rmConsumerProvider.setRedirectURI('http://localhost:8080');
                    }
                ]
            );

(function(){
    'use strict';

    var controllerId = 'MeetupController';

    app.controller(controllerId, ['$scope', 'rmMeetupOauthService', 'rmMeetupMembersService', 'rmMeetupGroupService', 'rmMeetupEventsService', meetupontroller]);

    function meetupontroller($scope, rmMeetupOauthService, rmMeetupMembersService, rmMeetupGroupService, rmMeetupEventsService){
        $scope.token = '';
        $scope.expiresIn = '';
        $scope.member;

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
                    .get($scope.token, 15557752)
                    .then(function(groups){
                    $scope.groups = groups.results;
                });
            }
        }

        $scope.getEvent = function(){
            if($scope.token){
                rmMeetupEventsService
                    .getByGroupId($scope.token, 15557752)
                    .then(function(events){
                    $scope.events = events.results;
                });
            }
        }
    }
})();