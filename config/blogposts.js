var mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/test');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback () {
// 	// Create your Schemas and Models here
// 	console.log("Connected to Mongoose")
// 	  // yay!
// });


var blogSchema = new mongoose.Schema({
	  title: { type: String }
	, body: String
	// , releaseYear: Number
	// , hasCreditCookie: { type: Boolean, required: '{PATH} is required!' }
	// , born: { type: Date, required: '{PATH} is required!' }
	});

// Compile a 'Movie' model using the movieSchema as the structure.
// Mongoose also creates a MongoDB collection called 'Movies' for these documents.
var BlogPost = mongoose.model('BlogPost', blogSchema);


exports.findAll = function(req, res){
	// Find all movies.
	BlogPost.find(function(err, posts) {
	  if (err) return console.error(err);
	  console.dir(posts);
	  res.send(posts)
	});

};

exports.findOne = function(req, res){
	console.log("Find one of : ", req.body)
	BlogPost.findOne({title: req.body.title}, function(err,obj) {
		if (err) return console.error(err);
	  console.dir(obj);
	  res.send(obj)
	});
	// Find all movies.
	// BlogPost.find(function(err, posts) {
	//   if (err) return console.error(err);
	//   console.dir(posts);
	//   res.send(posts)
	// });

};


exports.updateMovie = function(req, res){
    // var BlogPost = new BlogPost(req.body)
    console.log("Uhhh", req.body)
    // console.log('Saving blogpost: ' + JSON.stringify(BlogPost));

    var updateModel = {
    	title: req.body.title,
    	body: req.body.body
    }

    var callback = function(err, post) {
	  if (err){
	  	console.error(err)
	  	res.status(500);
	  	res.send(err.message)
	  	return
	  }else{
	 	console.dir(post);
	 	console.log('Success');
	 	res.send('Congrats')
		}
	}

	
	BlogPost.update({title: req.body.title}, { body: req.body.body }, { multi: false }, callback)

}

exports.addMovie = function(req, res) {
    var BlogPost = new BlogPost(req.body)
    console.log('Adding blogpost: ' + JSON.stringify(BlogPost));
    BlogPost.save(function(err, post) {
	  if (err){
	  	console.error(err)
	  	res.status(500);
	  	res.send(err.message)
	  	return
	  }else{
	 	console.dir(post);
	 	console.log('Success');
	 	res.send('Congrats')
		}
	});

}


// var thor = new BlogPost({
//   title: 'Second Title? Or First Gay Baby'
// ,body: '<div><b><br/></b></div><div><p style="color: rgb(97, 97, 97);">Second Title? Or First Gay Baby for 2015. But as drug companies, insurers and PBMs ramp up their efforts to overturn the Proposed Rule, it has become incredibly important for anyone in the community pharmacy setting to contact their state senators and representatives. </p><div style="color: rgb(97, 97, 97);"><img src="http://pbahealth.com/userfiles/image/Pictures/TriNet/Phone_web_smaller_border.jpg" width="0" height="0" alt=""/><img src="http://pbahealth.com/userfiles/image/Pictures/TriNet/Phone_web_smaller.jpg" width="0" height="0" alt=""/>Those opposed to the Proposed Rule have put out the message that its changes will destroy the Medicare prescription drug program by cutting off access to seniors and dramatically raising costs for the program, plans and beneficiaries. </div><div style="color: rgb(97, 97, 97);"> </div><div style="color: rgb(97, 97, 97);">You know that the opposite is true.</div><div style="color: rgb(97, 97, 97);"><img src="http://cdn8.staztic.com/app/a/998/998560/cute-dog-puppy-wallpaper-hd-1-2-s-307x512.jpg" style="float:right"/><br/></div><div style="color: rgb(97, 97, 97);"><br/></div><div style="color: rgb(97, 97, 97);"> </div><div style="color: rgb(97, 97, 97);">“With an estimated cost savings of nearly $1.3 billion over the next five years, while also providing increased transparency to beneficiaries and payers, CMS’ proposed regulations will increase competition, access and service for seniors,” antitrust attorney and health care competition policy expert David Balto, J.D., wrote in an <a href="http://thehill.com/blogs/congress-blog/healthcare/199394-proposed-medicare-prescription-drug-reform-it-is-all-about" target="_blank" style="color: rgb(77, 108, 159);">editorial</a> for <i>The Hill</i>. “And these reforms will start assuring seniors have access to their pharmacy of choice through an appropriate definition of ‘any willing pharmacy.’”</div><h4 style="color: rgb(77, 108, 159);">In the editorial, Balto also points out that increasing access to pharmacies by opening preferred networks will:</h4><ul style="color: rgb(97, 97, 97);"><li style="text-align: left;">Increase patient choice</li><li style="text-align: left;">Force pharmacies to compete for patient loyalty through quality of care and services offered</li><li style="text-align: left;">Increase seniors’ access to additional health services</li><li style="text-align: left;">Ensure fair competition for small businesses</li></ul><div style="color: rgb(97, 97, 97);"> </div><div style="color: rgb(97, 97, 97);">Those are the points you need to be discussing with your senators and representatives. If legislators and CMS don’t hear from community pharmacists immediately in support of the Proposed Rule, it could be thrown out entirely.</div><div style="color: rgb(97, 97, 97);"> </div><div style="color: rgb(97, 97, 97);">Call your legislators through the U.S. Capitol Switchboard at (202) 224-3121 today!</div></div>'
// });

// thor.save(function(err, thor) {
//   if (err) return console.error(err);
//   console.dir(thor);
// });