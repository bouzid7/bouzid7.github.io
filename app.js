(function (){
    'use strict';
   angular.module("myfirstApp",[])
  .controller('myfirstController',function ($scope){
       $scope.name1="";
       $scope.name2="";
       $scope.totalValue=0;

       $scope.displayNumeric=function(){
           var totalNameValue=calculateNumericForString($scope.name2);
           $scope.totalValue=totalNameValue;
       };

     function calculateNumericForString(string){
        var totalStringValue=0;
        for( var i=0;i<string.length;i++){
            totalStringValue+=string.charCodeAt(i);
        }
          return totalStringValue;
      }

  });



})();



