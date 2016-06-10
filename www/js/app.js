// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [
  'ionic',
  'config',
  'starter.auth',
  'starter.game',
  'starter.push',
  'ionic.service.core',
  'ionic.service.push',
  'ngCordova',
  'ng-token-auth',
  'ngResource'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($authProvider, ENV) {
  $authProvider.configure({
    apiUrl: ENV.apiEndpoint
  });
})

.config(['$ionicAppProvider', function($ionicAppProvider) {
  $ionicAppProvider.identify({
    app_id: 'ef8ae3d2',
    api_key: '3574be70b4acee2841c18aeed47154b49191ad8bfacee05b',
    dev_push: true
  });
}])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Tabs
  .state('tab.points', {
    url: '/points',
    views: {
      'tab-points': {
        templateUrl: 'templates/tab-points.html',
        controller: 'GameCtrl'
      }
    }
  })

  .state('tab.games', {
    url: '/games',
    views: {
      'tab-games': {
        templateUrl: 'templates/tab-games.html',
        controller: 'GameCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AuthCtrl'
      }
    }
  })

  .state('tab.logout', {
    url: '/logout',
    views: {
      'tab-logout': {
        templateUrl: 'templates/register.html',
        controller: 'AuthCtrl'
      }
    }
  })

  // Tabs

  .state('app.register', {
    url: "/register",
    abstract: true,
    templateUrl: "templates/register.html",
    controller: 'AuthCtrl'
  })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AuthCtrl'
  })

  .state('app.top', {
    url: "/top",
    views: {
      'menuContent': {
        templateUrl: "templates/top.html"
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
})

.factory('Game', ['$resource', 'ENV', function($resource, ENV) {
    var Game;
    return Game = (function() {
      function Game(errorHandler) {
        this.service = $resource(ENV.apiEndpoint + '/games.json', {}, {
          'query': {
            method: 'GET'
          }
        });
        this.errorHandler = errorHandler;
      }

      Game.prototype.all = function() {
        return this.service.query((function() {
          return null;
        }), this.errorHandler);
      };

      return Game;

    })();
  }
]);
