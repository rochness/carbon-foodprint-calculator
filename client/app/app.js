angular.module('calculator', [
  'calculator.services',
  'calculator.search',
  'calculator.userIngreds',
  'angular.filter',
  'ngRoute',
  'ngParse'
]).filter('categoryFilter', function(){
    return function(input, category) {
      // if (!input) return input;
      // if (!category) return input;
      var expected = ('' + category).toLowerCase();
      // var result = {};
      var result = [];
      angular.forEach(input, function(value, key) {
        var category = value.category || value.sub_broad_category;
        // if(value.category === 'Milk')
        var actualCategory = category.toLowerCase();
        if (actualCategory === expected) {
          // result[key] = value;
          result.push(value);
        }
      });
      return result;
    };
  });