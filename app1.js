(function (){
   'use strict';
   angular.module("myfirstApp",[])
   .controller("DIController",DIController);
   function DIController($scope,$filter){
    $scope.name="bouzid";
    $scope.upper=function (){
        var upCase=$filter('uppercase');
        $scope.name=upCase($scope.name)
    };
   }

})();