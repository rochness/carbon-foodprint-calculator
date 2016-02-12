angular.module('calculator.search', ['ngSanitize', 'MassAutoComplete'])

.controller('SearchController', function ($rootScope, $scope, $sce, $q, Ingredients) {
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

  $scope.input = {};

  $scope.$on('selected', function(event, args) {
    $scope.selected = args.selected;
    $scope.item = args.item;

  });

  var autoCompleteIngreds = [];

  $scope.setAndEmitSelected = function(bool) {
    $scope.selected = bool;
    $rootScope.selected = bool;
    var selected = $scope.selected;
    var item = $scope.item;
    $scope.$emit('selected', {selected, item});
  };

  $scope.toggleFound = function(isSubmitted, form, keyPressEvent){
    // console.log('toggledFound called, isSubmitted: ' + isSubmitted + ' found: ' + $scope.found);
    if(keyPressEvent && keyPressEvent !== 13){
      if(isSubmitted && $scope.found === false) {
        $scope.found = true;
        form.$setPristine();
      } else if (isSubmitted && $scope.found === true) {
        $scope.found = false;
      } else {
        // $scope.found = false;
      }
    }
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

  $scope.setIngred = function (ingredName, isFormSubmitted, form) {
    console.log('setIngred called');
    if(!ingredName){
      $scope.item.ingredient = Ingredients.searchIngred($scope.input.value);
    } else {
      console.log('ingredName: ', ingredName);
      $scope.item.ingredient = Ingredients.searchIngred(ingredName);
    }
    if($scope.item.ingredient === null){
      $scope.toggleFound(isFormSubmitted, form);
    } else {
      // $scope.toggleSelected();
      $scope.setAndEmitSelected(true);
      $scope.item.transportTypes = $scope.getTransportTypes($scope.item.ingredient);
      $rootScope.item = $scope.item;
    }
  };

  $scope.reset = function (){
    $scope.item = {};
    $scope.input.value = '';
    $rootScope.item = {};
    $scope.setAndEmitSelected(false);
  };

  $scope.addToList = function(isValidForm, form) {
    if(isValidForm) {
      // console.log('added item to list ', $scope.item);
      Ingredients.addIngredient($scope.item);
      $scope.reset();
      form.$setPristine();
    }
  };

  var fuzzySearch;

  $scope.getAllIngreds = function () {
    Ingredients.allIngredients() // Makes a GET request to an API to get data
      .then(function(ingreds) { // Upon receiving the data in response to the request, do something with the data (named ingreds)
        $scope.allIngreds = ingreds;
        autoCompleteIngreds = _.map(ingreds, function(ingredient) {
          return ingredient;
        });

        fuzzySearch = new Fuse(autoCompleteIngreds, {
            keys: ['name', 'broad_category', 'category', 'sub_broad_category'],
            shouldSort: true,
            caseSensitive: false,
            threshold: 0.3
          });

        console.log('1: this line gets called after receiving the response data in getAllIngreds', ingreds);
      }).catch(function(err) {
        console.error(err);
      });
    console.log('2: last line in getAllIngreds function is called');
  };

  /************** MassAutoComplete functionality ************/
  $scope.suggestResults = [];
  $scope.suggest_ingred = function(term) {
    var q = term.toLowerCase().trim();
    var autoResults = [];
    var fuzzyResults = fuzzySearch
                        .search(term)
                        .slice(0,12)
                        .map(function(ingred) {
                          return {
                            value: ingred.name,
                            label: ingred.name
                            // label: $sce.trustAsHtml(highlight(val, term))
                          };
                        });

    for(var i = 0; i < autoCompleteIngreds.length && autoResults.length < 10; i++) {
      var ingredName = autoCompleteIngreds[i].name;
      var ingredValue = autoCompleteIngreds[i];
      if(ingredName.toLowerCase().indexOf(q) === 0){
        autoResults.push({label: ingredName, value: ingredName});
      }
    }

    var combinedResults = autoResults.concat(fuzzyResults);
    var uniqCombinedResults = _.uniq(combinedResults, function(item) {
      return item.label;
    });

    var noResult = [{label: "Can't find your ingredient? Try browsing by category.", value: ''}];

   $scope.suggestResults = uniqCombinedResults.length === 0 ? noResult : uniqCombinedResults.slice(0,12).concat(noResult);
   return $scope.suggestResults;
    // return uniqCombinedResults.length === 0 ? noResult : uniqCombinedResults.slice(0,12).concat(noResult);
  }

  $scope.autocomplete_options = {
    suggest: $scope.suggest_ingred
  };

  $scope.getAllIngreds();

});