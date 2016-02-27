var app = angular.module('canvasApp', []);

app.controller('CanvasController', function($scope, $http) {
  $http.get('json/example.json').then(
    function(res){
      $scope.canvas = res.data;
    });
});

app.directive('card', function() {
  return {
    restrict: 'E',
    scope: {
      canvas: '=canvas',
      cardType: '@type'
    },
    templateUrl: 'card.html'
  }
});
