angular.module('calculator.userIngreds', [])

.controller('UserIngredController', function ($scope, Ingredients) {

  $scope.getUserIngreds = function(){
    return Ingredients.getUserIngreds();
  };

  $scope.$on('added-ingred', function(){
    $scope.getUserIngreds();
  });


  $scope.miles = function(){
    return Math.ceil($scope.total()*(5/2)*100)/100;
  };

  $scope.subTotal = function(item){
    // because emissions are per kg
    var conversions = {
      "pounds": (1/2.2046),
      "ounces": (1/35.274),
      "grams": (1/1000),
      "kilograms": 1
    }
    var qty = item.quantity;
    var emiss = item.ingredient.emissions;
    var modifier = item.transportModifier !== 'null' ? item.ingredient[item.transportModifier] + 1 : 1;
    return Math.ceil((qty * emiss * conversions[item.unit]) * modifier * 100)/100;
  };

  $scope.total = function(){
    var ingredients = Ingredients.getUserIngreds();
    var ingredKeys = Object.keys(ingredients);
    return ingredKeys.reduce(function(accum, key) {
      return $scope.subTotal(ingredients[key]) + accum;
    }, 0).toFixed(2);
  };

  $scope.costs = function(qty, emiss){
    return Math.ceil($scope.total() * (.01) * 100)/100;
  };

  $scope.remove = function(ingredient){
    Ingredients.removeIngred(ingredient);
  };

  $scope.getUserIngreds();

});