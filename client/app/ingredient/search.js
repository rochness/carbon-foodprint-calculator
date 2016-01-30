angular.module('calculator.search', [])

.controller('SearchController', function ($rootScope, $scope, Ingredients) {

  $scope.item = $rootScope.item || {};
  $scope.categories = Ingredients.getCategories();
  $scope.selected = false;
  $scope.found = true;

  $scope.$on('selected', function(event, args) {
    console.log('args from selected trigger: ', args);
    $scope.selected = args.selected;
    $scope.item = args.item;
    // var item = $scope.item;
    // $scope.$broadcast('item', {item});
  });

  // $scope.$on('item', function(event, args) {
  //   $scope.item = args.item;
  //   console.log('heard item: ', $scope.item);
  // });

  $scope.toggleSelected = function() {
    if($scope.selected === false){
      $scope.selected = true;
    } else {
      $scope.selected = false;
    }
    var selected = $scope.selected;
    var item = $scope.item
    $scope.$emit('selected', {selected, item});
    $rootScope.selected = $scope.selected;
  };

  $scope.toggleFound = function(){
    if($scope.found === false){
      $scope.found = true;
    } else {
      $scope.found = false;
    }
    console.log($scope.input);
  };

  $scope.setInput = function(newInput){
    $scope.input = newInput;
  };

  $scope.setIngred = function (ingred) {
    if(!ingred){
      $scope.item.ingredient = Ingredients.searchIngred($scope.input);
    } else {
      $scope.item.ingredient = ingred;
    }
    if($scope.item.ingredient === null){
      $scope.toggleFound();
    } else {
      $scope.toggleSelected();
      $rootScope.item = $scope.item;
      console.log('scope.selected: ', $scope.selected);
    }
  };

  $scope.setTransportModifier = function (transportType) {
    $scope.item.modifier = $scope.item.ingredient[transportType];
  };

  $scope.reset = function (){
    $scope.item = {};
    $scope.input = '';
  };

  $scope.addToList = function() {
    console.log($scope.item);
    Ingredients.addIngredient($scope.item);
    $scope.reset();
  };

  // $scope.allIngreds = function(){
  //   return Ingredients.allIngredients();
  // };

  $scope.getAllIngreds = function () {
    Ingredients.allIngredients()
      .then(function(ingreds) {
        $scope.allIngreds = ingreds;
        console.log('getAllIngreds called', ingreds);
      }).catch(function(err) {
        console.error(err);
      });
  };

  $scope.getAllIngreds();

});