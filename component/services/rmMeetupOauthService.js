(function(){
    'use strict';

    rmMeetup.factory('rmMeetupOauthService',
    ['$q', '$resource', 'OauthAccess', rmMeetupOauthService]);

    function rmMeetupOauthService($q, $resource, OauthAccess) {
        var Authentication = $resource('');

        return{
            getOauthAccess: function(){
                return OauthAccess;
            }
        };
    }
})();