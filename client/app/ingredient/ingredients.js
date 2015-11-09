angular.module('calculator.ingredients', [])

.controller('IngredController', function ($scope, Ingredients) {
  
  $scope.ingredients = {};
  
  $scope.getIngreds = function () {
    Ingredients.getAll()
      .then(function (ingreds) {
        $scope.ingredients = ingreds;
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  
  $scope.getIngreds();

});