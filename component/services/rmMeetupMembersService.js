(function(){
    'use strict';

    rmMeetup.factory('rmMeetupMembersService',
    ['$q', '$resource', rmMeetupMembersService]);

    function rmMeetupMembersService($q, $resource) {
        var Member = $resource(
            'https://api.meetup.com/2/member/self?access_token=:access_token',
            {access_token: '@_access_token'}
        ); 

        return{
            getLoggedMember: function(access_token){
                var deferred = $q.defer();

                Member.get(
                    {
                        access_token: access_token
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