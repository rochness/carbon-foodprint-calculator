angular.module('calculator.services', [])

.factory('Ingredients', function ($http) {
  var fireBaseUrl = 'https://dazzling-inferno-125.firebaseio.com/results.json'

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
    return $http({method: 'GET', url: fireBaseUrl, headers: {}})
      .then(function(response) {
        var data = response.data;
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

