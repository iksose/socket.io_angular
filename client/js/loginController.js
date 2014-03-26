angular.module('uiRouterSample')
.controller("loginController" ,function ($scope, $rootScope, $state, $http, loginFactory) {
    console.log("Hello from login controller")
    $scope.user;
    $rootScope.loggedIn = false;
    //Sets the scope if the user refreshes
    $http.get('/api/user/').success(function(data) {
        $scope.user = data;
        console.log("Success grabbing user on refresh...", data)
        window.donuts = $scope.user
        window.holes = $scope.loggedIn;
        if(data !== ""){
            $rootScope.loggedIn = true;
            
            console.log("Logged in!!!!", $scope.loggedIn)
        }
    });
    
    $scope.credentials = {}

    $scope.login = function(){
        console.log("Logging in...", $scope.credentials)
        var handleSuccess = function(data){
            console.log("Callback....", data)
            $scope.user = data;
            if(data !== ""){
                $rootScope.loggedIn = true
                console.log("Logged in!!!", $scope.loggedIn)
            }
            var element = document.getElementById("loginDropdown")
            angular.element(element).removeClass('open')
        }
        var credits = $scope.credentials
        loginFactory.postLogin(credits, handleSuccess)
    }

    // function handleSuccess(data, status){
    //     console.log("Success....", data, status)
    // }


    $scope.logoutUser = function(){
        console.log("So you want to log out...?")
        var handleSuccess = function(data){
            console.log("Success on logout")
             $rootScope.loggedIn = false;
        }
        loginFactory.submitLogout(handleSuccess)
    }

    $scope.failedLogin = function(){
        return loginFactory.returnLoginFailure();
    }
    

});

angular.module('uiRouterSample')
    // A RESTful factory for retreiving contacts from 'contacts.json'

.factory('loginFactory', function($http){
    console.log("Hello from login Factory")
    var currentUser;
    var errorMsg;
    return {
        postLogin: function(loginInfo, callback) {
            console.log("POST DUDE", loginInfo)
            $http({
                method: 'POST',
                url: '/dmz/login',
                // data: params,
                params: loginInfo,
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
            })
            .success(function(data, status){
                console.log("SUCCESS!!!", data, status)
                currentUser = data.user
                callback(data.user)
                errorMsg = ""
            })
            .error(function(data, status){
                console.log("Failure...", data, status)
                errorMsg = "Please try again"
            })
        },
        submitLogout: function(callback){
            $http.get('/dmz/logout')
            .success(function(data){
                console.log("Success from factory ", data)
                callback(data)
            })
        },
        getCurrUser: function(){
            return currentUser;
        },
        returnLoginFailure: function(){
            return errorMsg;
        }
    }
    })