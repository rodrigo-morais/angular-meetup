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