var rmMeetup = angular.module('rmMeetup', ['ngSanitize']);
angular.module('rmMeetup').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('component/templates/meetupOauth.html',
    "<a  data-ng:transclude>\n" +
    "</a>"
  );

}]);

(function() {
    'use strict';
    
    rmMeetup.directive('rmMeetupOauth',
    [rmMeetupOauthDirective]);

    function rmMeetupOauthDirective() {

        var html = 'component/templates/meetupOauth.html';

        return {
            restrict: 'E',
            templateUrl: html,
            replace: true,
            transclude: true,
            link: function (scope, element, attrs, controller) {
                element.on('click', function(){
                    console.log('click in element');
                });
            }
        };

    }
})();
(function() {
    'use strict';

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
            };
        };
    });
})();