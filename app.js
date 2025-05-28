var app = angular.module('OnboardingApp', []);

app.controller('Controller', function($scope) {
  $scope.inventory = [];

  $scope.dragStart = function(event, itemName) {
    event.dataTransfer.setData("text/plain", itemName);
  };

  $scope.onDrop = function(event) {
    event.preventDefault();
    var item = event.dataTransfer.getData("text/plain");

    $scope.$apply(function() {
      $scope.inventory.push(item);
    });
  };
});
