'use strict';

/* Controllers */

var movieControllers = angular.module('movieControllers', []);

movieControllers.controller('MoviesCtrl', ['$scope', '$http','$state',

  function ($scope, $http,$state) {
    
      $scope.search = "";
      $scope.results = [];
      $scope.cacheMovies = [];

      var archive;

      var cacheMovies = $scope.cacheMovies;

      


      $scope.submit = function() {
        if ($scope.search) {
          fetch($scope.search);        
        }
      };

      function fetch(q){
        var query = q;
        var isPrevSearch = false;

        if($scope.archive){
          archive.forEach(function(archiveItem){
            if(archiveItem.Query == query){
              $scope.results = archiveItem.Search;
              isPrevSearch = true;
            }
          });
        } else {
          $scope.archive = [];
          archive = $scope.archive;
        }

        if(!isPrevSearch){

          $http.get("http://www.omdbapi.com/?s=" + $scope.search +"&type=movie").then(function(response){ 
            
            var data = response.data;


            data.Search.forEach(function(movie){
              cacheMovies.forEach(function(cachedMovie){
                if(movie.imdbID == cachedMovie.imdbID){
                  movie.Rating = cachedMovie.Rating;
                  return;
                }
              });
            });

            data.Query = query;

            archive.push(data);
            
            $scope.results = data.Search;

            console.log(archive);

          });
        }




        
      }

      $scope.prevSearch = function(data){
        $scope.results = data.Search;
      }

      $scope.setRating = function(movie,num){
        
        movie.Rating = num;

        var tempMovie = movie;

        var id = tempMovie.imdbID;


        var isCached = false;

        cacheMovies.forEach(function(cachedMovie){
          if(cachedMovie.imdbID == id) {
            cachedMovie.Rating = num;
            isCached = true;
          }
        });

        if(!isCached){
          cacheMovies.push(tempMovie);
        }

        

        console.log(cacheMovies);

      }
    
    }


  ]);

