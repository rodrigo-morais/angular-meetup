(function(){
    'use strict';

    rmMeetup.factory('rmMeetupRSVPsService',
    ['$q', '$resource', rmMeetupRSVPsService]);

    function rmMeetupRSVPsService($q, $resource) {
        var RSVPs = $resource(
            'https://api.meetup.com/2/rsvps',
            {},
            {
                post: {
                    method: 'POST'
                }
            }
        );

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
            },
            post: function(access_token, event_id, member_id, response){
                var deferred = $q.defer();
/*
                this
                    .getByEventId(access_token, event_id)
                    .then(function(rspvs){
                        var rsvp = rspvs.results.filter(function(_rsvp){
                            return _rsvp.member.member_id === member_id;
                        });

                        if(rsvp.length > 0){
                            rsvp = rsvp[0];
                            rsvp.response = 'yes';

                            rsvp.$save();
                        }
                    });
*/
                RSVPs.post(
                    {
                        access_token: access_token,
                        event_id: event_id,
                        member_id: member_id,
                        rsvp: response
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