var app = angular.module('enderecoClienteModule', []);
app.controller('enderecoClienteControl', function ($scope) {

    var url = 'http://localhost:8080/enderecos';

    $scope.pesquisar = function () {
        $http.get(url).then(function (response) {
            $scope.enderecoClientes = response.data;
        }, function (error) {
            alert(error);
            console.log(error);
        });
    }

    $scope.salvar = function () {
        if (typeof $scope.enderecoCliente.codigo == 'undefined') {
            $http.post(url, $scope.enderecoCliente).then(function (response) {
                $scope.enderecoClientes.push(response.data);
                $scope.novo();
            }, function (error) {
                alert(error);
                console.log(error);
            });
        } else {
            $http.put(url, $scope.enderecoCliente).then(function () {
                $scope.pesquisar();
                $scope.novo();
            }, function (error) {
                alert(error);
                console.log(error);
            });
        }
    }

    $scope.excluir = function () {
        if (typeof $scope.enderecoCliente.codigo == 'undefined') {
            alert('Escolha um enderecoCliente');
        } else {
            urlExcluir = url + "/" + $scope.enderecoCliente.codigo;
            $http.delete(urlExcluir).then(function () {
                $scope.pesquisar();
                $scope.novo();
            }, function (error) {
                alert(error);
                console.log(error);
            });
        }
    }


    /*$scope.enderecoClientes = [
    {'codigo':'1',
        'cliente':'Carlos',
        'logradouro':'Rua dos Eixto',
        'numero':'1567',
        'complemento':'Apto 456',
        'cep':'38400-000',
        'bairro':'Brasil',
        'cidade':'Uberlandia'},
    {'codigo':'2',
        'cliente':'Martin Fowler',
        'logradouro':'Rua do Professor',
        'numero':'45',
        'complemento':'Sem Complemento',
        'cep':'38400-234',
        'bairro':'Tabajaras',
        'cidade':'Uberlandia'},
    ]*/

    $scope.novo = function () {
        $scope.enderecoCliente = {};
    }

    $scope.salvar = function (enderecoCliente) {
        $scope.enderecoClientes.push($scope, enderecoCliente);
        $scope.novo();
    }

    $scope.excuir = function () {
        $scope.enderecoClientes.splice($scope.enderecoClientes.indexOf($scope.enderecoCliente), 1);
        $scope.novo();
    }

    $scope.seleciona = function (enderecoCliente) {
        $scope.enderecoCliente = enderecoCliente;
    }

});