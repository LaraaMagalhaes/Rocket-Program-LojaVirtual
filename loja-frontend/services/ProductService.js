angular.module('LojaApp')
.service('ProductService', function($http) {
    const apiUrl = 'http://localhost:3000/products';

    this.list = function() {
        return $http.get(apiUrl);
    };

    this.add = function(product, token) {
        return $http.post(apiUrl, product, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };

    this.delete = function(productId, token) {
        return $http.delete(`${apiUrl}/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };
});
