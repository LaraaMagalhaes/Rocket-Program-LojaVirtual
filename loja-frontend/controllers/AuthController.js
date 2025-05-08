angular.module('LojaApp')
.controller('AuthController', function($scope, $location, AuthService) {
    $scope.user = {};
    $scope.errorMessage = '';

    $scope.login = function() {
        AuthService.login($scope.user)
            .then(function(response) {
                localStorage.setItem('token', response.data.token);
                
                $location.path('/products');
            })
            .catch(function(error) {
                console.error(error);
                $scope.errorMessage = 'Usuário ou senha inválidos!';
            });
    };
});
