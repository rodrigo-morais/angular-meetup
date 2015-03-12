angular.module('rmMeetup').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('component/templates/eventsList.html',
    "<ul>\n" +
    "    <li data-ng:repeat=\"event in events\">\n" +
    "        {{event.name}}\n" +
    "    </li>\n" +
    "</ul>"
  );


  $templateCache.put('component/templates/eventsTable.html',
    "<table data-ng:if=\"hasEvents\">\n" +
    "    <thead>\n" +
    "        <tr class=\"eventHeaderLine\">\n" +
    "            <th data-ng:repeat=\"field in fields\" class=\"{{field.field}}Label\">\n" +
    "                {{field.label}}\n" +
    "            </th>\n" +
    "        </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "        <tr data-ng:repeat=\"event in events\" class=\"eventBodyLine\">\n" +
    "            <td data-ng:repeat=\"field in fields\" class=\"{{field.field}}Value\">\n" +
    "                {{getData(event, field.field)}}\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "</table>"
  );


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
    "        <tr class=\"groupHeaderLine\">\n" +
    "            <th data-ng:repeat=\"field in fields\" class=\"{{field.field}}Label\">\n" +
    "                {{field.label}}\n" +
    "            </th>\n" +
    "        </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "        <tr data-ng:repeat=\"group in groups\" class=\"groupBodyLine\">\n" +
    "            <td data-ng:model=\"group.name\" data-ng:repeat=\"field in fields\" class=\"{{field.field}}Value\">\n" +
    "                {{group[field.field]}}\n" +
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
