var app = angular.module('CollectGameApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'enter.html',
      controller: 'MainController'
    })
    .when('/game', {
      templateUrl: 'game.html',
      controller: 'GameController'
    })
    .when('/summary', {
      templateUrl: 'summary.html',
      controller: 'SummaryController'
    })
    .otherwise({ redirectTo: '/' });
});

app.factory('UserService', function() {
  var users = [];
  var currentUser = null;

  return {
    setCurrentUser: function(name) {
      currentUser = { name: name, inventory: [] };
      users.push(currentUser);
    },
    getCurrentUser: function() {
      return currentUser;
    },
    addItemToCurrentUser: function(item) {
      if (currentUser) {
        currentUser.inventory.push(item);
      }
    },
    getAllUsers: function() {
      return users;
    }
  };
});

app.controller('MainController', function($scope, $location, UserService) {
  $scope.startGame = function() {
    if ($scope.userName && $scope.userName.trim() !== '') {
      UserService.setCurrentUser($scope.userName.trim());
      $location.path('/game');
    }
  };
});

app.controller('GameController', function($scope, $location, UserService) {
  $scope.currentUser = UserService.getCurrentUser();
  $scope.inventory = $scope.currentUser.inventory;

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

  $scope.dragStart = function(event, className) {
    event.dataTransfer.setData("text/plain", className);
    console.log("Dragging:", className);
  };

  $scope.onDrop = function(event) {
    event.preventDefault();
    var className = event.dataTransfer.getData("text/plain");
    var constructorFn = classMap[className];
    if (constructorFn) {
      var obj = new constructorFn();
      $scope.$apply(function() {
        UserService.addItemToCurrentUser(obj);
      });
    }
  };

  $scope.submitInventory = function() {
    $location.path('/summary');
  };
});

app.controller('SummaryController', function($scope, UserService) {
  $scope.allUsers = UserService.getAllUsers();
});
