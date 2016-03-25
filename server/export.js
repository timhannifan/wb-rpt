Meteor.methods({
	exportAllRpt: function() {		
		var fields = [
			"id",
			"occ_title",
			"sector",
			"clean_title",
			"mascoTitleExactMatch",
			"matchMascoTitleTagsPartial0",
			"matchMascoTitleTagsPartial1",
			"matchMascoTitleTagsPartial2"
		];
 
		var data = [];		
 
		var rows = Rpt.find().fetch();
		_.each(rows, function(c) {
			data.push([
				c.id,
				c.occ_title,				
				c.cleanTitle,
				c.mascoTitleExactMatch,
				c.matchMascoTitleTagsPartial0,
				c.matchMascoTitleTagsPartial1,
				c.matchMascoTitleTagsPartial2
			]);
		});
 
		return {fields: fields, data: data};
	}	
});