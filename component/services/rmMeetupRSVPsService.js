(function(){
    'use strict';

    rmMeetup.factory('rmMeetupRSVPsService',
    ['$q', '$resource', rmMeetupRSVPsService]);

    function rmMeetupRSVPsService($q, $resource) {
        var RSVPs = $resource('https://api.meetup.com/2/rsvps');

        return{
            getByEventId: function(access_token, event_id){
                var deferred = $q.defer();

                RSVPs.get(
                    {
                        access_token: access_token,
                        event_id: event_id
                    }
                )
                .$promise
                .then(function(rsvps){
                    deferred.resolve(rsvps);
                });

                return deferred.promise;
            }
        };
    }
})();