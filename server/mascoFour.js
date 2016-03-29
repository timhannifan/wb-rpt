var mascoFourFetch = MascoFour.find().fetch();

var cleanMascoThree = function () {	
	var mascoFetch = MascoThree.find({}).fetch();

	// console.log(mascoFetch);

	for (var i = mascoFetch.length - 1; i >= 0; i--) {
		console.log(mascoFetch[i]);
		var self = mascoFetch[i],
		name = self.description_3_digit,
		_id = self._id,
		yakiTags = Yaki(name).extract(),
		lowercase = name.toLowerCase();

		for (var j = yakiTags.length - 1; j >= 0; j--) {
			
			MascoThree.update({_id: _id}, 
				{
					$push: { 
						tags: yakiTags[j]
					}
				}
			);
		}

		MascoThree.update({_id: _id}, 
			{
				$set: { 
					cleanTitle: lowercase
				}
			}
		);
	}
};
var cleanMascoFour = function () {	
	var mascoFetch = MascoFour.find({}).fetch();

	// console.log(mascoFetch);

	for (var i = mascoFetch.length - 1; i >= 0; i--) {
		console.log(mascoFetch[i]);
		var self = mascoFetch[i],
		name = self.description_4_digit,
		_id = self._id,
		yakiTags = Yaki(name).extract(),
		lowercase = name.toLowerCase();

		for (var j = yakiTags.length - 1; j >= 0; j--) {
			
			MascoFour.update({_id: _id}, 
				{
					$push: { 
						tags: yakiTags[j]
					}
				}
			);
		}

		MascoFour.update({_id: _id}, 
			{
				$set: { 
					cleanTitle: lowercase
				}
			}
		);
	}
};
var cleanMascoFive = function () {	
	var mascoFetch = MascoFive.find({}).fetch();

	// console.log(mascoFetch);

	for (var i = mascoFetch.length - 1; i >= 0; i--) {
		console.log(mascoFetch[i]);
		var self = mascoFetch[i],
		name = self.description_5_digit,
		_id = self._id,
		yakiTags = Yaki(name).extract(),
		lowercase = name.toLowerCase();

		for (var j = yakiTags.length - 1; j >= 0; j--) {
			
			MascoFive.update({_id: _id}, 
				{
					$push: { 
						tags: yakiTags[j]
					}
				}
			);
		}

		MascoFive.update({_id: _id}, 
			{
				$set: { 
					cleanTitle: lowercase
				}
			}
		);
	}
};

var cleanRpt = function () {
	var rptArray = Rpt.find({}).fetch();

	for (var i = rptArray.length - 1; i >= 0; i--) {
		var self = rptArray[i],
		title = self.occ_title,
		desc = self.occ_desc,
		id = self._id,
		yakiTitleTags = Yaki(self.occ_title).extract(),
		yakiDescTags = Yaki(self.occ_desc).extract(),
		lowercase = self.occ_title.toLowerCase();

		console.log("Cleaning: " + title);

		for (var j = yakiTitleTags.length - 1; j >= 0; j--) {
			Rpt.update({_id: id}, 
				{
					$push: { 
						titleTags: yakiTitleTags[j] 
					}
				}
			);
		}

		for (var k = yakiDescTags.length - 1; k >= 0; k--) {
			Rpt.update({_id: id}, 
				{
					$push: { 
						descriptionTags: yakiDescTags[k] 
					}
				}
			);
		}

		Rpt.update({_id: id}, 
			{
				$set: {
					cleanTitle: lowercase
				}

			}
		);
	}
};

/// -------------------------first match: exact title-------------- ////

var matchMascoTitle = function () {
	mascoFourFetch.each(function (item) {
		var arrayToUpdate = [],
		cleanMT = item.cleanTitle,
		mascoCode = item.masco_code,
		matchArray = Rpt.find({cleanTitle:  cleanMT}).fetch();
				// var matchArray = Rpt.find({cleanTitle: {$regex: cleanMT}}).fetch();
		console.log('searching for exact match of: ' + cleanMT + 'resulted in ' + matchArray.count() + 'matches');

		// push the matches to a new array
		matchArray.each(function(obj) {
			arrayToUpdate.push(obj._id);
		});

		arrayToUpdate.each(function(id) {

			Rpt.update({_id: id},
				{
					$set: { 
						matchMascoTitle: mascoCode
					}
				}
			);
		})
	});
	
	// var firstmatches = Rpt.find({mascoTitleExactMatch: {$exists: true}}).fetch();
	// console.log('----------------------------exact title match found: ' + firstmatches.count() + 'items');
};

/// -------------------------second match:  title tag match--------------
/// ------------------------------------------------------------

var matchMascoTitleTags = function () {
	var mascoFourFetch = MascoFour.find().fetch();


	mascoFourFetch.each(function (item) {
		var titleTags = item.tags;
		console.log(titleTags);

		var grouped = [];	

		function findIntersect() {
			return _.intersection(grouped);
		};	

		titleTags.each(function(tag){
			var matchIdArray = [];
			console.log(tag);
			var matchArray = Rpt.find({titleTags:{$regex:tag}}).fetch();

			matchArray.each(function(obj){
				matchIdArray.push(obj._id);

			});

			console.log('matchArray count', matchArray.count());
			grouped.push(matchIdArray);

		});

		// findIntersect(grouped);
		// intersect = _.intersection(grouped);
		// console.log('grouped', grouped);
		// console.log('findIntersect(grouped);', findIntersect(grouped));

		// var result = grouped.shift().reduce(function(res, v) {
		//     if (res.indexOf(v) === -1 && grouped.every(function(a) {
		//         return a.indexOf(v) !== -1;
		//     })) res.push(v);

		//    	console.log(res);
		//     return res;
		// }, []);

		// intersect.each(function(obj) {
			// console.log('intersect', obj);
			// console.log('found an intersection, updating doc')
			// Rpt.update({_id: id},
			// 	{
			// 		$set: { 
			// 			mascoTagTitleIntersectionMatch: item._id
			// 		}
			// 	}
			// );
		// });
	});
};


/// -------------------------third match:  tag parts--------------
/// ------------------------------------------------------------

var matchMascoTitleTagsPartial = function () {
	var mascoFourFetch = MascoFour.find().fetch();


	mascoFourFetch.each(function (item) {
		var titleTags = item.tags[0];
		console.log(titleTags);

		var matchArray = Rpt.find({titleTags:{$regex:titleTags}}).fetch();

		matchArray.each(function(obj){
			console.log('upadting document' +obj._id );
			Rpt.update({_id: obj._id},
				{
					$set: { 
						matchMascoTitleTagsPartial0: item.masco_code
					}
				}
			);
		});

	});
};

/// -------------------------third match:  tag parts--------------
/// ------------------------------------------------------------

var matchMascoTitleTagsPartialOne = function () {
	var mascoFourFetch = MascoFour.find().fetch();


	mascoFourFetch.each(function (item) {
		var titleTags = item.tags[1];
		console.log(titleTags);

		if(titleTags){
			var matchArray = Rpt.find({titleTags:{$regex:titleTags}}).fetch();

			matchArray.each(function(obj){
				console.log('upadting document' +obj._id );
				Rpt.update({_id: obj._id},
					{
						$set: { 
							matchMascoTitleTagsPartial1: item.masco_code
						}
					}
				);
			});
		}
	});
};
/// -------------------------third match:  tag parts--------------
/// ------------------------------------------------------------

var matchMascoTitleTagsPartiaTwo = function () {
	var mascoFourFetch = MascoFour.find().fetch();


	mascoFourFetch.each(function (item) {
		var titleTags = item.tags[2];
		console.log(titleTags);

		if(titleTags){
			var matchArray = Rpt.find({titleTags:{$regex:titleTags}}).fetch();

			matchArray.each(function(obj){
				console.log('upadting document' +obj._id );
				Rpt.update({_id: obj._id},
					{
						$set: { 
							matchMascoTitleTagsPartial2: item.masco_code
						}
					}
				);
			});
		}

	});
};



Meteor.methods({
	cleanMascoThree: function() {
		cleanMascoThree();
	},
	cleanMascoFour: function() {
		cleanMascoFour();
	},
	cleanMascoFive: function() {
		cleanMascoFive();
	},
	cleanRpt: function() {
		cleanRpt();
	},
	firstMatch: function() {
		matchMascoTitle();
	},
	secondMatch: function() {
		matchMascoTitleTags();
	},
	thirdMatch: function() {
		matchMascoTitleTagsPartial();
	},
	fourthMatch: function() {
		matchMascoTitleTagsPartialOne();
	},
	fifthMatch: function() {
		matchMascoTitleTagsPartiaTwo();
	}
});


// rptDataArray.each(function(obj){
// 	title = obj.occ_title;
// 	desc = obj.occ_desc;
// 	yakiDescTags = Yaki(desc).extract();

// 	console.log(title);
// 	console.log(yakiDescTags);
	
// 	yakiDescTags.each(function(item) {
// 		Rpt.update({_id: obj._id}, {$push: 
// 			{ descTags: item }
// 		});
// 	});
// });

// /// -------------------------find manager example--------------
// /// ------------------------------------------------------------
// var data = Rpt.find({titleTags:{$regex:"manager"}}).fetch();

// console.log('datacount dentist:' + data);
// data.each(function(item){
// 	console.log(item.occ_title);
// })




// var mascoFourFetch = MascoFour.findOne({});
// var tags = mascoEx.tags;
// var similarItems = [];

// var intersect = _.intersection(similarItems);

// tags.each(function (tag) {
// 	var itemArray = Rpt.find({titleTags:{$regex:tag}}).fetch();

// 	console.log('datacount '+tag+' :' + itemArray.count());

// 	similarItems.push(itemArray);

// 	// itemArray.each(function(item){
// 	// 	// similarItems.push(item._id);
// 	// 	// console.log(item._id);
// 	// 	// Rpt.update()
// 	// });

// 	// console.log(i)
// });

// console.log(intersect);




// function checkForSingle(argument) {
// 	// body...
// }


// rptDataArray.each(function(obj){
// 	// var title = obj.occ_title;
// 	// var desc = obj.occ_desc;
// 	title = obj.occ_title;
// 	yakiTags = Yaki(title).extract();

// 	function titleTags (title){
// 		return Yaki(title).extract();
// 	};
// 	function descTags (desc){
// 		return Yaki(desc).extract();
// 	};
// 	function uniques (arg1, arg2){
// 		return _.union(arg1,arg2);
// 	}


// 	uniques = uniques(titleTags(obj.occ_title),descTags(obj.occ_desc));

// 	console.log(title);
// 	console.log(uniques);
	
// 	Rpt.update({_id: obj._id}, {$push: 
// 		{ titleTags: uniques }
// 	});
// });
		// console.log(grouped);
		// var titleTags = item.tags;
		// var arrayToUpdate = [];
		// var mascoCode = item.masco_code;
		// var arrayToFindIntersection = [];



		// console.log('arrayToFindIntersection.count' + arrayToFindIntersection.count());

		// titleTags.each(function(tag){
		// 	console.log('processing tag: '+ tag);
		// 	var matchArray = Rpt.find({titleTags:{$regex:tag}}).fetch();


		// 	console.log('matchArray count', matchArray.count());

		// 	arrayToFindIntersection.push(matchArray);
		// 	console.log('arrayToFindIntersection.count' + arrayToFindIntersection.count());
		// 	// matchArray.each(function(obj){
		// 	// 	arrayToUpdate.push(obj._id);
		// 	// })

		// });
		// console.log('arrayToFindIntersection.count' + arrayToFindIntersection.count());

		// var multipleMatchesArray = _.intersection(arrayToFindIntersection);
		// // console.log('arrayToFindIntersection', arrayToFindIntersection.count());
		// // console.log('multipleMatchesArray', multipleMatchesArray.count());

		// // push the matches to a new array
		// multipleMatchesArray.each(function(id) {
		// 	// console.log('exact match found');
		// 	Rpt.update({_id: id},
		// 		{
		// 			$push: { 
		// 				mascoTitleTagsMatch: mascoCode
		// 			}
		// 		}
		// 	);
		// });

	
	// var secondMatches = Rpt.find({mascoTitleTagsMatch: {$exists: true}}).fetch();
	// console.log('----------------------------second match count: ' + secondMatches.count() + 'items');
