var rmMeetup = angular.module('rmMeetup', ['ngSanitize', 'ngResource'])
                    .config(
                        [
                            '$httpProvider',
                            function ($httpProvider) {
                                $httpProvider.defaults.useXDomain = true;
                                delete $httpProvider.defaults.headers.common['X-Requested-With'];
                            }
                        ]
                    )
                    .value('OauthAccess', {
                        tokenAccess: '',
                        expiresId: ''
                    });
angular.module('rmMeetup').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('component/templates/meetupOauth.html',
    "<a  data-ng:transclude>\n" +
    "</a>"
  );

}]);

(function(){
    'use strict';

    rmMeetup.controller('rmMeetupOauthController',
    ['$q', '$scope', 'rmMeetupOauthService', rmMeetupOauthController]);

    function rmMeetupOauthController($q, $scope, rmMeetupOauthService){
        
    }

})();
(function() {
    'use strict';
    
    rmMeetup.directive('rmMeetupOauth',
    ['$window', 'rmConsumer', 'OauthAccess',rmMeetupOauthDirective]);

    function rmMeetupOauthDirective($window, rmConsumer, OauthAccess) {

        var _requestAuthorization = function() {
            var width = 500,
                height = 350,
                top = (screen.height - height)/2,
                left = (screen.width - width)/2;
            $window.open(
                rmConsumer.authorize_uri,
                "Meetup",
                ["height=", height, ",width=", width,
                 ",top=", top, ",left=", left].join(''));    
        };

        var _isAuthorized = function(){
            var frag = window.location.hash;
            if(frag) {
                var fp = frag.substring(1).split('&'),
                    i = fp.length,
                    params = {},
                    re = /(\S+)=(\S+)/,
                    inject = function(pair) {
                        if(re.test(pair)) {
                            var kv = re.exec(pair).splice(1, 2);
                            params[kv[0]] = kv[1];
                        }
                    };

                    while(i--){
                        inject(fp[i]);
                    }

                    if(params.access_token) {
                        $window.close();
                        $window
                            .opener
                            .onMeetupAuth(params.access_token, params.expires_in);
                    } else if(params.error) {
                        $window.close();
                        $window.opener.onMeetupDenial(params.error);
                    }
                }
        };

        var html = 'component/templates/meetupOauth.html';

        return {
            restrict: 'E',
            templateUrl: html,
            replace: true,
            transclude: true,
            scope: {
                refreshToken: '&'
            },
            controller: 'rmMeetupOauthController',
            link: function (scope, element, attrs, controller) {
                $window.onMeetupAuth = function(tok, expiresIn) {
                    OauthAccess.tokenAccess = tok;
                    OauthAccess.expiresIn = expiresIn;

                    if(scope.refreshToken){
                        scope.refreshToken({token:tok, expiresIn: expiresIn});
                    }
                };

                $window.onMeetupDenial = function(err) {
                    console.log(err);
                };

                _isAuthorized();

                element.on('click', function(){
                    _requestAuthorization();
                });
            }
        };

    }
})();
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