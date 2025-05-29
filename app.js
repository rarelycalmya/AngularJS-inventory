angular.module('CollectGameApp', [])
  .controller('MainController', ['$scope', function($scope) {
    $scope.page = 'enter'; // enter | game | summary
    $scope.userName = '';
    $scope.allUsers = [];
    $scope.currentUser = null;

    // Classes for collectibles
    function Apple() {
      this.name = "Apple";
      console.log("Created new Apple object");
    }
    function Banana() {
      this.name = "Banana";
      console.log("Created new Banana object");
    }

    var classMap = {
      'Apple': Apple,
      'Banana': Banana
    };

    $scope.startGame = function() {
      $scope.currentUser = { name: $scope.userName.trim(), inventory: [] };
      $scope.allUsers.push($scope.currentUser);
      $scope.page = 'game';
    };

    $scope.dragStart = function(event, className) {
      event.dataTransfer.setData("text/plain", className);
      console.log("Dragging:", className);
    };

    $scope.onDrop = function(event) {
      event.preventDefault();
      var className = event.dataTransfer.getData("text/plain");
      var ConstructorFn = classMap[className];
      if (ConstructorFn) {
        var obj = new ConstructorFn();
        $scope.$apply(function() {
          $scope.currentUser.inventory.push(obj);
        });
      }
    };

    $scope.goToSummary = function() {
      $scope.page = 'summary';
    };

    $scope.resetGame = function() {
      $scope.userName = '';
      $scope.currentUser = null;
      $scope.page = 'enter';
    };
  }]);
