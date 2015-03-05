(function() {
    'use strict';

    rmMeetup.provider("rmOauthAccess", function(){
        var access_token = '',
            expires_in = '';

        this.setAccessToken = function(_token){
            this.access_token = _token;
        };

        this.setExpiresIn = function(_expires){
            this.expires_in = _expires;
        };

        this.$get = function(){
            return{
                accessToken: this.access_token,
                expiresIn: this.expires_in
            };
        };
    });
})();