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