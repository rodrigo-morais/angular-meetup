(function(){
    'use strict';

    rmMeetup.factory('rmMeetupEventsService',
    ['$q', '$resource', rmMeetupEventsService]);

    function rmMeetupEventsService($q, $resource) {
        var Group = $resource(
            'https://api.meetup.com/2/events'
        );

        return{
            getByGroupId: function(access_token, group_id, status){
                var deferred = $q.defer();

                if(status === null || status === undefined){
                    status = 'upcoming,past,proposed,suggested';
                }

                Group.get(
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
            }
        };
    }
})();