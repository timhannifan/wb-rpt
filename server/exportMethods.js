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
			"titleTagsWOTitle",
			"descTags"	
		];
 
		var data = [];		
 
		var rows = Rpt.find().fetch();
		
		_.each(rows, function(obj) {
			// console.log(obj);
			data.push([
				obj.id,
				obj.cleanTitle,
				obj.cleanDesc,
				obj.tagsOnly,
				obj.descTags,
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
		
		fullData = Rpt.find({descIntersectionDetail: {$exists: true}}).fetch();

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
				var percents = fullData[i].descIntersectionDetail;
				var userId = fullData[i].id;

				if (percents && userId){
					pushData(percents, userId);				
				}
			}
			return jsonData;
		}
	},
	exportFourTitleStrong: function() {
		console.log('exportFourTitleStrong called');
		var jsonData, csvData, fullData;
		fullData = Rpt.find({mascoTitleTagFourStrong: {$ne: []}}).fetch();
		jsonData = [];
		if (fullData) {
			for (var i = 0; i < fullData.length; i++) {
				jsonData.push({
					rptId: fullData[i].id,
					masco: fullData[i].mascoTitleTagFourStrong
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
					masco: fullData[i].mascoTitleTagFiveStrong,
					masco5: fullData[i].mascoFiveStrongMatch 

				});
			}
			//array of objects
			return jsonData;
		}			
		
	},						
	exportRepTitleStrong: function() {
		console.log('exportRepTitleStrong called');
		var jsonData, csvData, fullData;
		
		fullData = Rpt.find({repTitleTagMatchStrong: {$exists: true}}).fetch();

		jsonData = [];

		function wrangleArray(data, rptId){
			var pushThese = data;

			for (var i = 0; i < pushThese.length; i++) {
				var self = pushThese[i];

				var itemDetail = {}
				itemDetail.rptId = rptId;
				itemDetail.rep_masco = self.mascoCode;
				itemDetail.rep_id = self.repTitleTagMatch;
				// console.log(self);
				// console.log(itemDetail);
				
				jsonData.push(itemDetail);
			}
		}
		if (fullData) {
			for (var i = 0; i < fullData.length; i++) {
				wrangleArray(fullData[i].repTitleTagMatchStrong, fullData[i].id);
			}

			return jsonData;
		}
	},		
	exportTitleInKeywords: function() {
		console.log('exportTitleInKeywords called');
		var jsonData, csvData, fullData;
		
		fullData = Rpt.find({titleInKeywords: {$exists: true}}).fetch();

		jsonData = [];
		function wrangleArray(data, rptId){
			var pushThese = data;

			for (var i = 0; i < pushThese.length; i++) {
				var self = pushThese[i];

				var itemDetail = {}
				itemDetail.rptId = rptId;
				itemDetail.masco_4 = self.id;
				// console.log(self);
				// console.log(itemDetail);
				
				jsonData.push(itemDetail);
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
			    for (i in o) arr.push({id: +i, frequency: o[i]}); // fast unique only
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
				wrangleArray(getSorted(fullData[i].titleInKeywords), fullData[i].id);
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