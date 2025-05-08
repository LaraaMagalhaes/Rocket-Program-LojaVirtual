angular.module('LojaApp')
    .controller('CartController', function ($scope, $location, CartService) {
        $scope.cartItems = [];

        $scope.loadCart = function () {
            const token = localStorage.getItem('token');

            if (!token) {
                alert('Você precisa estar logado para acessar o carrinho.');
                return;
            }

            CartService.list(token)
                .then(function (response) {
                    $scope.cartItems = response.data;
                })
                .catch(function (error) {
                    console.error('Erro ao carregar o carrinho:', error);
                });
        };

        $scope.increaseQuantity = function (item) {
            item.quantity++;
            $scope.updateQuantity(item);
        };

        $scope.decreaseQuantity = function (item) {
            if (item.quantity > 1) {
                item.quantity--;
                $scope.updateQuantity(item);
            }
        };

        $scope.updateQuantity = function (item) {
            const token = localStorage.getItem('token');

            const updatedItem = {
                productId: item.product.id,
                quantity: item.quantity
            };

            CartService.update(item.id, updatedItem, token)
                .then(function () {
                    console.log(`Quantidade do produto ${item.product.name} atualizada!`);
                })
                .catch(function (error) {
                    console.error('Erro ao atualizar quantidade:', error);
                    alert('Erro ao atualizar a quantidade no carrinho.');
                });
        };

        $scope.removeItem = function (itemId) {
            const token = localStorage.getItem('token');

            CartService.remove(itemId, token)
                .then(function () {
                    alert('Item removido com sucesso!');
                    $scope.loadCart();
                })
                .catch(function (error) {
                    console.error('Erro ao remover item:', error);
                });
        };

        $scope.clearCart = function () {
            const token = localStorage.getItem('token');

            CartService.clear(token)
                .then(function () {
                    alert('Carrinho esvaziado!');
                    $scope.cartItems = [];
                })
                .catch(function (error) {
                    console.error('Erro ao limpar o carrinho:', error);
                });
        };

        $scope.goToProducts = function () {
            $location.path('/products');
        };

        $scope.loadCart();
    });
