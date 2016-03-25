Meteor.methods({
	exportAllRpt: function() {		
		var fields = [
			"id",
			"occ_title",
			"sector",
			"clean_title",
			"mascoTitleExactMatch"

		];
 
		var data = [];		
 
		var rows = Rpt.find().fetch();
		_.each(rows, function(c) {
			data.push([
				c.id,
				c.occ_title,				
				c.cleanTitle,
				c.mascoTitleExactMatch,
			]);
		});
 
		return {fields: fields, data: data};
	}	
});