function cleanUp(string) {
  return string.replace(/\0/g,' ')
                .replace(/\W/g,' ')
                .replace(/\s\s/g,' ')
                .toLowerCase()
                .trim();
}
function yakiSplitClean(string) {
  return Yaki(string).split().clean();
}

Meteor.methods({
/////
insertRpt: function( data) {
  check( data, Array );

  for ( i = 0; i < data.length; i++ ) {
    item   = data[ i ],
    exists = Rpt.findOne({id: data.id});
    
    if( exists ){
    	console.log('Found a RPT with matching id. Skipping this item.');
    } else {
    	console.log('Found a new RPT item. Creating original record...');
    	var item = {};
    	item.id = data[ i ].id;
    	item.occ_title = data[ i ].occ_title;
    	item.occ_desc = data[ i ].occ_desc;
    	item.firm_name = data[ i ].firm_name;
    	item.sector = data[ i ].sector;

    	Rpt.insert(item, function(err,res) {
    		if (err) {console.log(err)} else {console.log('RPT create successfull')}
    	});
    }
    
  }
}

});

Rpt.after.insert(function (userId, doc) {
	//// ADDING CLEANTITLE, MAPTOFOUR, KEYWORDS TO TITLETAGS AND TAGSONLY
		Rpt.update({_id: this._id}, {$set: 
		{
			cleanTitle: cleanUp(doc.occ_title),
			cleanDesc: cleanUp(doc.occ_desc),
			cleanSector: cleanUp(doc.sector),
			titleTags: _.uniq(yakiSplitClean(cleanUp(doc.occ_title))),
			tagsOnly: _.uniq(yakiSplitClean(cleanUp(doc.occ_title))),
			descTags: _.uniq(yakiSplitClean(cleanUp(doc.occ_desc))),
		}
	}, function (err,res) {
		if (err) {console.log(err)} else {console.log('RPT update successful')}
	});
});

Rpt.after.update(function (userId, doc, fieldNames, modifier, options) {
	if(!doc.titleTagBool) {
		Rpt.update({_id: doc._id}, {
			$push: {
				titleTags: doc.cleanTitle,
			},
			$set: {
				titleTagBool: 1
			}
		}, function (err,res) {
			if (err) {console.log(err)} else {console.log('titleTags updated successfully')}
		});		
	}
}, {fetchPrevious: false});

// Rpt.after.update(function (userId, doc, fieldNames, modifier, options) {
// 	if(doc.titleTagBool && !doc.titleIntersectionComplete) {

// 		var matches = MascoKey.find({$in: {keywords:doc.titleTags}}, {sort: {officialCode: 1}});

// 		matches.forEach(function (match) {
// 			var theseKeywords = match.keywords;
// 			var thisMascoCode = match.officialCode;
// 		  var mascoKeywordLength = match.keywords.length;

// 		  var rptTarget = doc.titleTags;
// 		  var rptArrayLength = doc.titleTags.length;


// 		  var intersectionValue = _.intersection(theseKeywords,rptTarget);

// 		  Rpt.update({_id: doc._id}, {
// 		  	$push: {
// 		  	  percentMatchTitleKeywords: {
// 		  	    mascoCode: thisMascoCode,
// 		  	    rptArrayLength: rptArrayLength,
// 		  	    mascoKeywordLength: mascoKeywordLength,
// 		  	    intersectionValue: intersectionValue,
// 		  	    percentVsMascoSize: intersectionValue.length/mascoKeywordLength,
// 		  	    percentVsRptSize: intersectionLength.length/rptArrayLength
// 		  	  }
// 		  	}
// 		  }, function (err,res) {
// 		  	if (err) {console.log(err)} else {console.log('TITLE INTERSECTION COMPLETED SUCCESSFULLY')}
// 		  });
// 		});

// 		Rpt.update({_id: doc._id}, {
// 			$set: {
// 				titleIntersectionComplete: 1
// 			}
// 		}, function (err,res) {
// 			if (err) {console.log(err)} else {console.log('titleTags updated successfully')}
// 		});
// 	}
// }, {fetchPrevious: false});