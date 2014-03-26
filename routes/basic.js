// exports.index = function(req, res) {
//   res.render('index', { user: req.user });
//   // req.flash('info', 'Flash is back!')
// };


exports.index = function(req, res) {
	// res.send(500, { "user": "req.user" })
  res.render('index.html', { "user": "req.user" }, function(err, html){
  	res.set({
    'Other-Header': 'value'
  	});
  	res.send(html)
  });
};


exports.user = function (req, res) {
  res.json(req.user);
};