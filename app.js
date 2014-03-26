var express = require('express')
    // , app = express()
    , db = require('./config/dbschema')
    , path = require('path')
    , pass = require('./config/pass')
    , passport = require('passport')
    , basic_routes = require('./routes/basic')
    , user_routes = require('./routes/user')
    , movie = require('./config/movies')
    , blog = require('./config/blogposts.js');
    // , flash = require('connect-flash');


var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/client/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.logger());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());

// use express.session before passport, so that passport session will work
app.use(express.session({ secret: 'keyboard cat' }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
// app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

// clearly denote public content
// app.use('/client', express.static('public'));
app.use(express.static(path.join(__dirname, 'client')));

// set up our security to be enforced on all requests to secure paths
app.all('/secure', pass.ensureAuthenticated);
app.all('/secure/admin', pass.ensureAdmin);


// app.use(function(req, res, next) {
//   res.locals.messages = "Hahahaha"
//   next()
// })


// Basic pages
app.get('/', basic_routes.index);

app.get('/api/user', basic_routes.user);

// Login pages
app.get('/dmz/login', user_routes.getlogin);
app.post('/dmz/login', user_routes.postlogin);
app.get('/dmz/logout', user_routes.logout);

// secure pages
app.get('/secure/account', user_routes.account);

//admin pages
app.get('/secure/admin', user_routes.admin);

app.get('/secure/admin/movies', pass.ensureAdmin, movie.findAll);
app.post('/secure/admin/movies', pass.ensureAdmin, movie.addMovie)



app.get('/blogposts', blog.findAll)
app.post('/posts', blog.findOne)

app.post('/blogposts', blog.updateMovie)


// Socket.io Communication
io.sockets.on('connection', require('./routes/socket'));


server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
