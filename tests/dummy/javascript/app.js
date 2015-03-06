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

    app.controller(controllerId, ['$scope', 'rmMeetupOauthService', 'rmMeetupMemberService', meetupontroller]);

    function meetupontroller($scope, rmMeetupOauthService, rmMeetupMemberService){
        $scope.token = '';
        $scope.expiresIn = '';
        $scope.member;

        $scope.refresh = function(token, expiresIn){
            $scope.$apply(function() {
                $scope.token = token;
                $scope.expiresIn = expiresIn;
                rmMeetupMemberService.getLoggedMember(token).then(function(member){
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

            rmMeetupMemberService.getLoggedMember(oauthAccess.tokenAccess).then(function(member){
                $scope.member = member;
            });
        }
    }
})();