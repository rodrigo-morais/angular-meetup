(function(){
    'use strict';

    rmMeetup.factory('rmMeetupEventsService',
    ['$q', '$resource', rmMeetupEventsService]);

    function rmMeetupEventsService($q, $resource) {
        var Events = $resource(
            'https://api.meetup.com/2/events'
        );

        return{
            getByGroupId: function(access_token, group_id, status){
                var deferred = $q.defer();

                if(status === null || status === undefined){
                    status = 'upcoming,past,proposed,suggested';
                }

                Events.get(
                    {
                        access_token: access_token,
                        group_id: group_id,
                        status: status
                    }
                )
                .$promise
                .then(function(member){
                    deferred.resolve(member);
                });

                return deferred.promise;
            },
            getByEventId: function(access_token, event_id, status){
                var deferred = $q.defer();

                if(status === null || status === undefined){
                    status = 'upcoming,past,proposed,suggested';
                }

                Events.get(
                    {
                        access_token: access_token,
                        event_id: event_id,
                        status: status
                    }
                )
                .$promise
                .then(function(member){
                    deferred.resolve(member);
                });

                return deferred.promise;
            }
        };
    }
})();