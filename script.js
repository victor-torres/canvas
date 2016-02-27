var app = angular.module('canvasApp', ['selectize']);

app.controller('CanvasController', function($scope, $http) {
  $http.get('json/index.json').then(
    function(res) {
      $scope.canvasIndex = res.data.index;
      $scope.selectedCanvas = $scope.canvasIndex[0];
      $scope.selectizeOptions = $scope.canvasIndex;
    });

  $scope.selectizeConfig = {
    create: false,
    valueField: 'file',
    labelField: 'name',
    searchField: ['file', 'name', 'description'],
    delimiter: '|',
    placeholder: 'Choose a canvas',
    onInitialize: function(selectize) {
      // receives the selectize object as an argument
    },
    render: {
      item: function(item, escape) {
        return '<div>' +
          (item.name ? '<span class="name">' + escape(item.name) + '</span>' : '') +
          (item.description ? '<span class="description">' + escape(item.description) + '</span>' : '') +
          '</div>';
      },
      option: function(item, escape) {
        var label = item.name || item.description;
        var caption = item.name ? item.description : null;
        return '<div>' +
          '<span class="label">' + escape(label) + '</span>' +
          (caption ? '<span class="caption">' + escape(caption) + '</span>' : '') +
          '</div>';
      }
    },
    maxItems: 1
  };

  $scope.$watch("selectedCanvas", function(filename) {
    if(!filename || typeof(filename) != 'string') {
      return;
    }
    console.log('loading', filename);
    $http.get('json/' + filename).then(
      function(res) {
        console.log(res.data);
        $scope.canvas = res.data;
      });
  }, true);
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
