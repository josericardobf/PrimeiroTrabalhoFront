var app = angular.module('cidadeModule', []);
app.controller('cidadeControl', function($scope) {

    var url = 'http://localhost:8080/cidades';

    $scope.pesquisar = function() {
        $http.get(url).then(function (response) {
            $scope.cidades = response.data;
        }, function (error) {
            alert(error);
            console.log(error);
        });
    }

    $scope.salvar = function() {
        if (typeof $scope.cidade.codigo == 'undefined') {            
            $http.post(url,$scope.cidade).then(function (response) {
                $scope.cidades.push(response.data);
                $scope.novo();
            }, function (error) {
                alert(error);
                console.log(error);
            });
        } else {
            $http.put(url,$scope.cidade).then(function () {
                $scope.pesquisar();
                $scope.novo();
            }, function (error) {
                alert(error);
                console.log(error);
            });
        } 
    }

    $scope.excluir = function() {
        if (typeof $scope.cidade.codigo == 'undefined') {
            alert('Escolha um cidade');
        } else {
            urlExcluir = url+"/"+$scope.cidade.codigo;
            $http.delete(urlExcluir).then(function () {
                $scope.pesquisar();
                $scope.novo();
            }, function (error) {
                alert(error);
                console.log(error);
            }); 
        }
    }


    /*$scope.cidades = [
                {'codigo':'1',
                 'nome':'Uberaba',
                 'estado':'Minas Gerais'},
                {'codigo':'2',
                 'nome':'Rio de Janeiro',
                 'estado':'Rio de Janeiro'},
                {'codigo':'3',
                 'nome':'Natal',
                 'estado':'Rio Grande do Norte'},
                {'codigo':'4',
                 'nome':'Salvador',
                 'estado':'Bahia'},
                {'codigo':'5',
                 'nome':'Goiania',
                 'estado':'Goias'}
    ]*/
      
    $scope.novo = function() {
        $scope.cidade = {};
    }        

    $scope.salvar = function(cidade) {
        $scope.cidades.push($scope, cidade);
        $scope.novo();
    }

    $scope.excuir = function() {
        $scope.cidades.splice($scope.cidades.indexOf($scope.cidade), 1);
        $scope.novo();
    }

    $scope.seleciona = function(cidade) {
        $scope.cidade = cidade;
    }
});