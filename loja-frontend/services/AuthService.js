angular.module('LojaApp')
.service('AuthService', function($http) {
    const apiUrl = 'http://localhost:3000/auth';

    this.login = function(credentials) {
        return $http.post(`${apiUrl}/login`, credentials);
    };
});
