angular.module('LojaApp')
    .controller('ProductController', function ($scope, $location, ProductService, CartService) {
        $scope.products = [];
        $scope.newProduct = {};
        $scope.successMessage = '';
        $scope.errorMessage = '';

        $scope.loadProducts = function () {
            ProductService.list()
                .then(function (response) {
                    $scope.products = response.data;
                })
                .catch(function (error) {
                    console.error('Erro ao carregar produtos:', error);
                });
        };

        $scope.addToCart = function (product) {
            const token = localStorage.getItem('token');

            if (!token) {
                alert('Você precisa estar logado para adicionar ao carrinho.');
                return;
            }

            const item = {
                productId: product.id,
                quantity: 1
            };

            CartService.add(item, token)
                .then(function (response) {
                    alert(`Produto ${product.name} adicionado ao carrinho!`);
                })
                .catch(function (error) {
                    console.error('Erro ao adicionar ao carrinho:', error);
                    alert('Erro ao adicionar ao carrinho.');
                });
        };

        $scope.addProduct = function () {
            const token = localStorage.getItem('token');

            if (!token) {
                $scope.errorMessage = 'Você precisa estar logado para adicionar um produto.';
                return;
            }

            ProductService.add($scope.newProduct, token)
                .then(function (response) {
                    $scope.successMessage = 'Produto adicionado com sucesso!';
                    $scope.newProduct = {};
                    $scope.loadProducts();
                })
                .catch(function (error) {
                    console.error('Erro ao adicionar produto:', error);
                    $scope.errorMessage = 'Erro ao adicionar o produto.';
                });
        };


        $scope.deleteProduct = function (productId) {
            const token = localStorage.getItem('token');

            if (confirm("Tem certeza que deseja deletar este produto?")) {
                ProductService.delete(productId, token)
                    .then(function () {
                        alert('Produto deletado com sucesso!');
                        $scope.loadProducts();
                    })
                    .catch(function (error) {
                        console.error('Erro ao deletar produto:', error);
                        alert('Erro ao deletar o produto.');
                    });
            }
        };


        $scope.goToProducts = function () {
            $location.path('/products');
        };

        $scope.goToCart = function () {
            $location.path('/cart');
        };

        $scope.goToAddProduct = function () {
            $location.path('/add-product');
        };

        $scope.loadProducts();
    });
