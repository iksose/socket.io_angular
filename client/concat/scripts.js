"use strict";
var __moduleName = "scripts";
angular.module('uiRouterSample', ['ui.router', 'ngAnimate', 'ngResource', 'ui.bootstrap', 'chieffancypants.loadingBar', 'textAngular', 'btford.socket-io']).run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]);
angular.module('uiRouterSample').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('/c?id', '/contacts/:id').when('/user/:id', '/contacts/:id').otherwise('/');
  $stateProvider.state("home", {
    url: "/",
    template: '<p class="lead">Welcome to the UI-Router Demo</p>' + '<p>Use the menu above to navigate. ' + 'Pay attention to the <code>$state</code> and <code>$stateParams</code> values below.</p>' + '<p>Click these links—<a href="#/c?id=1">Alice</a> or ' + '<a href="#/user/42">Bob</a>—to see a url redirect in action.</p>',
    controller: ['$scope', '$state', '$http', 'utils', function($scope, $state, $http, utils, $resource) {
      console.log("Welcome home");
    }]
  }).state('contacts', {
    url: '/contacts',
    templateUrl: 'views/contacts.html',
    resolve: {contacts: ['contacts', function(contacts) {
        return contacts.all();
      }]},
    controller: ['$scope', '$state', 'contacts', 'utils', function($scope, $state, contacts, utils) {
      $scope.contacts = contacts;
      $scope.goToRandom = function() {
        var randId = utils.newRandomKey($scope.contacts, "id", $state.params.contactId);
        $state.go('contacts.detail', {contactId: randId});
      };
    }]
  }).state('contacts.list', {
    url: '',
    templateUrl: 'views/contacts.list.html'
  }).state('contacts.detail', {
    url: '/{contactId:[0-9]{1,4}}',
    views: {
      '': {
        templateUrl: 'views/contacts.detail.html',
        controller: ['$scope', '$stateParams', 'utils', function($scope, $stateParams, utils) {
          $scope.contact = utils.findById($scope.contacts, $stateParams.contactId);
        }]
      },
      'hint@': {template: 'This is contacts.detail populating the "hint" ui-view'},
      'menuTip': {templateProvider: ['$stateParams', function($stateParams) {
          return '<hr><small class="muted">Contact ID: ' + $stateParams.contactId + '</small>';
        }]}
    }
  }).state('contacts.detail.item', {
    url: '/item/:itemId',
    views: {
      '': {
        templateUrl: 'views/contacts.detail.item.html',
        controller: ['$scope', '$stateParams', '$state', 'utils', function($scope, $stateParams, $state, utils) {
          $scope.item = utils.findById($scope.contact.items, $stateParams.itemId);
          $scope.edit = function() {
            $state.go('.edit', $stateParams);
          };
        }]
      },
      'hint@': {template: ' This is contacts.detail.item overriding the "hint" ui-view'}
    }
  }).state('views/contacts.detail.item.edit', {views: {'@contacts.detail': {
        templateUrl: 'contacts.detail.item.edit.html',
        controller: ['$scope', '$stateParams', '$state', 'utils', function($scope, $stateParams, $state, utils) {
          $scope.item = utils.findById($scope.contact.items, $stateParams.itemId);
          $scope.done = function() {
            $state.go('^', $stateParams);
          };
        }]
      }}}).state('about', {
    url: '/about',
    templateProvider: ['$timeout', function($timeout) {
      return $timeout(function() {
        return '<p class="lead">UI-Router Resources</p><ul>' + '<li><a href="https://github.com/angular-ui/ui-router/tree/master/sample">Source for this Sample</a></li>' + '<li><a href="https://github.com/angular-ui/ui-router">Github Main Page</a></li>' + '<li><a href="https://github.com/angular-ui/ui-router#quick-start">Quick Start</a></li>' + '<li><a href="https://github.com/angular-ui/ui-router/wiki">In-Depth Guide</a></li>' + '<li><a href="https://github.com/angular-ui/ui-router/wiki/Quick-Reference">API Reference</a></li>' + '</ul>';
      }, 100);
    }]
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
  }).state('es6', {
    url: '/es6',
    templateUrl: 'views/es6.html',
    controller: 'ecmascript6_controller'
  });
}]);
angular.module('uiRouterSample').controller("alertController", function($scope, errors) {
  $scope.alerts = function() {
    return errors.getErrors();
  };
  $scope.addAlert = function() {
    $scope.alerts.push({msg: "Another alert!"});
  };
  $scope.closeAlert = function(index) {
    errors.popLast();
  };
});
angular.module('uiRouterSample').controller("blogController", function($scope, $state, blogFactory) {
  console.log("Hello from blog Controller");
  $scope.note = {
    id: 0,
    title: "Title goes here",
    body: '<b>Press Back and Forward to simulate loading a new note</b><div><b><br/></b></div><div><img src="http://puppydogweb.com/gallery/puppies/labradorretriever2.jpg"/><b><br/></b></div>'
  };
  var handleThis = function(data) {
    console.log("Handling....", data[0]);
    $scope.note = data[0];
  };
  blogFactory.getMovies(handleThis);
  $scope.funUpdate = function(data) {
    console.log("Well okay I guess...", data);
    blogFactory.updatePost(data);
  };
  $scope.postsList = [];
  var handleThis2 = function(data) {
    console.log("Handling....", data);
    $scope.postsList = data;
  };
  blogFactory.getAllPosts(handleThis2);
  $scope.funUpdate2 = function(data) {
    console.log("Well okay I guess...", data);
    blogFactory.updatePost(data);
  };
  $scope.findArticle = function(data) {
    console.log("You want me to look up...", data);
  };
}).controller('blogController_individual', function($scope, $state, $stateParams, blogFactory) {
  console.log("Individual...?", $stateParams);
  var stateParams = $stateParams;
  $scope.postDetail;
  var getPostSuccess_callback = function(data) {
    $scope.postDetail = data;
  };
  blogFactory.returnOne(stateParams, getPostSuccess_callback);
  $scope.funUpdate = function(data) {
    console.log("Well okay I guess...", data);
    blogFactory.updatePost(data);
  };
}).controller('blogController_newPost', function($scope, $state, $rootScope, blogFactory, errors) {
  var loggedIn = $rootScope.loggedIn;
  console.log("Time for a new post! Are you authorize!?", loggedIn);
  if (!loggedIn) {
    errors.addErr("danger", "You're not authorized to do that");
    $state.go("home");
  }
  $scope.blogpost = {};
}).factory('blogFactory', function($http, errors) {
  console.log("Hello from blog Factory");
  var movieList;
  return {
    saveMovie: function(movie, callback) {
      $http.post("secure/admin/movies", movie).success(function(data) {
        console.log("Success from factory ", data);
      }).error(function(data, status, headers, config) {
        console.log("Fail from factory ", data, status);
        errors.addErr("danger", data);
      });
    },
    getMovies: function(callback) {
      $http.get("/blogposts").success(function(data) {
        console.log("Success from factory ", data);
        callback(data);
      }).error(function(data, status, headers, config) {
        console.log("Fail from factory ", data, status);
        callback(data, status);
      });
    },
    updatePost: function(blog) {
      console.log("Updating this : ", blog);
      $http.post("/blogposts", blog).success(function(data) {
        console.log("Success from factory ", data);
      }).error(function(data, status, headers, config) {
        console.log("Fail from factory ", data, status);
      });
    },
    getAllPosts: function(callback) {
      $http.get("/blogposts").success(function(data) {
        console.log("Success from factory ", data);
        callback(data);
      }).error(function(data, status, headers, config) {
        console.log("Fail from factory ", data, status);
      });
    },
    returnOne: function(obj, callback) {
      console.log("Factory", obj);
      $http.post('/posts', obj).success(function(data) {
        console.log("Success from factory ", data);
        callback(data);
      }).error(function(data, status, headers, config) {
        console.log("Fail from factory ", data, status);
        callback(data, status);
      });
    }
  };
});
angular.module('uiRouterSample').controller("dbController", function($scope, $state, movieFactory) {
  console.log("Hello from dbController");
  movieFactory.getMovies(handleSuccess);
  function handleErrors(data, status) {
    console.log("Handler", data, status);
  }
  function handleSuccess(data, status) {
    console.log("Success");
    $scope.movieList = data;
  }
  $scope.movieList = [];
  function handleSuccess2(data, status) {
    console.log(data, status);
    $scope.movieList = data;
  }
  $scope.movieModel = {
    title: "",
    rating: "XXX"
  };
  $scope.AddMovie = function() {
    console.log("ADDING", $scope.movieModel);
    movieFactory.saveMovie($scope.movieModel);
  };
}).factory('movieFactory', function($http, errors) {
  console.log("Hello from movie Factory");
  var movieList;
  return {
    saveMovie: function(movie, callback) {
      $http.post("secure/admin/movies", movie).success(function(data) {
        console.log("Success from factory ", data);
      }).error(function(data, status, headers, config) {
        console.log("Fail from factory ", data, status);
        errors.addErr("danger", data);
      });
    },
    getMovies: function(callback) {
      $http.get("secure/admin/movies").success(function(data) {
        console.log("Success from factory ", data);
        callback(data);
      }).error(function(data, status, headers, config) {
        console.log("Fail from factory ", data, status);
        callback(data, status);
      });
    }
  };
});
angular.module('uiRouterSample').directive('ngEnter', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if (event.which === 13) {
        scope.$apply(function() {
          scope.$eval(attrs.ngEnter);
        });
        event.preventDefault();
      }
    });
  };
});
angular.module('uiRouterSample').controller("ecmascript6_controller", function($scope, errors) {
  var $__2;
  console.log("Hello from es6");
  var Vehicle = function Vehicle(name, year) {
    this.name = name;
    this.year = year;
  };
  ($traceurRuntime.createClass)(Vehicle, {summary: function() {
      return "This vehicle's name is " + this.name + " and it was manufactured in " + this.year;
    }}, {});
  var charles = new Vehicle("Charles", "1964");
  console.log(charles.summary());
  var numbers = [1, 4, 9];
  var roots = numbers.map(Math.sqrt);
  console.log(numbers, roots);
  var evens = [2, 4, 6, 8, 10, 12, 14];
  var odds = evens.map((function(v) {
    return v + 1;
  }));
  var nums = evens.map((function(v, i) {
    return v + i;
  }));
  console.log(odds);
  console.log(evens);
  var fives = [];
  nums.forEach((function(v) {
    if (v % 5 === 0)
      fives.push(v);
  }));
  console.log("Nums ", nums);
  console.log("Fives ", fives);
  var bob = {
    _name: "Bob",
    _friends: [],
    printFriends: function() {
      var $__0 = this;
      this._friends.forEach((function(f) {
        return console.log($__0._name + " knows " + f);
      }));
    }
  };
  bob._friends.push("Kyle");
  console.log(bob.printFriends());
  function f(x) {
    for (var y = [],
        $__5 = 1; $__5 < arguments.length; $__5++)
      $traceurRuntime.setProperty(y, $__5 - 1, arguments[$traceurRuntime.toProperty($__5)]);
    return x * y.length;
  }
  console.log(f(3, "hello", true) == 6);
  var x = "inner";
  console.log("Ex wow ", x);
  var fibonacci = ($__2 = {}, Object.defineProperty($__2, Symbol.iterator, {
    value: function() {
      var pre = 0,
          cur = 1;
      return {next: function() {
          var $__6;
          ($__6 = [cur, pre + cur], pre = $__6[0], cur = $__6[1], $__6);
          return {
            done: false,
            value: cur
          };
        }};
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), $__2);
  for (var $__3 = fibonacci[$traceurRuntime.toProperty(Symbol.iterator)](),
      $__4; !($__4 = $__3.next()).done; ) {
    var n = $__4.value;
    {
      if (n > 5000)
        break;
      console.log(n);
    }
  }
});
angular.module('uiRouterSample').factory('contacts', ['$http', function($http, utils) {
  var path = 'contacts.json';
  var contacts = $http.get(path).then(function(resp) {
    return resp.data.contacts;
  });
  var factory = {};
  factory.all = function() {
    return contacts;
  };
  factory.get = function(id) {
    return contacts.then(function() {
      return utils.findById(contacts, id);
    });
  };
  return factory;
}]).service('errors', function() {
  var errArray = [];
  return {
    getErrors: function() {
      return errArray;
    },
    popLast: function() {
      errArray.pop();
    },
    addErr: function(color, text) {
      errArray.pop();
      errArray.push({
        type: color,
        msg: text
      });
    }
  };
}).factory('utils', function() {
  return {
    findById: function findById(a, id) {
      for (var i = 0; i < a.length; i++) {
        if (a[$traceurRuntime.toProperty(i)].id == id)
          return a[$traceurRuntime.toProperty(i)];
      }
      return null;
    },
    newRandomKey: function newRandomKey(coll, key, currentKey) {
      var randKey;
      do {
        randKey = coll[$traceurRuntime.toProperty(Math.floor(coll.length * Math.random()))][$traceurRuntime.toProperty(key)];
      } while (randKey == currentKey);
      return randKey;
    }
  };
});
angular.module('uiRouterSample').controller("loginController", function($scope, $rootScope, $state, $http, loginFactory) {
  console.log("Hello from login controller");
  $scope.user;
  $rootScope.loggedIn = false;
  $http.get('/api/user/').success(function(data) {
    $scope.user = data;
    console.log("Success grabbing user on refresh...", data);
    window.donuts = $scope.user;
    window.holes = $scope.loggedIn;
    if (data !== "") {
      $rootScope.loggedIn = true;
      console.log("Logged in!!!!", $scope.loggedIn);
    }
  });
  $scope.credentials = {};
  $scope.login = function() {
    console.log("Logging in...", $scope.credentials);
    var handleSuccess = function(data) {
      console.log("Callback....", data);
      $scope.user = data;
      if (data !== "") {
        $rootScope.loggedIn = true;
        console.log("Logged in!!!", $scope.loggedIn);
      }
      var element = document.getElementById("loginDropdown");
      angular.element(element).removeClass('open');
    };
    var credits = $scope.credentials;
    loginFactory.postLogin(credits, handleSuccess);
  };
  $scope.logoutUser = function() {
    console.log("So you want to log out...?");
    var handleSuccess = function(data) {
      console.log("Success on logout");
      $rootScope.loggedIn = false;
    };
    loginFactory.submitLogout(handleSuccess);
  };
  $scope.failedLogin = function() {
    return loginFactory.returnLoginFailure();
  };
});
angular.module('uiRouterSample').factory('loginFactory', function($http) {
  console.log("Hello from login Factory");
  var currentUser;
  var errorMsg;
  return {
    postLogin: function(loginInfo, callback) {
      console.log("POST DUDE", loginInfo);
      $http({
        method: 'POST',
        url: '/dmz/login',
        params: loginInfo,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function(data, status) {
        console.log("SUCCESS!!!", data, status);
        currentUser = data.user;
        callback(data.user);
        errorMsg = "";
      }).error(function(data, status) {
        console.log("Failure...", data, status);
        errorMsg = "Please try again";
      });
    },
    submitLogout: function(callback) {
      $http.get('/dmz/logout').success(function(data) {
        console.log("Success from factory ", data);
        callback(data);
      });
    },
    getCurrUser: function() {
      return currentUser;
    },
    returnLoginFailure: function() {
      return errorMsg;
    }
  };
});
angular.module('uiRouterSample').controller('socketController', function($scope, socket) {
  socket.on('send:time', function(data) {
    $scope.time = data.time;
  });
});
angular.module('uiRouterSample').controller('socketController2', function($scope, socket) {
  $scope.time = "Nothing Here";
  $scope.connectChat = function() {
    console.log("Connecting to chat...");
    socket.connect();
  };
  socket.on('send:time', function(data) {
    $scope.time = data.time;
  });
  socket.emit('disconnect');
});
'use strict';
angular.module('uiRouterSample').factory('socket', function(socketFactory) {
  return socketFactory();
});
