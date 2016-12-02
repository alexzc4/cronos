
var cronosApp = angular.module('cronosApp', ['ngMaterial','ngAnimate','ngRoute','slick','angular-loading-bar','ngAnimate','cfp.loadingBar','ngSanitize','ui.router','countTo'])

  cronosApp.controller('AppCtrl', function ($scope, $timeout, $mdSidenav) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      }
    }


  });

  cronosApp.controller('HeaderController', function ($scope, $location) 
  { 
    $scope.getClass = function (path) {
      return ($location.path().substr(0, path.length) === path) ? 'active' : '';
    }
  })



  cronosApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        
        .state('work', {
            url: '/how-we-work',
            cache: false,
            templateUrl: 'pages/how-we-work/work.html',
            controller: 'workCtrl',
            title: 'Как мы работаем',    
        })

        .state('contacts', {
            url: '/contacts',
            cache: false,
            templateUrl: 'pages/contacts/contacts.html',
            controller: 'contactsCtrl',
            title: 'Контакты',
        })     

        .state('projects', {
            url: '/projects',
            cache: false,
            templateUrl: 'pages/projects/projects.html',
            controller: 'projectsCtrl',
            title: 'Проекты',
        })  

        .state('azs', {
            url: '/azs',
            cache: false,
            templateUrl: 'pages/azs/azs.html',
            controller: 'azsCtrl',
            title: 'АЗС',
        }) 

        .state('communication', {
            url: '/communication',
            cache: false,
            templateUrl: 'pages/communication/communication.html',
            controller: 'communicationCtrl',
            title: 'Инженерные коммуникации',
        })  

        .state('projectsD', {
            url: '/projects/{projectId}',
            templateUrl: 'pages/project-detail.html',
            title: 'Проекты',
            controller: function($scope, $http, $location, $stateParams) {

                $scope.projectId = $stateParams.projectId;

                var url = 'pages/projects/'+$stateParams.projectId+'.json';

                $http.get(url).success(function(data) {
                  $scope.project = data;
                });

            }
        })   
  });

  cronosApp.config(["$locationProvider","$urlRouterProvider", function($locationProvider,$urlRouterProvider) {
   $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
}]);

  cronosApp.run(function($rootScope){
    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
        $rootScope.pageTitle = toState.title;
    });
});

  cronosApp.controller('contactsCtrl', function ($scope, $templateCache) {
    $templateCache.removeAll();
  });

  cronosApp.controller('projectsCtrl',['$scope','$http', '$location','$sce', function($scope, $http, $location,$sce) {
    $http.get('pages/projects/projects.json').success(function(data, status, headers, config) {
      $scope.projects = data;
    });

  }]);

  cronosApp.controller('workCtrl',['$scope','$http', '$location','$state', function($scope, $http, $location,$state) {
   $scope.reload = function(){
      $state.reload('work');
    }

    $http.get('pages/how-we-work/how-we-work.json').success(function(data, status, headers, config) {
      $scope.work = data;
    })
  }]);

  cronosApp.controller('azsCtrl',['$scope','$http', '$location', function($scope, $http, $location) {
    $http.get('pages/azs/azs.json').success(function(data, status, headers, config) {
      $scope.work = data;
    })
  }]);

  cronosApp.controller('communicationCtrl',['$scope','$http', '$location', function($scope, $http, $location) {
    $http.get('pages/communication/communication.json').success(function(data, status, headers, config) {
      $scope.communication = data;
    })
  }]);
