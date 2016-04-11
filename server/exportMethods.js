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
		var jsonData, csvData, fullData;
		
		fullData = Rpt.find({titleIntersectionDetail: {$exists: true}}).fetch();

		jsonData = [];

		function pushData(data, userId){
			var pushThese = data;

			for (var i = 0; i < pushThese.length; i++) {
				pushThese[i].userId = userId;
				// for (var attrname in pushThese[i]) { 
				// 	// console.log(attrname);
				// }
				// console.dir(pushThese[i]);
				jsonData.push(pushThese[i]);
			}
		}
		if (fullData) {
			for (var i = 0; i < fullData.length; i++) {
				//array of objects
				var percents = fullData[i].titleIntersectionDetail;
				var userId = fullData[i].id;

				if (percents && userId){
					pushData(percents, userId);				
				}
			}
			return jsonData;
		}
	},
	exportPercentDescription: function() {	
		console.log('exportPercentDescription called');
		var jsonData, csvData, fullData;
		
		fullData = Rpt.find({percentMatchDescKeywords: {$exists: true}}).fetch();

		jsonData = [];

		function pushData(data, userId){
			var pushThese = data;

			for (var i = 0; i < pushThese.length; i++) {
				pushThese[i].userId = userId;
				// for (var attrname in pushThese[i]) { 
				// 	// console.log(attrname);
				// }
				// console.dir(pushThese[i]);
				jsonData.push(pushThese[i]);
			}
		}

		if (fullData) {
			for (var i = 0; i < fullData.length; i++) {
				//array of objects
				var percents = fullData[i].percentMatchDescKeywords;
				var userId = fullData[i].id;

				if (percents && userId){
					pushData(percents, userId);				
				}
			}
			return jsonData;
		}
	},
	// exportPercentDescription: function() {
	// 	return [];
	// },
	// exportPercentTitle: function() {
	// 	return [];
	// },
	exportFourTitleStrong: function() {
		console.log('exportFourTitleStrong called');
		var jsonData, csvData, fullData;
		fullData = Rpt.find({mascoTitleTagFourStrong: {$exists: true}}).fetch();
		jsonData = [];
		if (fullData) {
			for (var i = 0; i < fullData.length; i++) {
				jsonData.push({
					mascoTitleTagFourStrong: fullData[i].mascoTitleTagFourStrong,
					id: fullData[i].id
				});
			}
			return jsonData;
		}	
	},		
	exportFiveTitleStrong: function() {
		console.log('exportFiveTitleStrong called');
		var jsonData, csvData, fullData;
		fullData = Rpt.find({mascoTitleTagFiveStrong: {$exists: true}}).fetch();
		jsonData = [];
		if (fullData) {
			for (var i = 0; i < fullData.length; i++) {
				jsonData.push({
					rptId: fullData[i].id,
					mascoTitleTagFiveStrong: fullData[i].mascoTitleTagFiveStrong,
					mascoFiveStrongMatch: fullData[i].mascoFiveStrongMatch 

				});
			}
			//array of objects
			return jsonData;
		}			
		
	},			
	// exportRepTitleStrong: function() {
	// 	console.log('exportFiveTitleStrong called');
	// 	var jsonData, csvData, fullData;
	// 	fullData = Rpt.find({repTitleTagMatchStrong: {$exists: true}}).fetch();
	// 	jsonData = [];

	// 	for (var i = 0; i < fullData.length; i++) {
	// 		jsonData.push({
	// 			rptId: fullData[i].id,
	// 			repTitleTagMatchStrong: fullData[i].repTitleTagMatchStrong,
	// 			repTitleTagMatch: fullData[i].repTitleTagMatch,

	// 		});
	// 	}
	// 	//array of objects
	// 	return jsonData;					
	// },			
	exportRepTitleStrong: function() {
		console.log('exportRepTitleStrong called');
		var jsonData, csvData, fullData;
		
		fullData = Rpt.find({repTitleTagMatchStrong: {$exists: true}}).fetch();

		jsonData = [];

		function pushData(data, userId){
			var pushThese = data;

			for (var i = 0; i < pushThese.length; i++) {
				pushThese[i].userId = userId;
				// for (var attrname in pushThese[i]) { 
				// 	// console.log(attrname);
				// }
				// console.dir(pushThese[i]);
				jsonData.push(pushThese[i]);
			}
		}

		if (fullData) {
			for (var i = 0; i < fullData.length; i++) {
				//array of objects
				var arrayObjects = fullData[i].repTitleTagMatchStrong;
				var userId = fullData[i].id;

				if (arrayObjects && userId){
					pushData(arrayObjects, userId);				
				}
			}
			return jsonData;
		}
	},		
	exportTitleInKeywords: function() {
		console.log('exportTitleInKeywords called');
		var jsonData, csvData, fullData;
		
		fullData = Rpt.find({titleInKeywords: {$exists: true}}).fetch();

		jsonData = [];

		function callback(data, userId){
			var pushThese = data;

			for (var i = 0; i < pushThese.length; i++) {
				pushThese[i].userId = userId;
				// for (var attrname in pushThese[i]) { 
				// 	// console.log(attrname);
				// }
				// console.dir(pushThese[i]);
				jsonData.push(pushThese[i]);
			}
		}

		function getSorted(unsortedArray){
			function count(arr) { // count occurances
			    var o = {}, i;
			    for (i = 0; i < arr.length; ++i) {
			        if (o[arr[i]]) ++o[arr[i]];
			        else o[arr[i]] = 1;
			    }
			    return o;
			}

			function weight(arr_in) { // unique sorted by num occurances
			    var o = count(arr_in),
			        arr = [], i;
			    for (i in o) arr.push({masco4: +i, frequency: o[i]}); // fast unique only
			    arr.sort(function (a, b) {
			        return a.frequency < b.frequency;
			    });
				// console.log(arr);
			    return arr;
			}

			return weight(unsortedArray);	
		}
		if (fullData) {
			for (var i = 0; i < fullData.length; i++) {
				//array of objects
				var unsortedArray = fullData[i].titleInKeywords,
				userId = fullData[i].id;

				if (unsortedArray && userId){
					callback(getSorted(unsortedArray), userId);
				}
			}
			
			return jsonData;
		}
	},		
	exportMasco4: function() {
		console.log('exportMasco4 called');
		var jsonData, csvData, fullData;
		
		fullData = MascoFour.find({}).fetch();

		jsonData = [];

		if (fullData) {
			for (var i = 0; i < fullData.length; i++) {
				//array of objects
				jsonData.push(fullData[i]);
			}
			
			return jsonData;		
		}
	},		
	exportMasco5: function() {
		console.log('exportMasco5 called');
		var jsonData, csvData, fullData;
		
		fullData = MascoFive.find({}).fetch();

		jsonData = [];

		if (fullData) {
			for (var i = 0; i < fullData.length; i++) {
				//array of objects
				jsonData.push(fullData[i]);
			}
			
			return jsonData;		
		}
	},		
	exportMascoKey: function() {
		console.log('exportMascoKey called');
		var jsonData, csvData, fullData;
		
		fullData = MascoKey.find({}).fetch();

		jsonData = [];

		if (fullData) {
			for (var i = 0; i < fullData.length; i++) {
				//array of objects
				jsonData.push(fullData[i]);
			}
			
			return jsonData;		
		}
	},		
	exportRep: function() {
		console.log('exportRep called');
		var jsonData, csvData, fullData;
		
		fullData = Rep.find({}).fetch();

		jsonData = [];

		if (fullData) {
			for (var i = 0; i < fullData.length; i++) {
				//array of objects
				jsonData.push(fullData[i]);
			}
			
			return jsonData;		
		}
	},		
	exportTitleEqualsTitle: function() {
		console.log('exportTitleEqualsTitle called');
		var jsonData, csvData, fullData;
		fullData = Rpt.find({titleEqTitle: {$exists: true}}).fetch();
		jsonData = [];
		if (fullData) {
			for (var i = 0; i < fullData.length; i++) {
				jsonData.push({
					rptId: fullData[i].id,
					titleEqTitle: fullData[i].titleEqTitle
				});
			}
			//array of objects
			return jsonData;			
		}
	}		
});