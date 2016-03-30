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
		yakiTitleTags = Yaki(self.occ_title).extract(),
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
		title = self.job1_position,
		id = self._id,
		yakiTitleTags = Yaki(title).extract(),
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
		cleanMascoTitle = self.cleanTitle,
		id = self.id,
		_id = self._id,
		matchArray = Rpt.find({cleanTitle: cleanMascoTitle }).fetch();

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
		cleanMascoTitle = self.cleanTitle,
		id = self.id,
		_id = self._id,
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

/// rep/masco4 crosswalk vs mascofive
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

		

		updateMatches(matchArray, id);// console.log('self', self);
		// console.log('cleanTitle', cleanTitle);

		// console.log('matcharray count', matchArray.length);

		// console.log('found ' + matchArray.length + ' items matching REP title: '+ repFetch[i].cleanTitle);

		// for (var j = matchArray.length - 1; j >= 0; j--) {

		// }
	}
};

/// -------------------------overlapping tag match: n = 2-------------- ////
var fullTagMatch = function () {
	var rptData = Rpt.find({}).fetch();
	
	for (var i = rptData.length - 1; i >= 0; i--) {
		var self = rptData[i],
		tags = self.titleTags,
		_id = self._id,
		testArray = [];

		for (var j = tags.length - 1; j >= 0; j--) {
			var thisTag = tags[j];

			testArray.push(tags[j]);
		}
		console.log('testArray', testArray);

		var matchArray = MascoFour.find({ tags: { $in: testArray } } ).fetch();

		for (var k = matchArray.length - 1; k >= 0; k--) {
			Rpt.update({_id: _id }, 
				{
					$push: { 
						fullTagMatch: matchArray[k].id
					}
				}
			);
		}

		console.log('matchArray', matchArray);
	}
};

/// -------------------------partialTagMatchStrong-------------- ////
var partialTagMatchStrong = function () {
	var rptData = Rpt.find({}).fetch();
	
	for (var i = rptData.length - 1; i >= 0; i--) {
		var self = rptData[i],
		tags = self.titleTags,
		_id = self._id,
		testArray = [];

		for (var j = tags.length - 1; j >= 0; j--) {
			var thisTag = tags[j];

			testArray.push(tags[j]);
		}
		console.log('testArray', testArray);

		var matchArray = MascoFour.find({ tags: { $in: testArray } } ).fetch();

		for (var k = matchArray.length - 1; k >= 0; k--) {
			Rpt.update({_id: _id }, 
				{
					$push: { 
						partialTagMatchStrong: matchArray[k].id
					}
				}
			);
			console.log('strongMatchFound', _id);
		}

	}
};
// /// -------------------------partialTagMatchWeak------------- ////
// var partialTagMatchWeak = function () {
// 	var rptData = Rpt.find({}).fetch();
	
// 	for (var i = rptData.length - 1; i >= 0; i--) {
// 		var self = rptData[i],
// 		tags = self.titleTags,
// 		_id = self._id,
// 		testArray = [];

// 		// removing one elment from the
// 		for (var j = tags.length - 1; j >= 0; j--) {
// 				var thisTag = tags[j];

// 				testArray.push(tags[j]);
// 				for (var k = tags.length - 2; k >= 0; k--) {
// 					testArray.push(tags[k]);
// 				}
// 		}
// 		console.log('testArray from matchWeak', testArray);

// 		var matchArray = MascoFour.find({ tags: { $in: testArray } } ).fetch();

// 		for (var k = matchArray.length - 1; k >= 0; k--) {
// 			Rpt.update({_id: _id }, 
// 				{
// 					$push: { 
// 						partialTagMatchweak: matchArray[k].id
// 					}
// 				}
// 			);

// 		}



// 	}
// };
/// -------------------------partialTagMatchWeakest-------------- ////
var partialTagMatchWeakest = function () {
	var rptData = Rpt.find({}).fetch();
	
	for (var i = rptData.length - 1; i >= 0; i--) {
		var self = rptData[i],
		tags = self.titleTags,
		_id = self._id,
		testArray = [];

		for (var j = tags.length - 1; j >= 0; j--) {
			var test = [];
			var thisTag = tags[j];
			console.log('thisTag' + thisTag);
			test.push(thisTag);
			
			var matchArray = MascoFour.find({ tags: { $in: test } } ).fetch();

			for (var k = matchArray.length - 1; k >= 0; k--) {
				Rpt.update({_id: _id }, 
					{
						$push: { 
							partialTagMatchWeakest: matchArray[k].id
						}
					}
				);

				console.log('partialTagMatchWeakest', _id);

			}
		}
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

	fullTagMatchFour: function() {
		fullTagMatch();
	},
	// rpt post-analysis step 1
	partialTagMatchStrong: function() {
		partialTagMatchStrong();
	},
	// rpt post-analysis step 1
	partialTagMatchWeak: function() {
		partialTagMatchWeak();
	},
	// rpt post-analysis step 1
	partialTagMatchWeakest: function() {
		partialTagMatchWeakest();
	}
});

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
