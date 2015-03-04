(function() {
    'use strict';
    
    rmMeetup.directive('rmMeetupOauth',
    ['$window', 'rmConsumer',rmMeetupOauthDirective]);

    function rmMeetupOauthDirective($window, rmConsumer) {

        $window.onMeetupAuth = function(tok) {
            console.log('onMeetupAuth');
            console.log(tok);
        };

        $window.onMeetupDenial = function(err) {
            console.log('onMeetupDenial');
            console.log(err);
        };

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
            controller: 'rmMeetupOauthController',
            link: function (scope, element, attrs, controller) {
                _isAuthorized();
                element.on('click', function(){
                    _requestAuthorization();
                });
            }
        };

    }
})();