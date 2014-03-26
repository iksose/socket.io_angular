// Source: client/js/alertController.js
angular.module('uiRouterSample').controller('alertController', [
  '$scope',
  'errors',
  function ($scope, errors) {
    $scope.alerts = function () {
      return errors.getErrors();
    };
    $scope.addAlert = function () {
      $scope.alerts.push({ msg: 'Another alert!' });
    };
    // $scope.closeAlert = function(index) {
    //   $scope.alerts.splice(index, 1);
    // };
    $scope.closeAlert = function (index) {
      errors.popLast();
    };
  }
]);
// Source: client/js/blogController.js
angular.module('uiRouterSample').controller('blogController', [
  '$scope',
  '$state',
  'blogFactory',
  function ($scope, $state, blogFactory) {
    console.log('Hello from blog Controller');
    //textAngular
    $scope.note = {
      id: 0,
      title: 'Title goes here',
      body: '<b>Press Back and Forward to simulate loading a new note</b><div><b><br/></b></div><div><img src="http://puppydogweb.com/gallery/puppies/labradorretriever2.jpg"/><b><br/></b></div>'
    };
    var handleThis = function (data) {
      console.log('Handling....', data[0]);
      $scope.note = data[0];
    };
    blogFactory.getMovies(handleThis);
    $scope.funUpdate = function (data) {
      console.log('Well okay I guess...', data);
      // var obj = {_id: data}
      blogFactory.updatePost(data);
    };
    ///CONTROLLER FOR LIST VIEW
    //
    //
    $scope.postsList = [];
    var handleThis2 = function (data) {
      console.log('Handling....', data);
      $scope.postsList = data;
    };
    blogFactory.getAllPosts(handleThis2);
    $scope.funUpdate2 = function (data) {
      console.log('Well okay I guess...', data);
      // var obj = {_id: data}
      blogFactory.updatePost(data);
    };
    $scope.findArticle = function (data) {
      console.log('You want me to look up...', data);
    };
  }
]).controller('blogController_individual', [
  '$scope',
  '$state',
  '$stateParams',
  'blogFactory',
  function ($scope, $state, $stateParams, blogFactory) {
    console.log('Individual...?', $stateParams);
    var stateParams = $stateParams;
    $scope.postDetail;
    var getPostSuccess_callback = function (data) {
      $scope.postDetail = data;
    };
    blogFactory.returnOne(stateParams, getPostSuccess_callback);
    $scope.funUpdate = function (data) {
      console.log('Well okay I guess...', data);
      // var obj = {_id: data}
      blogFactory.updatePost(data);
    };
  }
]).controller('blogController_newPost', [
  '$scope',
  '$state',
  '$rootScope',
  'blogFactory',
  'errors',
  function ($scope, $state, $rootScope, blogFactory, errors) {
    var loggedIn = $rootScope.loggedIn;
    console.log('Time for a new post! Are you authorize!?', loggedIn);
    if (!loggedIn) {
      errors.addErr('danger', 'You\'re not authorized to do that');
      $state.go('home');
    }
    $scope.blogpost = {};
  }
]).factory('blogFactory', [
  '$http',
  'errors',
  function ($http, errors) {
    console.log('Hello from blog Factory');
    var movieList;
    return {
      saveMovie: function (movie, callback) {
        $http.post('secure/admin/movies', movie).success(function (data) {
          console.log('Success from factory ', data);
        }).error(function (data, status, headers, config) {
          console.log('Fail from factory ', data, status);
          // callback(data)
          errors.addErr('danger', data);
        });
      },
      getMovies: function (callback) {
        $http.get('/blogposts').success(function (data) {
          console.log('Success from factory ', data);
          callback(data);
        }).error(function (data, status, headers, config) {
          console.log('Fail from factory ', data, status);
          callback(data, status);
        });
      },
      updatePost: function (blog) {
        console.log('Updating this : ', blog);
        $http.post('/blogposts', blog).success(function (data) {
          console.log('Success from factory ', data);
        }).error(function (data, status, headers, config) {
          console.log('Fail from factory ', data, status);
        });
      },
      getAllPosts: function (callback) {
        $http.get('/blogposts').success(function (data) {
          console.log('Success from factory ', data);
          callback(data);
        }).error(function (data, status, headers, config) {
          console.log('Fail from factory ', data, status);
        });
      },
      returnOne: function (obj, callback) {
        console.log('Factory', obj);
        $http.post('/posts', obj).success(function (data) {
          console.log('Success from factory ', data);
          callback(data);
        }).error(function (data, status, headers, config) {
          console.log('Fail from factory ', data, status);
          callback(data, status);
        });
      }
    };
  }
]);
;
// Source: client/js/dbController.js
angular.module('uiRouterSample').controller('dbController', [
  '$scope',
  '$state',
  'movieFactory',
  function ($scope, $state, movieFactory) {
    console.log('Hello from dbController');
    movieFactory.getMovies(handleSuccess);
    function handleErrors(data, status) {
      console.log('Handler', data, status);
    }
    function handleSuccess(data, status) {
      console.log('Success');
      $scope.movieList = data;
    }
    $scope.movieList = [];
    function handleSuccess2(data, status) {
      console.log(data, status);
      $scope.movieList = data;
    }
    $scope.movieModel = {
      title: '',
      rating: 'XXX'
    };
    $scope.AddMovie = function () {
      console.log('ADDING', $scope.movieModel);
      movieFactory.saveMovie($scope.movieModel);
    };
  }
]).factory('movieFactory', [
  '$http',
  'errors',
  function ($http, errors) {
    console.log('Hello from movie Factory');
    var movieList;
    return {
      saveMovie: function (movie, callback) {
        $http.post('secure/admin/movies', movie).success(function (data) {
          console.log('Success from factory ', data);
        }).error(function (data, status, headers, config) {
          console.log('Fail from factory ', data, status);
          // callback(data)
          errors.addErr('danger', data);
        });
      },
      getMovies: function (callback) {
        $http.get('secure/admin/movies').success(function (data) {
          console.log('Success from factory ', data);
          callback(data);
        }).error(function (data, status, headers, config) {
          console.log('Fail from factory ', data, status);
          callback(data, status);
        });
      }
    };
  }
]);
;
// Source: client/js/directives.js
angular.module('uiRouterSample').directive('ngEnter', function () {
  return function (scope, element, attrs) {
    element.bind('keydown keypress', function (event) {
      if (event.which === 13) {
        scope.$apply(function () {
          scope.$eval(attrs.ngEnter);
        });
        event.preventDefault();
      }
    });
  };
});
;
// Source: client/js/factory.js
angular.module('uiRouterSample').factory('contacts', [
  '$http',
  function ($http, utils) {
    var path = 'contacts.json';
    var contacts = $http.get(path).then(function (resp) {
        return resp.data.contacts;
      });
    var factory = {};
    factory.all = function () {
      return contacts;
    };
    factory.get = function (id) {
      return contacts.then(function () {
        return utils.findById(contacts, id);
      });
    };
    return factory;
  }
]).service('errors', function () {
  var errArray = [];
  return {
    getErrors: function () {
      return errArray;
    },
    popLast: function () {
      errArray.pop();
    },
    addErr: function (color, text) {
      errArray.pop();
      errArray.push({
        type: color,
        msg: text
      });
    }
  };
}).factory('utils', function () {
  return {
    findById: function findById(a, id) {
      for (var i = 0; i < a.length; i++) {
        if (a[i].id == id)
          return a[i];
      }
      return null;
    },
    newRandomKey: function newRandomKey(coll, key, currentKey) {
      var randKey;
      do {
        randKey = coll[Math.floor(coll.length * Math.random())][key];
      } while (randKey == currentKey);
      return randKey;
    }
  };
});
;
// Source: client/js/loginController.js
angular.module('uiRouterSample').controller('loginController', [
  '$scope',
  '$rootScope',
  '$state',
  '$http',
  'loginFactory',
  function ($scope, $rootScope, $state, $http, loginFactory) {
    console.log('Hello from login controller');
    $scope.user;
    $rootScope.loggedIn = false;
    //Sets the scope if the user refreshes
    $http.get('/api/user/').success(function (data) {
      $scope.user = data;
      console.log('Success grabbing user on refresh...', data);
      window.donuts = $scope.user;
      window.holes = $scope.loggedIn;
      if (data !== '') {
        $rootScope.loggedIn = true;
        console.log('Logged in!!!!', $scope.loggedIn);
      }
    });
    $scope.credentials = {};
    $scope.login = function () {
      console.log('Logging in...', $scope.credentials);
      var handleSuccess = function (data) {
        console.log('Callback....', data);
        $scope.user = data;
        if (data !== '') {
          $rootScope.loggedIn = true;
          console.log('Logged in!!!', $scope.loggedIn);
        }
        var element = document.getElementById('loginDropdown');
        angular.element(element).removeClass('open');
      };
      var credits = $scope.credentials;
      loginFactory.postLogin(credits, handleSuccess);
    };
    // function handleSuccess(data, status){
    //     console.log("Success....", data, status)
    // }
    $scope.logoutUser = function () {
      console.log('So you want to log out...?');
      var handleSuccess = function (data) {
        console.log('Success on logout');
        $rootScope.loggedIn = false;
      };
      loginFactory.submitLogout(handleSuccess);
    };
    $scope.failedLogin = function () {
      return loginFactory.returnLoginFailure();
    };
  }
]);
angular.module('uiRouterSample').factory('loginFactory', [
  '$http',
  function ($http) {
    console.log('Hello from login Factory');
    var currentUser;
    var errorMsg;
    return {
      postLogin: function (loginInfo, callback) {
        console.log('POST DUDE', loginInfo);
        $http({
          method: 'POST',
          url: '/dmz/login',
          params: loginInfo,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (data, status) {
          console.log('SUCCESS!!!', data, status);
          currentUser = data.user;
          callback(data.user);
          errorMsg = '';
        }).error(function (data, status) {
          console.log('Failure...', data, status);
          errorMsg = 'Please try again';
        });
      },
      submitLogout: function (callback) {
        $http.get('/dmz/logout').success(function (data) {
          console.log('Success from factory ', data);
          callback(data);
        });
      },
      getCurrUser: function () {
        return currentUser;
      },
      returnLoginFailure: function () {
        return errorMsg;
      }
    };
  }
]);
// Source: client/js/module.js
// Make sure to include the `ui.router` module as a dependency
angular.module('uiRouterSample', [
  'ui.router',
  'ngAnimate',
  'ngResource',
  'ui.bootstrap',
  'chieffancypants.loadingBar',
  'textAngular'
]).run([
  '$rootScope',
  '$state',
  '$stateParams',
  function ($rootScope, $state, $stateParams) {
    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ui-sref-active="active }"> will set the <li> // to active whenever
    // 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }
]);
;
// Source: client/js/states.js
// Make sure to include the `ui.router` module as a dependency.
angular.module('uiRouterSample').config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    /////////////////////////////
    // Redirects and Otherwise //
    /////////////////////////////
    // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
    $urlRouterProvider.when('/c?id', '/contacts/:id').when('/user/:id', '/contacts/:id').otherwise('/');
    //////////////////////////
    // State Configurations //
    //////////////////////////
    // Use $stateProvider to configure your states.
    $stateProvider.state('home', {
      url: '/',
      template: '<p class="lead">Welcome to the UI-Router Demo</p>' + '<p>Use the menu above to navigate. ' + 'Pay attention to the <code>$state</code> and <code>$stateParams</code> values below.</p>' + '<p>Click these links\u2014<a href="#/c?id=1">Alice</a> or ' + '<a href="#/user/42">Bob</a>\u2014to see a url redirect in action.</p>',
      controller: [
        '$scope',
        '$state',
        '$http',
        'utils',
        function ($scope, $state, $http, utils, $resource) {
          // Add a 'contacts' field in this abstract parent's scope, so that all
          // child state views can access it in their scopes. Please note: scope
          // inheritance is not due to nesting of states, but rather choosing to
          // nest the templates of those states. It's normal scope inheritance.
          console.log('Welcome home');
        }
      ]
    }).state('contacts', {
      url: '/contacts',
      templateUrl: 'views/contacts.html',
      resolve: {
        contacts: [
          'contacts',
          function (contacts) {
            return contacts.all();
          }
        ]
      },
      controller: [
        '$scope',
        '$state',
        'contacts',
        'utils',
        function ($scope, $state, contacts, utils) {
          // Add a 'contacts' field in this abstract parent's scope, so that all
          // child state views can access it in their scopes. Please note: scope
          // inheritance is not due to nesting of states, but rather choosing to
          // nest the templates of those states. It's normal scope inheritance.
          $scope.contacts = contacts;
          $scope.goToRandom = function () {
            var randId = utils.newRandomKey($scope.contacts, 'id', $state.params.contactId);
            // $state.go() can be used as a high level convenience method
            // for activating a state programmatically.
            $state.go('contacts.detail', { contactId: randId });
          };
        }
      ]
    }).state('contacts.list', {
      url: '',
      templateUrl: 'views/contacts.list.html'
    }).state('contacts.detail', {
      url: '/{contactId:[0-9]{1,4}}',
      views: {
        '': {
          templateUrl: 'views/contacts.detail.html',
          controller: [
            '$scope',
            '$stateParams',
            'utils',
            function ($scope, $stateParams, utils) {
              $scope.contact = utils.findById($scope.contacts, $stateParams.contactId);
            }
          ]
        },
        'hint@': { template: 'This is contacts.detail populating the "hint" ui-view' },
        'menuTip': {
          templateProvider: [
            '$stateParams',
            function ($stateParams) {
              // This is just to demonstrate that $stateParams injection works for templateProvider.
              // $stateParams are the parameters for the new state we're transitioning to, even
              // though the global '$stateParams' has not been updated yet.
              return '<hr><small class="muted">Contact ID: ' + $stateParams.contactId + '</small>';
            }
          ]
        }
      }
    }).state('contacts.detail.item', {
      url: '/item/:itemId',
      views: {
        '': {
          templateUrl: 'views/contacts.detail.item.html',
          controller: [
            '$scope',
            '$stateParams',
            '$state',
            'utils',
            function ($scope, $stateParams, $state, utils) {
              $scope.item = utils.findById($scope.contact.items, $stateParams.itemId);
              $scope.edit = function () {
                // Here we show off go's ability to navigate to a relative state. Using '^' to go upwards
                // and '.' to go down, you can navigate to any relative state (ancestor or descendant).
                // Here we are going down to the child state 'edit' (full name of 'contacts.detail.item.edit')
                $state.go('.edit', $stateParams);
              };
            }
          ]
        },
        'hint@': { template: ' This is contacts.detail.item overriding the "hint" ui-view' }
      }
    }).state('views/contacts.detail.item.edit', {
      views: {
        '@contacts.detail': {
          templateUrl: 'contacts.detail.item.edit.html',
          controller: [
            '$scope',
            '$stateParams',
            '$state',
            'utils',
            function ($scope, $stateParams, $state, utils) {
              $scope.item = utils.findById($scope.contact.items, $stateParams.itemId);
              $scope.done = function () {
                // Go back up. '^' means up one. '^.^' would be up twice, to the grandparent.
                $state.go('^', $stateParams);
              };
            }
          ]
        }
      }
    }).state('about', {
      url: '/about',
      templateProvider: [
        '$timeout',
        function ($timeout) {
          return $timeout(function () {
            return '<p class="lead">UI-Router Resources</p><ul>' + '<li><a href="https://github.com/angular-ui/ui-router/tree/master/sample">Source for this Sample</a></li>' + '<li><a href="https://github.com/angular-ui/ui-router">Github Main Page</a></li>' + '<li><a href="https://github.com/angular-ui/ui-router#quick-start">Quick Start</a></li>' + '<li><a href="https://github.com/angular-ui/ui-router/wiki">In-Depth Guide</a></li>' + '<li><a href="https://github.com/angular-ui/ui-router/wiki/Quick-Reference">API Reference</a></li>' + '</ul>';
          }, 100);
        }
      ]
    }).state('database', {
      url: '/database',
      templateUrl: 'views/database.html',
      controller: 'dbController'
    }).state('blog', {
      url: '/blog',
      templateUrl: 'views/blog.html',
      controller: 'blogController'
    }).state('bloglist', {
      url: '/bloglist',
      templateUrl: 'views/bloglist.html',
      controller: 'blogController'
    }).state('post', {
      url: '/post/:title',
      templateUrl: 'views/bloglist.post.html',
      controller: 'blogController_individual'
    }).state('newPost', {
      url: '/newPost',
      templateUrl: 'views/newpost.html',
      controller: 'blogController_newPost'
    });
  }
]);