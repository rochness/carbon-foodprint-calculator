angular.module('calculator.search', [])

.controller('SearchController', function ($rootScope, $scope, Ingredients) {

  $scope.item = $rootScope.item || {};
  $scope.transportPrompts = {
    sea: 'By sea',
    long_flight: 'By long-haul flight (more than 6000 miles)',
    short_flight: 'By short-haul flight (less than 1500 miles)',
    long_road: 'By long distance vehicle (more than 300 miles)',
    short_road: 'By short distance vehicle (less than 300 miles)'
  };
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

  $scope.getTransportTypes = function(ingred) {
    var result = [];
    for(var key in $scope.transportPrompts) {
      if(ingred[key]){
        result.push(key);
      }
    }
    return result;
  }

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
      $scope.item.transportTypes = $scope.getTransportTypes($scope.item.ingredient);
      $rootScope.item = $scope.item;

      console.log('scope.item: ', $scope.item);
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