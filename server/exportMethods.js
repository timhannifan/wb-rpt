// "id",
// "cleanTitle",
// "cleanDesc",
// "cleanTagsOnly",
// "cleanDescTags",
// "repTitleTagMatchStrong",
// "titleEqTitle",
// "titleInKeywords",
// "percentMatchTitleKeywords",
// "percentMatchDescKeywords",
// "mascoTitleTagFourStrong",
// "mascoTitleTagFourWeak",
// "mascoTitleTagFiveStrong",
// "mascoTitleTagFiveWeak",
// "repTitleTagMatchStrong",
// "repTitleTagMatchWeak"	

Meteor.methods({
	exportAllRpt: function() {		
		var fields = [
			"id",
			"cleanTitle",
			"cleanDesc",
			"cleanTagsOnly",
			"cleanDescTags",
			"sector"
			// "titleEqTitle",
			// "titleInKeywords",
		];
 
		var data = [];		
 
		var rows = Rpt.find().fetch();
		
		_.each(rows, function(obj) {
			// console.log(obj);
			data.push([
				obj.id,
				obj.cleanTitle,
				obj.cleanDesc,
				obj.cleanTagsOnly,
				obj.cleanDescTags,
				obj.titleEqTitle,
				obj.titleInKeywords,
				obj.sector,
			]);
		});
 
		return {fields: fields, data: data};
	},
	exportPercentTitle: function() {	
		console.log('exportPercentTitle called');
		
		var fields = [
			"id",
			"cleanTitle",
			"percentMatchTitleKeywords"
		];
	
		var data = [];		
	
		var rows = Rpt.find({$exists: {percentMatchTitleKeywords: true}}).fetch();
		
		_.each(rows, function(obj) {
			// console.log(obj);
			data.push([
				obj.id,
				obj.cleanTitle
			]);
			
			var intersections = obj.percentMatchTitleKeywords;
			console.log(intersections);




			// if (intersections){

			// 	_.each(intersections, function(el){
			// 		console.log(el);
			// 		var intArray = [];
			// 		intArray.push([
			// 			el.mascoCode,
			// 			el.rptArrayL,
			// 			el.intersection,
			// 			el.intersectionL,
			// 			el.mascoArrayL,
			// 			el.percentVsMascoRptSize,
			// 			el.percentVsRptSize
			// 		]);

			// 		data.push(intArray);
			// 	});
			// }	

		});
	
		return {fields: fields, data: data};
	}			
});