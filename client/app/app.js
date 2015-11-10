angular.module('calculator', [
  'calculator.services',
  'calculator.search',
  'calculator.userIngreds',
  'ngRoute'
]).filter('categoryFilter', function(){
    return function(input, category) {
      if (!input) return input;
      if (!category) return input;
      var expected = ('' + category).toLowerCase();
      var result = {};
      angular.forEach(input, function(value, key) {
        var actualCategory = (value.category).toLowerCase();
        if (actualCategory === expected) {
          result[key] = value;
        }
      });
      return result;
    };
  });