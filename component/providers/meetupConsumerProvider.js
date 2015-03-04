(function() {
    'use strict';

    rmMeetup.provider("rmConsumer", function(){
        var key = '',
            secret = '',
            redirect_uri = '',
            authorize_uri = 'https://secure.meetup.com/oauth2/authorize/?response_type=token&scope=ageless';

        this.setAuthorizeURI = function(_uri){
            this.authorize_uri = _uri;
        };

        this.setKey = function(_key){
            this.key = _key;
        };

        this.setSecret = function(_secret){
            this.secret = _secret;
        };

        this.setRedirectURI = function(_uri){
            this.redirect_uri = _uri;
        };

        this.$get = function(){
            if( this.authorize_uri === undefined ||
                this.authorize_uri === ''){
                this.authorize_uri = 'https://secure.meetup.com/oauth2/authorize/?response_type=token&scope=ageless';
            }


            return{
                key: this.key,
                secret: this.secret,
                redirect_uri: this.redirect_uri,
                authorize_uri: this.authorize_uri + '&client_id=' + this.key + '&redirect_uri=' + this.redirect_uri
            };
        };
    });
})();