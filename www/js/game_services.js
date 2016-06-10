angular.module('starter').factory('Game', ['$resource', 'ENV', function($resource, ENV) {
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

