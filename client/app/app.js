angular.module('calculator', [
  'calculator.services',
  'calculator.search',
  'calculator.userIngreds',
  'angular.filter',
  'ui.router',
  'ngSanitize',
  'MassAutoComplete'
]).config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('main', {
        url: '/',
        views: {
          '': {
            templateUrl: 'app/main.html',
            controller: 'SearchController'
          },
          'searchIngredients@main': {
            templateUrl: 'app/ingredient/search-ingredients.html',
            controller: 'SearchController'
          },
          'browseIngredients@main': {
            templateUrl: 'app/ingredient/browse-ingredients.html',
            controller: 'SearchController'
          },
          'enterModifiers@main': {
            templateUrl: 'app/ingredient/enter-modifiers.html',
            controller: 'SearchController'
          },
          'calculateIngredients@main': {
            templateUrl: 'app/calculate/calculate-ingredients.html',
            controller: 'UserIngredController'
          }
        }
      });
  }).filter('categoryFilter', function(){
    return function(input, category) {
      if (!input) return input;
      if (!category) return input;
      var expected = ('' + category).toLowerCase();
      var result = [];
      angular.forEach(input, function(value, key) {
        var category = value.category || value.sub_broad_category;
        var actualCategory = category.toLowerCase();
        if (actualCategory === expected) {
          result.push(value);
        }
      });
      return result;
    };
  }).filter('broadCategoryFilter', function(){
    return function(input, category) {
      if (!input) return input;
      if (!category) return input;
      var expected = ('' + category).toLowerCase();
      var result = [];
      angular.forEach(input, function(value, key) {
        var actualCategory = value.ingredient.broad_category.toLowerCase();
        if (actualCategory === expected) {
          result.push(value);
        }
      });
      return result;
    };
  });