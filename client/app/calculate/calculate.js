angular.module('calculator.calculate', [])

.controller('CalcController', function ($scope, Ingredients) {
  
  $scope.ingredient = {};
  $scope.quantity = 0;
  $scope.total = 0;
  
  $scope.setIngred = function (input) {
    $scope.ingredient = Ingredients.getIngredByName(input); 
  };  

});