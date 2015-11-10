angular.module('calculator.userIngreds', [])

.controller('UserIngredController', function ($scope, Ingredients) {
  
  //$scope.Ingredients = Ingredients;

  $scope.getUserIngreds = function(){
    return Ingredients.getUserIngreds();
    console.log("user ingredients: ", $scope.ingredients);
  };

  $scope.$on('added-ingred', function(){
    $scope.getUserIngreds();
  });

  $scope.total = function(){
    var total = 0;
    var ingredients = Ingredients.getUserIngreds();
    for(var key in ingredients){
      total += ingredients[key].quantity * ingredients[key].ingredient.emissions;
    }
    return Math.ceil(total * (1/2.2046) * 100)/100;
  };

  $scope.miles = function(){
    return Math.ceil($scope.total()*(5/2)*100)/100;
  };

  $scope.subTotal = function(qty, emiss){
    return Math.ceil(qty * emiss * (1/2.2046) * 100)/100;
  };

  $scope.costs = function(qty, emiss){
    return Math.ceil($scope.total() * (1/4) * 100)/100;
  };

  $scope.remove = function(ingredient){
    Ingredients.removeIngred(ingredient);
  };

  $scope.getUserIngreds(); 

});