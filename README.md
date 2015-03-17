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

## Members service
It's a service to get data from member logged on Meetup.com API. This service should receive the access token returned by Oauth directive or service and will return data from member logged. The details about data returned is avaliable in address http://www.meetup.com/meetup_api/docs/2/members/.

```sh
app.controller("MeetupController", ['$scope', 'rmMeetupMembersService', meetupontroller]);

function meetupontroller($scope, rmMeetupMembersService){
    $scope.getMember = function(token){
        rmMeetupMembersService.getLoggedMember(token).then(function(member){
            $scope.member = member;
        });
    }
};
```

## Groups service
It's a service to get data from groups that exist in Meetup.com. This service has three options to find data that will be descripted bellow. The details about data returned is avaliable in address http://www.meetup.com/meetup_api/docs/2/groups/.

- Filter the group by ID - inform the access token and the group id. This service will return data from group which the ID was informed.

```sh
app.controller("MeetupController", ['$scope', 'rmMeetupMembersService', meetupontroller]);

function meetupontroller($scope, rmMeetupGroupService){
    $scope.getGroup = function(token, id){
        rmMeetupGroupService.getById(token, id).then(function(group){
            $scope.group = group;
        });
    }
};
```

- Filter the group by topic - inform the access token and the topic. This service will return a list of groups that has this topic listed in its topics list.

```sh
app.controller("MeetupController", ['$scope', 'rmMeetupMembersService', meetupontroller]);

function meetupontroller($scope, rmMeetupGroupService){
    $scope.getGroups = function(token){
        rmMeetupGroupService.getByTopic(token, 'AngularJS').then(function(groups){
            $scope.groups = groups;
        });
    }
};
```

- Filter the group by parameters - inform the access token and all parameters that is possible filter a group on Meetup.com API. This service is more flexible, because the users can create the filter according to their necessities and it will return a list of groups. The parameters is a JSON object that will accept all parameters informed in Meetup.com API page in address http://www.meetup.com/meetup_api/docs/2/groups/.

```sh
app.controller("MeetupController", ['$scope', 'rmMeetupMembersService', meetupontroller]);

function meetupontroller($scope, rmMeetupGroupService){
    $scope.getGroups = function(token){
        var parameters = {
            'member_id': 65760712,
            'topic': 'AngularJS'
        };
        rmMeetupGroupService.get(token, parameters).then(function(groups){
            $scope.groups = groups;
        });
    }
};
```

## Events service
It's a service to get data from events that exist in Meetup.com. This service has three options to find data that will be descripted bellow. The details about data returned is avaliable in address http://www.meetup.com/meetup_api/docs/2/events/.

- Filter the event by ID - inform the access token and the event id. This service will return data from event which the ID was informed.

```sh
app.controller("MeetupController", ['$scope', 'rmMeetupEventsService', meetupontroller]);

function meetupontroller($scope, rmMeetupEventsService){
    $scope.getEvent = function(token, id){
        rmMeetupEventsService.getByEventId(token, id).then(function(event){
            $scope.event = event;
        });
    }
};
```

- Filter the event by group id - inform the access token and the group id. This service will return a list of events that exist in group informed. Is possible inform the status of event that should be filtered. There are four options of status that could be informed:
  - upcoming
  - past
  - proposed
  - suggested
The status should be informed in a string where each one should be separate with comma. If none status is informed then the service will filter for all.

```sh
app.controller("MeetupController", ['$scope', 'rmMeetupEventsService', meetupontroller]);

function meetupontroller($scope, rmMeetupEventsService){
    $scope.getEvents = function(token, groupId){
        var status = 'upcoming';
        rmMeetupEventsService.getByGroupId(token, groupId).then(function(events){
            $scope.events = events;
        });
    }
};
```

- Filter the event by parameters - inform the access token and all parameters that is possible filter a event on Meetup.com API. This service is more flexible, because the users can create the filter according to their necessities and it will return a list of events. The parameters is a JSON object that will accept all parameters informed in Meetup.com API page in address http://www.meetup.com/meetup_api/docs/2/events/.

```sh
app.controller("MeetupController", ['$scope', 'rmMeetupEventsService', meetupontroller]);

function meetupontroller($scope, rmMeetupEventsService){
    $scope.getEvents = function(token){
        var parameters = {
            'member_id': 63450718,
            'status': 'upcoming'
        };
        rmMeetupEventsService.get(token, parameters).then(function(events){
            $scope.events = events;
        });
    }
};
```

## RSVPs service
It's a service to get data from RSVPs that exist in Meetup.com from exactly event. The details about data returned is avaliable in address http://www.meetup.com/meetup_api/docs/2/rsvps/.

- Filter the RSVPs by event ID - inform the access token and the event ID. This service will return data from RSVPs to according to the event ID was informed.

```sh
app.controller("MeetupController", ['$scope', 'rmMeetupRSVPsService', meetupontroller]);

function meetupontroller($scope, rmMeetupRSVPsService){
    $scope.getRSVPs = function(token, eventId){
        rmMeetupRSVPsService.getByEventId(token, eventId).then(function(rsvps){
            $scope.rsvps = rsvps;
        });
    }
};
```

## Groups service
It's a directive to to present groups that exist in Meetup.com. The directive can present the data of groups in format of list or table. To use this directive is necessary inform the access token and one form to find the groups data.
The form of filter data of group is the same used in groups service using group ID, topic or parameters. Go to <a href="angular-meetup#groups-service">Groups services</a> to see details about how work with these filters.

```sh
<rm-meetup-groups
    access-token={{token}}
    topic = 'AngularJS'
>
</rm-meetup-groups>
```