
var cronosApp = angular.module('cronosApp', ['ngMaterial','ngRoute','slick','angular-loading-bar','ngAnimate','cfp.loadingBar','ngSanitize'])

  cronosApp.controller('AppCtrl', function ($scope, $timeout, $mdSidenav) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      }
    }
  })

  cronosApp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "pages/entry.html"
    })
    .when("/projects", {
        templateUrl : "pages/projects/projects.html",
        controller: 'projectsCtrl'
    })
    .when("/work", {
        templateUrl : "pages/how-we-work/work.html",
        controller: 'workCtrl'
    })
    .when("/contacts", {
        templateUrl : "pages/contacts/contacts.html",
        controller: 'contactsCtrl'
    })
    .when("/projects/:projectId", {
        templateUrl : "pages/project-detail.html",
        controller: 'projectDetailCtrl'
    })
    .otherwise({
      redirectTo: '/contacts'
    });

  })

  cronosApp.run(function($rootScope, $templateCache) {
   $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
   });
});


    cronosApp.controller('contactsCtrl', function ($scope, $templateCache) {
      $templateCache.removeAll();
    })

    cronosApp.controller('projectsCtrl',['$scope','$http', '$location','$sce', function($scope, $http, $location,$sce) {
      $http.get('pages/projects/projects.json?ver=1').success(function(data, status, headers, config) {
        $scope.projects = data;
      });

    }]);


    cronosApp.controller('workCtrl',['$scope','$http', '$location', function($scope, $http, $location) {
      $http.get('pages/how-we-work/how-we-work.json').success(function(data, status, headers, config) {
        $scope.work = data;
      })
    }]);

    cronosApp.controller('projectDetailCtrl',['$scope','$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
        $scope.projectId = $routeParams.projectId;
        var url = 'pages/projects/'+$routeParams.projectId+'.json';

        $http.get(url).success(function(data) {
          $scope.project = data;
        });


        

    }]);

    cronosApp.directive('includeReplace', function () {
        return {
            require: 'ngInclude',
            restrict: 'A', /* optional */
            link: function (scope, el, attrs) {
                el.replaceWith(el.children());
            }
        };
    });

