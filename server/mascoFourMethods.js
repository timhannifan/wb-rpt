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
		return Rpt.find({ cleanTagsOnly: { $in: tagArray } }).fetch();
	}
	
	for (var i = mascoFetch.length - 1; i >= 0; i--) {
		
		var self = mascoFetch[i],
		tags = mascoFetch[i].tagsOnly,
		_id = mascoFetch[i]._id,
		id = mascoFetch[i].id;

		var found = findMatches(tags);
		updateMatches(found, id);

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
		return Rpt.find({ cleanTagsOnly: {  $all: tagArray } }).fetch();
	}
	
	for (var i = mascoFetch.length - 1; i >= 0; i--) {
		
		var self = mascoFetch[i],
		tags = mascoFetch[i].tagsOnly,
		_id = mascoFetch[i]._id,
		id = mascoFetch[i].id;

		var found = findMatches(tags);
		updateMatches(found, id);

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
		return Rpt.find({ cleanTagsOnly: { $in: tagArray } }).fetch();
	}
	
	for (var i = mascoFetch.length - 1; i >= 0; i--) {
		
		var self = mascoFetch[i],
		tags = mascoFetch[i].tagsOnly,
		_id = mascoFetch[i]._id,
		id = mascoFetch[i].mapToFour;

		var found = findMatches(tags);
		updateMatches(found, id);

	}
};

/// loop through all mascoFour, find tags, then find Rpt Data with at least one overlap, then update Rpt with mascoFour code
var mascoTitleTagFiveStrong = function () {
	console.log('inside fivestrong');
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
		return Rpt.find({ cleanTagsOnly: {  $all: tagArray } }).fetch();
	}
	

	for (var i = mascoFetch.length - 1; i >= 0; i--) {
		
		var self = mascoFetch[i],
		tags = mascoFetch[i].tagsOnly,
		_id = mascoFetch[i]._id,
		id = mascoFetch[i].mapToFour;

		var found = findMatches(tags);
		updateMatches(found, id);

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
	};

	function findMatches(tagArray) {
		return Rpt.find({ cleanTagsOnly: { $in: tagArray } }).fetch();
	};
	
	for (var i = keyFetch.length - 1; i >= 0; i--) {
		
		var self = keyFetch[i],
		tags = keyFetch[i].tagsOnly,
		_id = keyFetch[i]._id,
		id = keyFetch[i].mapToFour;

		var found = findMatches(tags);
		updateMatches(found, id);

	}
};

/// loop through all mascoFour, find tags, then find Rpt Data with at strict equality on titleTags
var repTitleTagFourStrong = function () {
	var keyFetch = Rep.find({}).fetch();

	function updateMatches(array, mascoCode) {
		var data = array,
		code = mascoCode;

		if(data && code) {
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


	};

	function findMatches(tagArray) {
		return Rpt.find({ cleanTagsOnly: {  $all: tagArray } }).fetch();
	};
	
	for (var i = keyFetch.length - 1; i >= 0; i--) {
		
		var self = keyFetch[i],
		tags = keyFetch[i].tagsOnly,
		_id = keyFetch[i]._id,
		id = keyFetch[i].mapToFour;

		var found = findMatches(tags);
		updateMatches(found, id);

	}
};

Meteor.methods({
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