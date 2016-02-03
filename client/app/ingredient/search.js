angular.module('calculator.search', [])

.controller('SearchController', function ($rootScope, $scope, Ingredients) {
  /*
  $scope.item holds all the info needed to calculate emissions of a particular ingredient that is selected. It has the following properties:
    ingredient - the ingredient object with its name, category labels, emissions, transport emissions, etc.
    quantity - the amount inputed by user to indicate the amount they want to measure
    unit - the type of measurement unit as input by user
    transportTypes - an array of the different types of transport options that exist in the DB for this particular ingredient
    transportModifer - the transportType selected by the user for this ingredient
  */
  $scope.item = $rootScope.item || {};

  //Prompts for the radio input boxes that the user selects to indicate transport type
  $scope.transportPrompts = {
    sea: 'By sea',
    long_flight: 'By long-haul flight (more than 6000 miles)',
    short_flight: 'By short-haul flight (less than 1500 miles)',
    long_road: 'By long distance vehicle (more than 300 miles)',
    short_road: 'By short distance vehicle (less than 300 miles)'
  };

  //The different ingredient categories, needed to populate the information in the "Browse by Category" section
  $scope.categories = Ingredients.getCategories();

  //Boolean indicating whether or not an ingredient has been selected by the user
  $scope.selected = false;

  //Boolean indicating whether or not the input ingredient exists in DB
  $scope.found = true;


  $scope.$on('selected', function(event, args) {
    // console.log('heard trigger from $scope.emit: ', args);
    $scope.selected = args.selected;
    $scope.item = args.item;
    // var item = $scope.item;
    // $scope.$broadcast('item', {item});
  });

  $scope.setAndEmitSelected = function(bool) {
    $scope.selected = bool;
    $rootScope.selected = bool;
    var selected = $scope.selected;
    var item = $scope.item;
    $scope.$emit('selected', {selected, item});
  };

  $scope.toggleFound = function(){
    if($scope.found === false){
      $scope.found = true;
    } else {
      $scope.found = false;
    }
    // console.log($scope.input);
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
      // $scope.toggleSelected();
      $scope.setAndEmitSelected(true);
      $scope.item.transportTypes = $scope.getTransportTypes($scope.item.ingredient);
      $rootScope.item = $scope.item;

      // console.log('scope.selected: ', $scope.selected);
    }
  };

  // $scope.setTransportModifier = function (transportType) {
  //   $scope.item.modifier = $scope.item.ingredient[transportType];
  // };

  $scope.reset = function (){
    // console.log('scope.selected at beg of reset call: ', $scope.selected);
    $scope.item = {};
    $scope.input = '';
    $rootScope.item = {};
    $scope.setAndEmitSelected(false);
  };

  $scope.addToList = function() {
    console.log('added item to list ', $scope.item);
    Ingredients.addIngredient($scope.item);
    $scope.reset();
  };

  $scope.getAllIngreds = function () {
    Ingredients.allIngredients() // Makes a GET request to an API to get data
      .then(function(ingreds) { // Upon receiving the data in response to the request, do something with the data (named ingreds)
        $scope.allIngreds = ingreds;
        console.log('1: this line gets called after receiving the response data in getAllIngreds', ingreds);
      }).catch(function(err) {
        console.error(err);
      });
    console.log('2: last line in getAllIngreds function is called');
  };

  $scope.getAllIngreds();

});