angular.module('rmMeetup').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('component/templates/groupsList.html',
    "<ul>\n" +
    "    <li data-ng:repeat=\"group in groups\">\n" +
    "        {{group.name}}\n" +
    "    </li>\n" +
    "</ul>"
  );


  $templateCache.put('component/templates/groupsTable.html',
    "<table data-ng:if=\"hasGroups\">\n" +
    "    <thead>\n" +
    "        <tr>\n" +
    "            <th>ID</th>\n" +
    "            <th>Name</th>\n" +
    "        </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "        <tr data-ng:repeat=\"group in groups\">\n" +
    "            <td>\n" +
    "                {{group.id}}\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                {{group.name}}\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "</table>"
  );


  $templateCache.put('component/templates/meetupOauth.html',
    "<a  data-ng:transclude>\n" +
    "</a>"
  );

}]);
