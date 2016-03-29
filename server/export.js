Meteor.methods({
	exportAllRpt: function() {		
		var fields = [
			"id",
			"occ_title",
			"sector",
			"clean_title",
			"mascoTitleMatchThree",
			"mascoTitleMatchFour",
			"mascoTitleMatchFive",
			"repTitleMatch",
			"fullTagMatch",
			"partialTagMatchWeakest",

		];
 
		var data = [];		
 
		var rows = Rpt.find().fetch();
		_.each(rows, function(c) {
			data.push([
				c.id,
				c.occ_title,				
				c.cleanTitle,
				c.mascoTitleMatchThree,
				c.mascoTitleMatchFour,
				c.mascoTitleMatchFive,
				c.repTitleMatch,
				c.fullTagMatch,
				c.partialTagMatchWeakest
			]);
		});
 
		return {fields: fields, data: data};
	}	
});