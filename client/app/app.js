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
// .config(function ($routeProvider, $httpProvider) {
//   $routeProvider
//     .when('/enter_ingred', {
//       templateUrl: 'app/auth/signin.html',
//       controller: 'AuthController'
//     })
//     .when('/ingredients', {
//       templateUrl: 'app/auth/signup.html',
//       controller: 'AuthController'
//     })
//     // Your code here

//     .when('/links', {
//       templateUrl: 'app/links/links.html',
//       controller: 'LinksController',
//       authenticate: true
//     })
//     .when('/shorten', {
//       templateUrl: 'app/shorten/shorten.html',
//       controller: 'ShortenController',
//       authenticate: true
//     })
//     .otherwise({
//       redirectTo: '/links'
//     });
    
//     // We add our $httpInterceptor into the array
//     // of interceptors. Think of it like middleware for your ajax calls
//     $httpProvider.interceptors.push('AttachTokens');
// });