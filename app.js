// app.js

var app = angular.module('CollectGameApp', []);

app.controller('GameController', function($scope) {
  // Start with empty inventory
  $scope.inventory = [];

  // Add clicked item to inventory
  $scope.collect = function(item) {
    $scope.inventory.push(item);
  };
});
