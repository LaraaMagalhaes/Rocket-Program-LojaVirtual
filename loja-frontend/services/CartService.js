angular.module('LojaApp')
.service('CartService', function($http) {
    const apiUrl = 'http://localhost:3000/cart';

    this.list = function(token) {
        return $http.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };

    this.add = function(item, token) {
        return $http.post(apiUrl, item, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };

    this.update = function(cartItemId, item, token) {
        return $http.put(`${apiUrl}/${cartItemId}`, item, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };

    this.remove = function(id, token) {
        return $http.delete(`${apiUrl}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };

    this.clear = function(token) {
        return $http.delete(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };
});
