var app = angular.module('categoriaModule', []);
app.controller('categoriaControl', function($scope) {

    var url = 'http://localhost:8080/categorias';

    $scope.pesquisar = function() {
        $http.get(url).then(function (response) {
            $scope.categorias = response.data;
        }, function (error) {
            alert(error);
            console.log(error);
        });
    }

    $scope.salvar = function() {
        if (typeof $scope.categoria.codigo == 'undefined') {            
            $http.post(url,$scope.categoria).then(function (response) {
                $scope.categorias.push(response.data);
                $scope.novo();
            }, function (error) {
                alert(error);
                console.log(error);
            });
        } else {
            $http.put(url,$scope.categoria).then(function () {
                $scope.pesquisar();
                $scope.novo();
            }, function (error) {
                alert(error);
                console.log(error);
            });
        } 
    }

    $scope.excluir = function() {
        if (typeof $scope.categoria.codigo == 'undefined') {
            alert('Escolha um categoria');
        } else {
            urlExcluir = url+"/"+$scope.categoria.codigo;
            $http.delete(urlExcluir).then(function () {
                $scope.pesquisar();
                $scope.novo();
            }, function (error) {
                alert(error);
                console.log(error);
            }); 
        }
    }


    /*$scope.categorias = [
                {'codigo':'1',
                 'nome':'Categoria 1'},
                {'codigo':'2',
                 'nome':'Categoria 2'},
    ]*/
      
    $scope.novo = function() {
        $scope.categoria = {};
    }        

    $scope.salvar = function(categoria) {
        $scope.categorias.push($scope, categoria);
        $scope.novo();
    }

    $scope.excuir = function() {
        $scope.categorias.splice($scope.categorias.indexOf($scope.categoria), 1);
        $scope.novo();
    }

    $scope.seleciona = function(categoria) {
        $scope.categoria = categoria;
    }
});