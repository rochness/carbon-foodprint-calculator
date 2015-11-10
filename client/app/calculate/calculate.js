angular.module('calculator.userIngreds', [])

.controller('UserIngredController', function ($scope, Ingredients) {
  $scope.Ingredients = Ingredients;

  $scope.getUserIngreds = function(){
    return Ingredients.getUserIngreds();
    console.log("user ingredients: ", $scope.ingredients);
  };

  $scope.$on('added-ingred', function(){
    $scope.getUserIngreds();
  });

  // $scope.calculate = function(){
  //   $scope.total = $scope.ingredient.emissions * $scope.quantity;
  // };

  $scope.getUserIngreds(); 

});