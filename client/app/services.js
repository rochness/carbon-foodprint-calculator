angular.module('calculator.services', [])

.factory('Ingredients', function ($http) {

 // var IngredClass = Parse.Object.extend("Ingredients");

 // new Parse.Query(IngredClass)
 // .find()
 // .then(function(ingredients) {
 //  console.log(ingredients)
 // })

// new Parse.Query(IngredClass)
// .find()
// .then(function(ingredients) {
//  console.log(ingredients)
// })
// .catch(function(err) {
//   console.log('error getting data from parse: ', err);
// })

  var parseHeaders = {
    'X-Parse-Application-Id': 'seSR5LEKwzjFttoeXj1vv65ldaNUYANE0xjXfufS',
    'X-Parse-REST-API-Key': 'i8zMKmgPpDYF7edHPyQsr8vDTusoqm9V1NPufUks'
  };

  var parseUrl = 'https://api.parse.com/1/classes/Ingredients';


  var ribeye = {
    name: 'Ribeye/ Rib Roast',
    category: 'Beef',
    emissions: '39.83',
  };

  var shortRib = {
    name: 'Short Rib',
    category: 'Beef',
    emissions: '18.30',
  };

  var chicken = {
    name: 'Chicken',
    category: 'Poultry',
    emissions: '2.82',
  };

  var potato = {
    name: 'Potato',
    category: 'Vegetables',
    emissions: .22
  };

  var broccoli = {
    name: 'Broccoli',
    category: 'Vegetables',
    emissions: .96
  };

  var pasta = {
    name: 'Pasta',
    category: 'Grain/Legume',
    emissions: 1.01
  };

  var rice = {
    name: 'Rice',
    category: 'Grain/Legume',
    emissions: 2.93
  };

  var shank = {
    name: 'Lamb Shank',
    category: 'Lamb',
    emissions: 14.60
  };

  var bacon = {
    name: 'Bacon',
    category: 'Pig',
    emissions: 9.06
  };

  var goat = {
    name: 'Goat',
    category: 'Other Meat',
    emissions: 14.14
  };

  var boar = {
    name: 'Boar',
    category: 'Other Meat',
    emissions: 9.90
  };

  var trout = {
    name: 'Trout',
    category: 'Fish',
    emissions: 3.87
  };

  var salmon = {
    name: 'Salmon',
    category: 'Fish',
    emissions: 1.80
  };

  var shrimp = {
    name: 'Shrimp',
    category: 'Seafood',
    emissions: 3.00
  };

  var lobster = {
    name: 'Lobster',
    category: 'Seafood',
    emissions: 20.20
  };

  var cheese = {
    name: 'Cheese',
    category: 'Dairy',
    emissions: 12.12
  };

  var butter = {
    name: 'Butter',
    category: 'Dairy',
    emissions: 9.64
  };

  var avocado = {
    name: 'Avocado',
    category: 'Fruit',
    emissions: .39
  };

  var berries = {
    name: 'Berries',
    category: 'Fruit',
    emissions: .87
  };

  var sugar = {
    name: 'Sugar',
    category: 'Miscellaneous',
    emissions: .84
  };

  var mustard = {
    name: 'Mustard',
    category: 'Miscellaneous',
    emissions: 1.19
  };

  var transport = {
    shortFlight: 4.78,
    longFlight: 19.10,
    longRoad: .49,
    shortRoad: .05,
    sea: .26
  }

  var ingredDB = {};
  // var ingredDB = {
  //   ribeye: ribeye,
  //   shortRib: shortRib,
  //   chicken: chicken,
  //   potato: potato,
  //   broccoli: broccoli,
  //   pasta: pasta,
  //   rice: rice,
  //   shank: shank,
  //   bacon: bacon,
  //   goat: goat,
  //   boar: boar,
  //   trout: trout,
  //   salmon: salmon,
  //   shrimp: shrimp,
  //   lobster: lobster,
  //   cheese: cheese,
  //   butter: butter,
  //   avocado: avocado,
  //   berries: berries,
  //   sugar: sugar,
  //   mustard: mustard
  // };

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
        console.log('length of response data array: ', response.data.results.length);
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

