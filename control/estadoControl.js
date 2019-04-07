var app = angular.module('estadoModule', []);
app.controller('estadoControl', function ($scope) {

    var url = 'http://localhost:8080/estados';

    $scope.pesquisar = function () {
        $http.get(url).then(function (response) {
            $scope.estados = response.data;
        }, function (error) {
            alert(error);
            console.log(error);
        });
    }

    $scope.salvar = function () {
        if (typeof $scope.estado.codigo == 'undefined') {
            $http.post(url, $scope.estado).then(function (response) {
                $scope.estados.push(response.data);
                $scope.novo();
            }, function (error) {
                alert(error);
                console.log(error);
            });
        } else {
            $http.put(url, $scope.estado).then(function () {
                $scope.pesquisar();
                $scope.novo();
            }, function (error) {
                alert(error);
                console.log(error);
            });
        }
    }

    $scope.excluir = function () {
        if (typeof $scope.estado.codigo == 'undefined') {
            alert('Escolha um estado');
        } else {
            urlExcluir = url + "/" + $scope.estado.codigo;
            $http.delete(urlExcluir).then(function () {
                $scope.pesquisar();
                $scope.novo();
            }, function (error) {
                alert(error);
                console.log(error);
            });
        }
    }


    /*$scope.estados = [
                {'codigo':'1',
                 'nome':'Minas Gerais'},
                {'codigo':'2',
                 'nome':'Bahia'},
                {'codigo':'3',
                 'nome':'Rio de Janeiro'},
                {'codigo':'4',
                 'nome':'Tocantins'},
                {'codigo':'5',
                 'nome':'Rio Grande do Norte'}
    ]*/

    $scope.novo = function () {
        $scope.estado = {};
    }

    $scope.salvar = function (estado) {
        $scope.estados.push($scope, estado);
        $scope.novo();
    }

    $scope.excuir = function () {
        $scope.estados.splice($scope.estados.indexOf($scope.estado), 1);
        $scope.novo();
    }

    $scope.seleciona = function (estado) {
        $scope.estado = estado;
    }
});