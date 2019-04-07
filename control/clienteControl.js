var app = angular.module('clienteModule', []);
app.controller('clienteControl', function ($scope) {

    var url = 'http://localhost:8080/clientes';

    $scope.pesquisar = function () {
        $http.get(url).then(function (response) {
            $scope.clientes = response.data;
        }, function (error) {
            alert(error);
            console.log(error);
        });
    }

    $scope.salvar = function () {
        if (typeof $scope.cliente.codigo == 'undefined') {
            $http.post(url, $scope.cliente).then(function (response) {
                $scope.clientes.push(response.data);
                $scope.novo();
            }, function (error) {
                alert(error);
                console.log(error);
            });
        } else {
            $http.put(url, $scope.cliente).then(function () {
                $scope.pesquisar();
                $scope.novo();
            }, function (error) {
                alert(error);
                console.log(error);
            });
        }
    }

    $scope.excluir = function () {
        if (typeof $scope.cliente.codigo == 'undefined') {
            alert('Escolha um cliente');
        } else {
            urlExcluir = url + "/" + $scope.cliente.codigo;
            $http.delete(urlExcluir).then(function () {
                $scope.pesquisar();
                $scope.novo();
            }, function (error) {
                alert(error);
                console.log(error);
            });
        }
    }


    /*$scope.clientes = [
                {'codigo':'1',
                 'nome':'Carlos',
                 'email':'carlos@iftm.edu.br',
                 'cpfcnpj':'111.111.111-11'},
                {'codigo':'2',
                 'nome':'Martin Fowler',
                 'email':'martin@gmail.com',
                 'cpfcnpj':'222.222.222-22'},
    ]*/

    $scope.novo = function () {
        $scope.cliente = {};
    }

    $scope.salvar = function (cliente) {
        $scope.clientes.push($scope, cliente);
        $scope.novo();
    }

    $scope.excuir = function () {
        $scope.clientes.splice($scope.clientes.indexOf($scope.cliente), 1);
        $scope.novo();
    }

    $scope.seleciona = function (cliente) {
        $scope.cliente = cliente;
    }
});