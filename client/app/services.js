angular.module('calculator.services', [])

.factory('Ingredients', function ($http) {

  var parseHeaders = {
    'X-Parse-Application-Id': 'seSR5LEKwzjFttoeXj1vv65ldaNUYANE0xjXfufS',
    'X-Parse-REST-API-Key': 'i8zMKmgPpDYF7edHPyQsr8vDTusoqm9V1NPufUks'
  };

  var parseUrl = 'https://api.parse.com/1/classes/Ingredients';

  var ingredDB = {};
  var userIngredients = {};

  var categories = [
    'Beef',
    'Lamb',
    'Pig',
    'Poultry',
    'Other Meat',
    'Fish',
    'Seafood',
    'Dairy',
    'Fruit',
    'Vegetables',
    'Grain/ Legume',
    'Miscellaneous'
  ];

  var getUserIngreds = function() {
    return userIngredients;
  };

  var getCategories = function () {
    return categories;
  };

  var searchIngred = function(name) {
    if(ingredDB[name.toLowerCase()]){
      return ingredDB[name.toLowerCase()];
    } else {
      console.log("Ingredient not in database");
      return null;
    }
  };

  var addIngredient = function (ingred) {
    userIngredients[ingred.ingredient.name] = ingred;
    // $rootScope.$broadcast('added-ingred');

  };

  var removeIngred = function(ingred) {
    delete userIngredients[ingred.ingredient.name];
  };

  var allIngredients = function() {
    return $http({method: 'GET', url: parseUrl, headers: parseHeaders, params:{limit: 500}})
      .then(function(response) {
        var data = response.data.results;
        data.forEach(function(ingred) {
          var ingredKey = ingred.ingredient.toLowerCase();
          ingredDB[ingredKey] = ingred;
          ingredDB[ingredKey].name = ingred.ingredient;
        });
        return ingredDB;
      });
  };

  return {
    getUserIngreds: getUserIngreds,
    searchIngred: searchIngred,
    addIngredient: addIngredient,
    removeIngred: removeIngred,
    getCategories: getCategories,
    allIngredients: allIngredients
  };

});

