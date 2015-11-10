angular.module('calculator.search', [])

.controller('SearchController', function ($scope, Ingredients) {
  
  $scope.item = {};
  
  $scope.setIngred = function () {
    $scope.item.ingredient = Ingredients.searchIngred($scope.input); 
    console.log($scope.item.ingredient.name);
  };  

  $scope.addToList = function() {
    Ingredients.addIngredient($scope.item);
    console.log($scope.item);
  };
  
});