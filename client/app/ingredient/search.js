angular.module('calculator.search', [])

.controller('SearchController', function ($scope, Ingredients) {
  
  $scope.item = {};
  $scope.categories = Ingredients.getCategories();
  $scope.selected = false;
  
  $scope.setIngred = function (ingred) {
    if(!ingred){
      $scope.item.ingredient = Ingredients.searchIngred($scope.input); 
    } else {
      $scope.item.ingredient = ingred;
    }
    console.log($scope.item.ingredient.name);
  };

  $scope.reset = function (){
    $scope.item = {};
    $('input').val('');
  };  

  $scope.addToList = function() {
    Ingredients.addIngredient($scope.item);
    // $('input').val('');
    $scope.reset();
    console.log($scope.item);
  };

  $scope.allIngreds = function(){
    return Ingredients.allIngredients();
  };

  $scope.toggleSelected = function() {
    if($scope.selected === false){
      $scope.selected = true;
    } else {
      $scope.selected = false;
    }
    console.log($scope.selected);
  }
});