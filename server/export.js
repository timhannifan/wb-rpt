Meteor.methods({
	exportAllRpt: function() {		
		var fields = [
			"id",
			"occ_title",
			"clean_title",
			"titleTags",
			"mascoTitleMatchFour",
			"mascoTitleMatchFive",
			"repTitleMatchFour",
			"mascoTitleTagFourWeak",
			"mascoTitleTagFourStrong",
			"mascoTitleTagFiveWeak",
			"mascoTitleTagFiveStrong",
			"repTitleTagFourWeak",
			"repTitleTagFourStrong"
		];
 
		var data = [];		
 
		var rows = Rpt.find().fetch();
		_.each(rows, function(c) {
			data.push([
				c.id,
				c.occ_title,
				c.cleanTitle,
				c.titleTags,
				c.mascoTitleMatchFour,
				c.mascoTitleMatchFive,
				c.repTitleMatchFour,
				c.mascoTitleTagFourWeak,
				c.mascoTitleTagFourStrong,
				c.mascoTitleTagFiveWeak,
				c.mascoTitleTagFiveStrong,
				c.repTitleTagFourWeak,
				c.repTitleTagFourStrong			
			]);
		});
 
		return {fields: fields, data: data};
	}	
});