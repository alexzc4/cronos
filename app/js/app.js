angular.module('BlankApp', ['ngMaterial','ngRoute','slickCarousel'])
  .controller('AppCtrl', function ($scope, $timeout, $mdSidenav) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      }
    }
  })

  .config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "pages/entry.html"
    })
    .when("/projects", {
        templateUrl : "pages/projects.html",
        controller: 'projectsCtrl'
    })
    .when("/contacts", {
        templateUrl : "pages/contacts.html",
        controller: 'contactsCtrl'
    })
    .otherwise({
    	redirectTo: '/contacts',
    	controller: 'contactsCtrl'
  	})

	})

    .controller('contactsCtrl', function ($scope, $templateCache) {
	    $templateCache.remove('/pages/contacts.html');
	    // or
	    $templateCache.removeAll();
    })

    .controller('projectsCtrl', function ($scope, $templateCache) {
	    $templateCache.remove('/pages/projects.html');
	    // or
	    $templateCache.removeAll();
    })

    .directive('includeReplace', function () {
        return {
            require: 'ngInclude',
            restrict: 'A', /* optional */
            link: function (scope, el, attrs) {
                el.replaceWith(el.children());
            }
        };
    });

