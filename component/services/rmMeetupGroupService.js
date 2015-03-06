(function(){
    'use strict';

    rmMeetup.factory('rmMeetupGroupService',
    ['$q', '$resource', rmMeetupGroupService]);

    function rmMeetupGroupService($q, $resource) {
        var Group = $resource(
            'https://api.meetup.com/2/groups'
        );

        return{
            get: function(access_token, group_id){
                var deferred = $q.defer();

                Group.get(
                    {
                        access_token: access_token,
                        group_id: group_id
                    }
                )
                .$promise
                .then(function(member){
                    deferred.resolve(member);
                });

                return deferred.promise;
            },
            getByTopic: function(access_token, topic){
                var deferred = $q.defer();

                Group.get(
                    {
                        access_token: access_token,
                        topic: topic
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