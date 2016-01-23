angular.module('calculator', [
  'calculator.services',
  'calculator.search',
  'calculator.userIngreds',
  'angular.filter',
  'ngRoute',
]).filter('categoryFilter', function(){
    return function(input, category) {
      if (!input) return input;
      if (!category) return input;
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
  }).filter('broadCategoryFilter', function(){
    return function(input, category) {
      console.log(category);
      if (!input) return input;
      if (!category) return input;
      var expected = ('' + category).toLowerCase();
      var result = [];
      angular.forEach(input, function(value, key) {
        console.log('value: ', value);
        var actualCategory = value.ingredient.broad_category.toLowerCase();
        if (actualCategory === expected) {
          result.push(value);
        }
      });
      return result;
    };
  });