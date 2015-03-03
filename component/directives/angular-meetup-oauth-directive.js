(function() {
    'use strict';
    
    rmMeetup.directive('rmMeetupOauth',
    ['$window', 'rmConsumer',rmMeetupOauthDirective]);

    function rmMeetupOauthDirective($window, rmConsumer) {

        var requestAuthorization = function() {
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
                    requestAuthorization();
                });
            }
        };

    }
})();