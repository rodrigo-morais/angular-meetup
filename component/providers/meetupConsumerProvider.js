rmMeetup.provider("consumer", function(){
    var key = '',
        secret = '',
        redirect_uri = '';

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
        return{
            key: this.key,
            secret: this.secret,
            redirect_uri: this.redirect_uri
        }
    };
});