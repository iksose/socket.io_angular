angular.module('uiRouterSample')
.controller("dbController" ,function ($scope, $state, movieFactory) {
    console.log("Hello from dbController")    

    movieFactory.getMovies(handleSuccess)

    function handleErrors(data, status){
        console.log("Handler", data, status)
    }

    function handleSuccess(data, status){
        console.log("Success")
        $scope.movieList = data
    }

    $scope.movieList = [];


    function handleSuccess2(data, status){
        console.log(data, status)
        $scope.movieList = data;
    }

    $scope.movieModel = {
        title: "",
        rating: "XXX"
    }
    $scope.AddMovie = function(){
        console.log("ADDING", $scope.movieModel )
        movieFactory.saveMovie($scope.movieModel)
    }

    

})

.factory('movieFactory', function($http, errors){
    console.log("Hello from movie Factory")
    var movieList;
    return {
        saveMovie: function(movie, callback){
            $http.post("secure/admin/movies", movie)
            .success(function(data){
                console.log("Success from factory ", data)
                // callback(data)
            })
            .error(function(data, status, headers, config){
                console.log("Fail from factory ", data, status)
                // callback(data)
                errors.addErr("danger", data)
            })
        },
        getMovies: function(callback){
            $http.get("secure/admin/movies")
            .success(function(data){
                console.log("Success from factory ", data)
                callback(data)
            })
            .error(function(data, status, headers, config){
                console.log("Fail from factory ", data, status)
                callback(data, status)
            })
        }
    }
    })

