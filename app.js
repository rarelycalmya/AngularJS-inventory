var app = angular.module('CollectGameApp', []);

app.controller('GameController', function($scope) {
  $scope.inventory = [];

  // Define collectible classes
  function Apple() {
    this.name = "Apple";
    console.log("Created new Apple object");
  }

  function Banana() {
    this.name = "Banana";
    console.log("Created new Banana object");
  }

  // Map class names to constructors
  var classMap = {
    'Apple': Apple,
    'Banana': Banana
  };

  // Called when dragging starts
  $scope.dragStart = function(event, className) {
    event.dataTransfer.setData("text/plain", className);
    console.log("Dragging:", className);
  };

  // Called when dropped into inventory
  $scope.onDrop = function(event) {
    event.preventDefault();
    var className = event.dataTransfer.getData("text/plain");
    var constructorFn = classMap[className];

    if (constructorFn) {
      var obj = new constructorFn();
      $scope.$apply(function() {
        $scope.inventory.push(obj);
      });
    }
  };
});
