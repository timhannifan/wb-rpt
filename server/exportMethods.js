Meteor.methods({
	exportAllRpt: function() {		
		var fields = [
			"id",
			"occ_title",
			"clean_title"
		];
 
		var data = [];		
 
		var rows = Rpt.find().fetch();
		_.each(rows, function(c) {
			data.push([
				c.id,
				c.occ_title,
				c.cleanTitle,
			]);
		});
 
		return {fields: fields, data: data};
	}	
});