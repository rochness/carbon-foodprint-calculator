angular.module('calculator', [
  'calculator.services',
  'calculator.search',
  'calculator.userIngreds',
  'angular.filter',
  'ngRoute',
  'ngParse'
]).config(['ParseProvider', function(ParseProvider) {
  ParseProvider.initialize("seSR5LEKwzjFttoeXj1vv65ldaNUYANE0xjXfufS", "VyHm4JZuL43K1wiWGPId04gLXNULltmW77cEdxmF");
}]).filter('categoryFilter', function(){
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