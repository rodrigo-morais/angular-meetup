angular.module('rmMeetup').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('component/templates/groupsList.html',
    "<ul>\n" +
    "    <li data-ng:repeat=\"group in groups\">\n" +
    "        {{group.name}}\n" +
    "    </li>\n" +
    "</ul>"
  );


  $templateCache.put('component/templates/meetupOauth.html',
    "<a  data-ng:transclude>\n" +
    "</a>"
  );

}]);
