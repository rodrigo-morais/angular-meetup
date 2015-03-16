# angular-meetup
This component should be use to use Meetup.com login to access a project using Oauth2. With this component is possible show data of logged member, groups, events and RSVP.

[![Build Status](https://travis-ci.org/rodrigo-morais/angular-meetup.svg?branch=master)](https://travis-ci.org/rodrigo-morais/angular-meetup)

## Installation

To install witn Bower:

```sh
$ bower install angular-meetup --save-dev
```
## Oauth login
It's a directive that can be used to login in some website or project to use user data from Meetup.com API to access it. This directive will wrap the HTML code that will be clicked to call another window to confirm the use of Meetup.com access data to navigate in website or project that using the component as client.

```sh
------ template ------
<rm-meetup-oauth>
    Connect in Meetup.com API
</rm-meetup-oauth>
```

Is possible to inform a function to Oauth directive that will be called, as a callback, after access in Meetup.com be confirmed. This function will receive two parameters:
  - token - is a token to access others data in Meetup.com API. It can be use to control the access in website or project;
  - expiresIn - is an expiration time of token that was received after login or authorization in Meetup.com API;

```sh
----- callback in a controller, for example ------
$scope.refresh = function(token, expiresIn){
    $scope.token = token;
    $scope.expiresIn = expiresIn;
}

------ template ------
<rm-meetup-oauth refresh-token="refresh(token, expiresIn)">
    Connect in Meetup.com API
</rm-meetup-oauth>
```
To can access Meetup.com API is necessary have a key and a return address. To see informations about how create key and inform the return address to Meetup.com API, please, visit this website http://www.meetup.com/meetup_api/auth/#oauth2.
To inform the key and address of return in this component is necessary to set the data in a provider when start the module of app.

```sh
var app = angular.module('myApp', ['rmMeetup'])
    .config(
        [
            "rmConsumerProvider",
            function(rmConsumerProvider) {
                rmConsumerProvider.setKey('df1i56khtrdsi8sk69sgljjkn');
                rmConsumerProvider.setRedirectURI('http://localhost:8080');
            }
        ]
    );
```

## Oauth service
It's a service to get data from Oauth after be authorized in Meetup.com API. This service will return token of access and expiration time.

```sh
app.controller("MeetupController", ['$scope', 'rmMeetupOauthService', meetupontroller]);

function meetupontroller($scope, rmMeetupOauthService){
    $scope.refreshOauthAccess = function(){
        var oauthAccess = rmMeetupOauthService.getOauthAccess();

        $scope.token = oauthAccess.tokenAccess;
        $scope.expiresIn = oauthAccess.expiresIn;
    }
};
```