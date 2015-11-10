angular.module('calculator.userIngreds', [])

.controller('UserIngredController', function ($scope, Ingredients) {
  
  $scope.ingredient = {};
  $scope.quantity = 0;
  $scope.total = 0;
  
  $scope.setIngred = function (input) {
    $scope.ingredient = Ingredients.getIngredByName(input); 
  };  

  $scope.calculate = function(){
    $scope.total = $scope.ingredient.emissions * $scope.quantity;
  };

});