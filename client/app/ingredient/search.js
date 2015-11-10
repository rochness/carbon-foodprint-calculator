angular.module('calculator.search', [])

.controller('SearchController', function ($scope, Ingredients) {
  
  $scope.item = {};
  $scope.categories = Ingredients.getCategories();
  
  $scope.setIngred = function () {
    $scope.item.ingredient = Ingredients.searchIngred($scope.input); 
    console.log($scope.item.ingredient.name);
  };

  $scope.reset = function (){
    $scope.item = {};
  };  

  $scope.addToList = function() {
    Ingredients.addIngredient($scope.item);
    $('input').val('');
    $scope.reset();
    console.log($scope.item);
  };

  $scope.allIngreds = function(){
    return Ingredients.allIngredients();
  };
});