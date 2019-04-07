var app = angular.module('produtoModule', []);
app.controller('produtoControl', function ($scope) {

    var url = 'http://localhost:8080/produtos';

    $scope.pesquisar = function () {
        $http.get(url).then(function (response) {
            $scope.produtos = response.data;
        }, function (error) {
            alert(error);
            console.log(error);
        });
    }

    $scope.salvar = function () {
        if (typeof $scope.produto.codigo == 'undefined') {
            $http.post(url, $scope.produto).then(function (response) {
                $scope.produtos.push(response.data);
                $scope.novo();
            }, function (error) {
                alert(error);
                console.log(error);
            });
        } else {
            $http.put(url, $scope.produto).then(function () {
                $scope.pesquisar();
                $scope.novo();
            }, function (error) {
                alert(error);
                console.log(error);
            });
        }
    }

    $scope.excluir = function () {
        if (typeof $scope.produto.codigo == 'undefined') {
            alert('Escolha um produto');
        } else {
            urlExcluir = url + "/" + $scope.produto.codigo;
            $http.delete(urlExcluir).then(function () {
                $scope.pesquisar();
                $scope.novo();
            }, function (error) {
                alert(error);
                console.log(error);
            });
        }
    }


    /*$scope.produtos = [
                {'codigo':'1',
                 'nome':'Produto 1',
                 'preco':'22.90'},
                {'codigo':'2',
                 'nome':'Produto 2',
                 'preco':'162.99'},
    ]*/

    $scope.novo = function () {
        $scope.produto = {};
    }

    $scope.salvar = function (produto) {
        $scope.produtos.push($scope, produto);
        $scope.novo();
    }

    $scope.excuir = function () {
        $scope.produtos.splice($scope.produtos.indexOf($scope.produto), 1);
        $scope.novo();
    }

    $scope.seleciona = function (produto) {
        $scope.produto = produto;
    }
});