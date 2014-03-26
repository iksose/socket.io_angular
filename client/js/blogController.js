angular.module('uiRouterSample')
.controller("blogController" ,function ($scope, $state, blogFactory) {
    console.log("Hello from blog Controller")

    //textAngular

    $scope.note = {
        id: 0,
        title: "Title goes here",
        body: '<b>Press Back and Forward to simulate loading a new note</b><div><b><br/></b></div><div><img src="http://puppydogweb.com/gallery/puppies/labradorretriever2.jpg"/><b><br/></b></div>'
    }

    var handleThis = function(data){
        console.log("Handling....", data[0])
        $scope.note = data[0]
    }

    blogFactory.getMovies(handleThis)

    $scope.funUpdate = function(data){
        console.log("Well okay I guess...", data)
        // var obj = {_id: data}
        blogFactory.updatePost(data)
    }

    ///CONTROLLER FOR LIST VIEW
    //
    //

    $scope.postsList = []

    var handleThis2 = function(data){
        console.log("Handling....", data)
        $scope.postsList = data
    }

    blogFactory.getAllPosts(handleThis2)

    $scope.funUpdate2 = function(data){
        console.log("Well okay I guess...", data)
        // var obj = {_id: data}
        blogFactory.updatePost(data)
    }

    $scope.findArticle = function(data){
        console.log("You want me to look up...", data)
    }

})


.controller('blogController_individual', function ($scope, $state, $stateParams , blogFactory) {
    console.log("Individual...?", $stateParams)
    var stateParams = $stateParams
    $scope.postDetail;

    var getPostSuccess_callback = function(data){
        $scope.postDetail = data;
    }

    blogFactory.returnOne(stateParams, getPostSuccess_callback)


    $scope.funUpdate = function(data){
        console.log("Well okay I guess...", data)
        // var obj = {_id: data}
        blogFactory.updatePost(data)
    }

})

.controller('blogController_newPost', function ($scope, $state, $rootScope, blogFactory, errors) {
    var loggedIn = $rootScope.loggedIn;
    console.log("Time for a new post! Are you authorize!?", loggedIn)
    if(!loggedIn){
        errors.addErr("danger", "You're not authorized to do that")
        $state.go("home")
    }

    $scope.blogpost = {};



})

.factory('blogFactory', function($http, errors){
    console.log("Hello from blog Factory")
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
            $http.get("/blogposts")
            .success(function(data){
                console.log("Success from factory ", data)
                callback(data)
            })
            .error(function(data, status, headers, config){
                console.log("Fail from factory ", data, status)
                callback(data, status)
            })
        },
        updatePost: function(blog){
            console.log("Updating this : ", blog)
            $http.post("/blogposts", blog)
            .success(function(data){
                console.log("Success from factory ", data)
                // callback(data)
            })
            .error(function(data, status, headers, config){
                console.log("Fail from factory ", data, status)
                // callback(data)
                // errors.addErr("danger", data)
            })

        },
        getAllPosts: function(callback){
            $http.get("/blogposts")
            .success(function(data){
                console.log("Success from factory ", data)
                callback(data)
            })
            .error(function(data, status, headers, config){
                console.log("Fail from factory ", data, status)
                // callback(data, status)
            })
        },
        returnOne: function(obj, callback){
            console.log("Factory", obj)
            $http.post('/posts', obj)
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
