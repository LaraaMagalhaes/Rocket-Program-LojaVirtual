angular.module('LojaApp', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'AuthController'
            })
            .when('/products', {
                templateUrl: 'views/products.html',
                controller: 'ProductController'
            })
            .when('/cart', {
                templateUrl: 'views/cart.html',
                controller: 'CartController'
            })
            .when('/add-product', {
                templateUrl: 'views/add-product.html',
                controller: 'ProductController'
            })
            .otherwise({
                redirectTo: '/login'
            });
    });
