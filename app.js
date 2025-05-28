var app = angular.module('CollectGameApp', []);

app.controller('GameController', function($scope) {
  $scope.inventory = [];

  $scope.dragStart = function(event, itemName) {
    event.dataTransfer.setData("text/plain", itemName);
  };

  $scope.onDrop = function(event) {
    event.preventDefault();
    var item = event.dataTransfer.getData("text/plain");

    // Angular doesn't automatically know to update view from native events
    $scope.$apply(function() {
      $scope.inventory.push(item);
    });
  };
});
