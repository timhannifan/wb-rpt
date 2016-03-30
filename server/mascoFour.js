// var mascoFourFetch = MascoFour.find().fetch();

//// ------ clean masco classificaiton codes, add cleanTitle and tag attributes ---- ////
var cleanMascoThree = function () {	
	var mascoFetch = MascoThree.find({}).fetch();

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

//// ------ clean rpt data, add cleanTitle and tag attributes ---- ////
var cleanRpt = function () {
	var rptArray = Rpt.find({}).fetch();

	for (var i = rptArray.length - 1; i >= 0; i--) {
		var self = rptArray[i],
		title = self.occ_title,
		desc = self.occ_desc,
		id = self._id,
		yakiTitleTags = Yaki((self.occ_title).toLowerCase()).extract(),
		// yakiDescTags = Yaki(self.occ_desc).extract(),
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

		// for (var k = yakiDescTags.length - 1; k >= 0; k--) {
		// 	Rpt.update({_id: id}, 
		// 		{
		// 			$push: { 
		// 				descriptionTags: yakiDescTags[k] 
		// 			}
		// 		}
		// 	);
		// }

		Rpt.update({_id: id}, 
			{
				$set: {
					cleanTitle: lowercase
				}

			}
		);
	}
};

//// ------ clean rep data, add cleanTitle and tag attributes ---- ////
var cleanRep = function () {
	var repArray = Rep.find({}).fetch();

	for (var i = repArray.length - 1; i >= 0; i--) {
		var self = repArray[i],
		title = repArray[i].job1_position,
		id = repArray[i]._id,
		yakiTitleTags = Yaki(title.toLowerCase()).extract(),
		lowercase = title.toLowerCase();

		console.log("Cleaning REP data: " + title);

		for (var j = yakiTitleTags.length - 1; j >= 0; j--) {
			Rep.update({_id: id}, 
				{
					$push: { 
						titleTags: yakiTitleTags[j] 
					}
				}
			);
		}

		Rep.update({_id: id}, 
			{
				$set: {
					cleanTitle: lowercase,

				}

			}
		);
	}
};

/// rpt vs mascofour
var mascoTitleMatchFour = function () {
	var mascoFetch = MascoFour.find({}).fetch();
	
	for (var i = mascoFetch.length - 1; i >= 0; i--) {
		var self = mascoFetch[i],
		cleanMascoTitle = mascoFetch[i].cleanTitle,
		id = mascoFetch[i].id,
		_id = mascoFetch[i]._id,
		matchArray = Rpt.find({cleanTitle: mascoFetch[i].cleanTitle }).fetch();

		console.log('found ' + matchArray.length + ' RPT items matching '+ cleanMascoTitle);

		for (var j = matchArray.length - 1; j >= 0; j--) {
			Rpt.update({_id: matchArray[j]._id }, 
				{
					$push: { 
						mascoTitleMatchFour: id 
					}
				}
			);

			console.log('Found an exact match: '+ matchArray[j]._id);
		}
	}
};

/// rpt vs mascofive
var mascoTitleMatchFive = function () {
	var mascoFetch = MascoFive.find({}).fetch();
	
	for (var i = mascoFetch.length - 1; i >= 0; i--) {
		var self = mascoFetch[i],
		cleanMascoTitle = mascoFetch[i].cleanTitle,
		id = mascoFetch[i].id,
		_id = mascoFetch[i]._id,
		matchArray = Rpt.find({cleanTitle: cleanMascoTitle }).fetch();

		console.log('found ' + matchArray.length + ' RPT items matching '+ cleanMascoTitle);

		for (var j = matchArray.length - 1; j >= 0; j--) {
			Rpt.update({_id: matchArray[j]._id }, 
				{
					$push: { 
						mascoTitleMatchFive: id 
					}
				}
			);

			console.log('Found an exact match: '+ matchArray[j]._id);
		}
	}
};

/// rep/masco4 crosswalk vs mascofour: runs through all rep cleanTitle fields, finds exact matches in RPT, then inserts all corresponding
/// masco 4 digit to RPT column repTitleMatchFour
var repTitleMatchFour = function () {
	var repFetch = Rep.find({}).fetch();

	// accepts an array of matching Rpt items and mascoCode (4-digit). Updates
	// each item in Rpt with the corresponding mascoCode

	function updateMatches(array, mascoCode) {
		var data = array;

		console.log('inside update matches');
		console.log('mascocode ' +mascoCode);

		for (var i = data.length - 1; i >= 0; i--) {

			Rpt.update({_id: data[i]._id }, 
				{
					$push: { 
						repTitleMatchFour: mascoCode 
					}
				}
			);
		}
		console.log('completed updating matches');
	}
	
	for (var i = repFetch.length - 1; i >= 0; i--) {
		
		var self = repFetch[i],
		cleanTitle = repFetch[i].cleanTitle,
		_id = repFetch[i]._id,
		id = repFetch[i].masco_4,
		matchArray = Rpt.find({cleanTitle: repFetch[i].cleanTitle }).fetch();

		updateMatches(matchArray, id);
	}
};

/// loop through all mascoFour, find tags, then find Rpt Data with at least one overlap, then update Rpt with mascoFour code
var mascoTitleTagFourWeak = function () {
	var mascoFetch = MascoFour.find({}).fetch();

	function updateMatches(array, mascoCode) {
		var data = array;

		for (var i = data.length - 1; i >= 0; i--) {
			console.log('updating Rpt _id ' +data[i]._id+ ' with masco code: '+ mascoCode + 'for mascoTitleTagFourWeak');
			
			Rpt.update({_id: data[i]._id }, 
				{
					$push: { 
						mascoTitleTagFourWeak: mascoCode 
					}
				}
			);
		}
	}

	function findMatches(tagArray) {
		return Rpt.find({ titleTags: { $in: tagArray } }).fetch();
	}
	
	for (var i = mascoFetch.length - 1; i >= 0; i--) {
		
		var self = mascoFetch[i],
		tags = mascoFetch[i].tags,
		_id = mascoFetch[i]._id,
		id = mascoFetch[i].id;

		var found = findMatches(mascoFetch[i].tags);
		updateMatches(found, mascoFetch[i].id);

	}
};

/// loop through all mascoFour, find tags, then find Rpt Data with at least one overlap, then update Rpt with mascoFour code
var mascoTitleTagFourStrong = function () {
	var mascoFetch = MascoFour.find({}).fetch();

	function updateMatches(array, mascoCode) {
		var data = array;

		for (var i = data.length - 1; i >= 0; i--) {
			console.log('updating Rpt _id ' +data[i]._id+ ' with masco code: '+ mascoCode + ' for mascoTitleTagFourStrong');
			
			Rpt.update({_id: data[i]._id }, 
				{
					$push: { 
						mascoTitleTagFourStrong: mascoCode 
					}
				}
			);
		}
	}

	// using mongo $eq to select for strong equality on array match
	function findMatches(tagArray) {
		return Rpt.find({ titleTags: { $eq: tagArray } }).fetch();
	}
	

	for (var i = mascoFetch.length - 1; i >= 0; i--) {
		
		var self = mascoFetch[i],
		tags = mascoFetch[i].tags,
		_id = mascoFetch[i]._id,
		id = mascoFetch[i].id;

		var found = findMatches(mascoFetch[i].tags);
		updateMatches(found, mascoFetch[i].id);

	}
};

/// loop through all mascoFour, find tags, then find Rpt Data with at least one overlap, then update Rpt with mascoFour code
var mascoTitleTagFiveWeak = function () {
	var mascoFetch = MascoFive.find({}).fetch();

	function updateMatches(array, mascoCode) {
		var data = array;

		for (var i = data.length - 1; i >= 0; i--) {
			console.log('updating Rpt _id ' +data[i]._id+ ' with masco code: '+ mascoCode + 'for mascoTitleTagFiveWeak');
			
			Rpt.update({_id: data[i]._id }, 
				{
					$push: { 
						mascoTitleTagFiveWeak: mascoCode 
					}
				}
			);
		}
	}

	function findMatches(tagArray) {
		return Rpt.find({ titleTags: { $in: tagArray } }).fetch();
	}
	
	for (var i = mascoFetch.length - 1; i >= 0; i--) {
		
		var self = mascoFetch[i],
		tags = mascoFetch[i].tags,
		_id = mascoFetch[i]._id,
		id = mascoFetch[i].id;

		var found = findMatches(mascoFetch[i].tags);
		updateMatches(found, mascoFetch[i].id);

	}
};

/// loop through all mascoFour, find tags, then find Rpt Data with at least one overlap, then update Rpt with mascoFour code
var mascoTitleTagFiveStrong = function () {
	var mascoFetch = MascoFive.find({}).fetch();

	function updateMatches(array, mascoCode) {
		var data = array;

		for (var i = data.length - 1; i >= 0; i--) {
			console.log('updating Rpt _id ' +data[i]._id+ ' with masco code: '+ mascoCode + ' for mascoTitleTagFiveStrong');
			
			Rpt.update({_id: data[i]._id }, 
				{
					$push: { 
						mascoTitleTagFiveStrong: mascoCode 
					}
				}
			);
		}
	}

	// using mongo $eq to select for strong equality on array match
	function findMatches(tagArray) {
		return Rpt.find({ titleTags: { $eq: tagArray } }).fetch();
	}
	

	for (var i = mascoFetch.length - 1; i >= 0; i--) {
		
		var self = mascoFetch[i],
		tags = mascoFetch[i].tags,
		_id = mascoFetch[i]._id,
		id = mascoFetch[i].id;

		var found = findMatches(mascoFetch[i].tags);
		updateMatches(found, mascoFetch[i].id);

	}
};

/// loop through all mascoFour, find tags, then find Rpt Data with at least one overlap, then update Rpt with mascoFour code
var repTitleTagFourWeak = function () {
	var keyFetch = Rep.find({}).fetch();

	function updateMatches(array, mascoCode) {
		var data = array;

		for (var i = data.length - 1; i >= 0; i--) {
			console.log('updating Rpt _id ' +data[i]._id+ ' with masco code: '+ mascoCode + 'for repTitleTagFourWeak');
			
			Rpt.update({_id: data[i]._id }, 
				{
					$push: { 
						repTitleTagFourWeak: mascoCode 
					}
				}
			);
		}
	}

	function findMatches(tagArray) {
		return Rpt.find({ titleTags: { $in: tagArray } }).fetch();
	}
	
	for (var i = keyFetch.length - 1; i >= 0; i--) {
		
		var self = keyFetch[i],
		tags = keyFetch[i].titleTags,
		_id = keyFetch[i]._id,
		id = keyFetch[i].masco_4;

		var found = findMatches(keyFetch[i].titleTags);
		updateMatches(found, keyFetch[i].masco_4);

	}
};

/// loop through all mascoFour, find tags, then find Rpt Data with at strict equality on titleTags
var repTitleTagFourStrong = function () {
	var keyFetch = Rep.find({}).fetch();

	function updateMatches(array, mascoCode) {
		var data = array;

		for (var i = data.length - 1; i >= 0; i--) {
			console.log('updating Rpt _id ' +data[i]._id+ ' with masco code: '+ mascoCode + 'for repTitleTagFourStrong');
			
			Rpt.update({_id: data[i]._id }, 
				{
					$push: { 
						repTitleTagFourStrong: mascoCode 
					}
				}
			);
		}
	}

	function findMatches(tagArray) {
		return Rpt.find({ titleTags: { $eq: tagArray } }).fetch();
	}
	
	for (var i = keyFetch.length - 1; i >= 0; i--) {
		
		var self = keyFetch[i],
		tags = keyFetch[i].titleTags,
		_id = keyFetch[i]._id,
		id = keyFetch[i].masco_4;

		var found = findMatches(keyFetch[i].titleTags);
		updateMatches(found, keyFetch[i].masco_4);

	}
};

Meteor.methods({
	// done
	cleanMascoFour: function() {
		cleanMascoFour();
	},
	// done
	cleanMascoFive: function() {
		cleanMascoFive();
	},
	// done
	cleanRpt: function() {
		cleanRpt();
	},
	// done
	cleanRep: function() {
		cleanRep();
	},
	// done
	mascoTitleMatchFour: function() {
		mascoTitleMatchFour();
	},
	// done
	mascoTitleMatchFive: function() {
		mascoTitleMatchFive();
	},
	// done
	repTitleMatchFour: function() {
		repTitleMatchFour();
	},
	// done
	mascoTitleTagFiveWeak: function() {
		mascoTitleTagFiveWeak();
	},
	// done
	mascoTitleTagFiveStrong: function() {
		mascoTitleTagFiveStrong();
	},
	// done
	mascoTitleTagFourWeak: function() {
		mascoTitleTagFourWeak();
	},
	// done
	mascoTitleTagFourStrong: function() {
		mascoTitleTagFourStrong();
	},
	// done
	repTitleTagFourWeak: function() {
		repTitleTagFourWeak();
	},
	// done
	repTitleTagFourStrong: function() {
		repTitleTagFourStrong();
	}
});


// // rpt post-analysis step 1
// partialTagMatchStrong: function() {
// 	partialTagMatchStrong();
// },
// // rpt post-analysis step 1
// partialTagMatchWeak: function() {
// 	partialTagMatchWeak();
// },
// // rpt post-analysis step 1
// partialTagMatchWeakest: function() {
// 	partialTagMatchWeakest();
// }
// var resetAllTitleMatches = function () {

// 	Rpt.update({}, 
// 		{
// 			mascoTitleMatchThree: null
// 		}
// 	);
// 	Rpt.update({}, 
// 		{
// 			mascoTitleMatchFour: null
// 		}
// 	);
// 	Rpt.update({}, 
// 		{
// 			mascoTitleMatchFive: null
// 		}
// 	);
// };


// /// -------------------------Exact matches for masco 3, 4, and 5 i.e. "chief executive officer"-------------- ////
// var mascoTitleMatchThree = function () {
// 	var mascoFetch = MascoThree.find({}).fetch();
	
// 	for (var i = mascoFetch.length - 1; i >= 0; i--) {
// 		var self = mascoFetch[i],
// 		cleanMascoTitle = self.cleanTitle,
// 		_id = self._id,
// 		id = self.id,
// 		matchArray = Rpt.find({cleanTitle: cleanMascoTitle }).fetch();

// 		console.log('found ' + matchArray.length + ' RPT items matching '+ cleanMascoTitle);

// 		for (var j = matchArray.length - 1; j >= 0; j--) {
// 			Rpt.update({_id: matchArray[j]._id }, 
// 				{
// 					$push: { 
// 						mascoTitleMatchThree: id 
// 					}
// 				}
// 			);

// 			console.log('Found an exact match: '+ matchArray[j]._id);
// 		}
// 	}
// };
// var rptData = Rpt.find({}).fetch();

// for (var i = rptData.length - 1; i >= 0; i--) {
// 	var self = rptData[i],
// 	tags = self.titleTags,
// 	_id = self._id,
// 	testArray = [];

// 	for (var j = tags.length - 1; j >= 0; j--) {
// 		var thisTag = tags[j];

// 		testArray.push(tags[j]);
// 	}
// 	console.log('testArray', testArray);

// 	var matchArray = MascoFour.find({ tags: { $in: testArray } } ).fetch();

// 	for (var k = matchArray.length - 1; k >= 0; k--) {
// 		Rpt.update({_id: _id }, 
// 			{
// 				$push: { 
// 					fullTagMatch: matchArray[k].id
// 				}
// 			}
// 		);
// 	}

// 	console.log('matchArray', matchArray);
// }

/// -------------------------partialTagMatchStrong-------------- ////
// var partialTagMatchStrong = function () {
// 	var rptData = Rpt.find({}).fetch();
	
// 	for (var i = rptData.length - 1; i >= 0; i--) {
// 		var self = rptData[i],
// 		tags = self.titleTags,
// 		_id = self._id,
// 		testArray = [];

// 		for (var j = tags.length - 1; j >= 0; j--) {
// 			var thisTag = tags[j];

// 			testArray.push(tags[j]);
// 		}
// 		console.log('testArray', testArray);

// 		var matchArray = MascoFour.find({ tags: { $in: testArray } } ).fetch();

// 		for (var k = matchArray.length - 1; k >= 0; k--) {
// 			Rpt.update({_id: _id }, 
// 				{
// 					$push: { 
// 						partialTagMatchStrong: matchArray[k].id
// 					}
// 				}
// 			);
// 			console.log('strongMatchFound', _id);
// 		}

// 	}
// };

// /// -------------------------partialTagMatchWeakest-------------- ////
// // var partialTagMatchWeakest = function () {
// // 	var rptData = Rpt.find({}).fetch();
	
// // 	for (var i = rptData.length - 1; i >= 0; i--) {
// // 		var self = rptData[i],
// // 		tags = self.titleTags,
// // 		_id = self._id,
// // 		testArray = [];

// // 		for (var j = tags.length - 1; j >= 0; j--) {
// // 			var test = [];
// // 			var thisTag = tags[j];
// // 			console.log('thisTag' + thisTag);
// // 			test.push(thisTag);
			
// // 			var matchArray = MascoFour.find({ tags: { $in: test } } ).fetch();

// // 			for (var k = matchArray.length - 1; k >= 0; k--) {
// // 				Rpt.update({_id: _id }, 
// // 					{
// // 						$push: { 
// // 							partialTagMatchWeakest: matchArray[k].id
// // 						}
// // 					}
// // 				);

// // 				console.log('partialTagMatchWeakest', _id);

// // 			}
// // 		}
// // 	}
// // };