var mascoFourStrings = Masco.find().fetch();
var rptDataArray = Rpt.find().fetch();
var strArr = [];

function updateMascoTags () {
	mascoFourStrings.each(function(obj){

		name = obj.Name;
		yakiTags = Yaki(name).extract();		
		Masco.update({_id: obj._id}, {$push: {tags: yakiTags}});
	});	
}

rptDataArray.each(function(obj){
	// var title = obj.occ_title;
	// var desc = obj.occ_desc;
	title = obj.occ_title;
	yakiTags = Yaki(title).extract();

	console.log(title);
	console.log(yakiTags);

	yakiTags.each(function(item) {
		Rpt.update({_id: obj._id}, {$push: 
			{ titleTags: item }
		});
	});
});


rptDataArray.each(function(obj){
	title = obj.occ_title;
	desc = obj.occ_desc;
	yakiDescTags = Yaki(desc).extract();

	console.log(title);
	console.log(yakiDescTags);
	
	yakiDescTags.each(function(item) {
		Rpt.update({_id: obj._id}, {$push: 
			{ descTags: item }
		});
	});
});

// Meteor.methods({
// 	callMethodUpdateRep: function() {
// 		updateRepTags();
// 	}
// });

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