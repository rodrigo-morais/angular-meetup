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

    app.controller(controllerId, ['$scope', meetupontroller]);

    function meetupontroller($scope){
        $scope.token = '';
        $scope.expiresIn = '';

        $scope.refresh = function(token, expiresIn){
            $scope.$apply(function() {
                $scope.token = token;
                $scope.expiresIn = expiresIn;
            });
        }

        $scope.clear = function(){
            $scope.token = '';
            $scope.expiresIn = '';
        }
    }
})();