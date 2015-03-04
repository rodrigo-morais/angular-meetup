var rmMeetup = angular.module('rmMeetup', ['ngSanitize', 'ngResource'])
                    .config(
                        [
                            '$httpProvider',
                            function ($httpProvider) {
                                $httpProvider.defaults.useXDomain = true;
                                delete $httpProvider.defaults.headers.common['X-Requested-With'];
                            }
                        ]
                    );
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
    ['$window', 'rmConsumer',rmMeetupOauthDirective]);

    function rmMeetupOauthDirective($window, rmConsumer) {

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

        var html = 'component/templates/meetupOauth.html';

        return {
            restrict: 'E',
            templateUrl: html,
            replace: true,
            transclude: true,
            controller: 'rmMeetupOauthController',
            link: function (scope, element, attrs, controller) {
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
            authorize_uri = 'https://secure.meetup.com/oauth2/authorize/?response_type=token&';

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
                this.authorize_uri = 'https://secure.meetup.com/oauth2/authorize/?response_type=token&';
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
    ['$q', '$resource', rmMeetupOauthService]);

    function rmMeetupOauthService($q, $resource) {
        var Authentication = $resource('');

        return{
        };
    }
})();