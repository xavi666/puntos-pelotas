angular.module('starter.game', [])

.controller('GameCtrl', function($scope, Game) {
  this.gameService = new Game(serverErrorHandler);
  this.gameService.all().$promise.then(function(result) {
    console.log(result);
    return $scope.games = result.games;
  });

  var serverErrorHandler = function() {
    return console.log("There was a server error.");
  };
});

