'use strict';

/* Controllers */

var movieControllers = angular.module('movieControllers', []);

movieControllers.controller('MoviesCtrl', ['$scope', '$http','$state',

  function ($scope, $http,$state) {
    
      $scope.search = "";
      $scope.results = [];

      var archive;
      


      $scope.submit = function() {
        if ($scope.search) {
          fetch($scope.search);        
        }
      };

      function fetch(query){

        $http.get("http://www.omdbapi.com/?s=" + $scope.search +"&type=movie").then(function(response){ 
          
          var data = response.data;

          data.Query = query;

          if(!$scope.archive){
            $scope.archive = [];

            archive = $scope.archive;
          }

          archive.push(data);
          
          $scope.results = data.Search;

        });
      }

      $scope.prevSearch = function(data){
        $scope.results = data.Search;
      }
    
    }


  ]);

