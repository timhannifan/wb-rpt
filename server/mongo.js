var mascoFourStrings = Masco.find().fetch();
var strArr = [];

var updateMTags = function () {
	mascoFourStrings.each(function(obj){

		name = obj.Name;
		yakiTags = Yaki(name).extract();
		lowercase = obj.Name.toLowerCase();

		console.log(name + " : " + yakiTags);
		yakiTags.each(function(item) {
			Masco.update({_id: obj._id}, 
				{
					$push: { 
						tags: item
					}
				}
			);
		});

		Masco.update({_id: obj._id}, 
			{
				$set: { 
					cleanTitle: lowercase
				}
			}
		);
	});	
};



var cleanNewData = function () {
	console.log('called cleanRpData');
	var dataArray = Rpt.find().fetch();
	dataArray.each(function(obj){
		// var title = obj.occ_title;
		// var desc = obj.occ_desc;
		var title = obj.occ_title;
		yakiTitleTags = Yaki(title).extract();
		// yakiDescTags = Yaki(desc).extract();

		lowercase = obj.occ_title.toLowerCase();

		// console.log(title);
		// console.log(yakiTags);

		yakiTitleTags.each(function(item) {
			Rpt.update({_id: obj._id}, 
				{
					$push: { 
						titleTags: item 
					}
				}
			);
		});
		// yakiDescTags.each(function(item) {
		// 	Rpt.update({_id: obj._id}, 
		// 		{
		// 			$push: { 
		// 				descTags: item 
		// 			}
		// 		}
		// 	);
		// });
		Rpt.update({_id: obj._id}, 
			{
				$set: {
					cleanTitle: lowercase
				}

			}
		);

		console.log(lowercase);
	});	
};

/// -------------------------first match: exact title--------------
/// ------------------------------------------------------------

var matchMascoTitle = function () {
	var mascoArray = Masco.find().fetch();


	mascoArray.each(function (item) {
		var cleanMT = item.cleanTitle;
		var arrayToUpdate = [];
		var mascoCode = item.masco_code;
		console.log('searching for exact match of: ' + cleanMT);
		var matchArray = Rpt.find({cleanTitle: {$regex: cleanMT}}).fetch();
		console.log('found this many items ', matchArray);

		// push the matches to a new array

		matchArray.each(function(obj) {
			arrayToUpdate.push(obj._id);
		});

		arrayToUpdate.each(function(id) {
			console.log('exact match found');
			Rpt.update({_id: id},
				{
					$set: { 
						mascoTitleExactMatch: mascoCode
					}
				}
			);
		})


	});
	
	var firstmatches = Rpt.find({mascoTitleExactMatch: {$exists: true}}).fetch();
	console.log('----------------------------fistmatch count: ' + firstmatches.count() + 'items');
};

/// -------------------------first match: exact title--------------
/// ------------------------------------------------------------

var matchMascoTitleTags = function () {
	var mascoArray = Masco.find().fetch();


	mascoArray.each(function (item) {
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




Meteor.methods({
	updateMascoTags: function() {
		updateMTags();
	},
	cleanData: function() {
		cleanNewData();
	},
	firstMatch: function() {
		matchMascoTitle();
	},
	secondMatch: function() {
		matchMascoTitleTags();
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




// var mascoArray = Masco.findOne({});
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