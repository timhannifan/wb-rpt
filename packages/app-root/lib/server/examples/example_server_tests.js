

  // $ = cheerio.load('<ul id="fruits"><li class="apple">Apple</li><li class="orange">Orange</li><li class="pear">Pear</li></ul>');

// $('ul').attr('id');
//=> fruits

// console.log('cheerio found this many items: ' + $('#fruits').find('li').length);
//=> 3




// HTTP.call("GET", "http://www.jobstreet.com.my/en/job-search/find-specialization", function (error, result) {
// 	var self = this;
// 	self.items = new Array();

// 	if(error && result.statusCode !== 200){console.log('Request error.');}

//   if (!error && result.statusCode == 200){
//     var info = result.content
//     , $ = cheerio.load(info)
//     , $body = $('body')
//     , $targets = $body.find('.halfdent');
// 		//I know .halfdent elements contain the parent categories

// 		//for each one of those elements found
//     $targets.each(function(i, item){
// 			var $a = $(item).children('a');
// 			//and add all that data to my items array
//       self.items[i] = { 
// 				href: $a.attr('href')
// 			};
//     });
//     console.log(self.items);
//   }
// });



////////// ------------- returns a list of job links

// function getExampleList() {
// 	var parentSpecializations = [ 
// 		{ href: 'http://www.jobstreet.com.my/en/job-search/specialization/pharmacy-healthcare-jobs/' }
// 	];

// 	parentSpecializations.each(function(obj, callback){
// 		// var url = obj.href;

// 		HTTP.call("GET", obj.href, function (error, result) {
// 			var self = this;
// 			self.items = new Array();
// 			counter = 10;


// 			if(error && result.statusCode !== 200){console.log('Request error.');}

// 		  if (!error && result.statusCode == 200){
// 		    var info = result.content
// 		    , $ = cheerio.load(info)
// 		    , $body = $('.panel-body')
// 		    , $targets = $body.find('.position-title-link');
// 				//I know .position-title-link elements contain the parent categories


// 				// for (var i = counter - 1; i >= 0; i--) {
// 		  //     self.items[i] = { 
// 				// 		href: $a.attr('href')
// 				// 	};
// 				// }
// 				//for each one of those elements found
// 		    $targets.each(function(i, item){
// 					var $a = $(item).attr('href');
// 					//and add all that data to my items array
// 		      self.items[i] = { 
// 						href: $a
// 					};
// 		    });
// 		    console.log(self.items);
// 		  }
// 		});
// 	});	
// };
// console.log('------------getExampleList: '+ getExampleList());



// ------------- PAGINATION EXAMPLE FOR SUBSPCIALIZATION


// var paginationExample = [ 
// 	{ href: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=113&area=&salary=&src=12&pg=1'},
// 	{href: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=113&area=&salary=&src=12&pg=2'},
// 	{href: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=113&area=&salary=&src=12&pg=3'},
// 	{href: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=113&area=&salary=&src=12&pg=4'},
// 	{href: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=113&area=&salary=&src=12&pg=5'},
// 	{href: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=113&area=&salary=&src=12&pg=500'}
// ];


// var groupedItems = new Array();

// paginationExample.each(function(obj){

// 	HTTP.call("GET", obj.href, function (error, result) {
// 		var self = this;
// 		self.items = new Array();

// 		if(error && result.statusCode !== 200){console.log('Request error.');}

// 	  if (!error && result.statusCode == 200){
// 	    var info = result.content
// 	    , $ = cheerio.load(info)
// 	    , $body = $('body')
// 	    , $targets = $body.find('.position-title-link');
// 			//I know .position-title-link elements contain the parent categories

// 			//for each one of those elements found
// 	    $targets.each(function(i, item){
// 				var $a = $(item).attr('href');
// 				//and add all that data to my items array
// 	      self.items[i] = { 
// 					href: $a
// 				};
// 				groupedItems.push($a);
// 				console.log('self.items ----------------' + self.items);				
// 	    });
// 	  }
//     console.log('groupedItems ----------------' + groupedItems);
// 	});
// });	


// groupedItems.each(function(obj){
// 	console.log(obj.href);	
// })


// var jobSpecializations = [
// 	'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=113&area=&salary=&src=12&pg='
// 	, 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=113&area=&salary=&src=12&pg='
// ];