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
function findIntersection(arg1,arg2) {
  return _.intersection(arg1,arg2);
}
function getUniq(array) {
	return _.uniq(array);
}

function runMatches(array, docId) {
	console.log('runMatches length :' +array.length);

	Rpt.update({_id: docId}, {
			$set: {
				titleIntersectionCompleteBool: 1
			}
		}, function (err,res) {
			if (err) {console.log(err)} else {console.log('-----------Finished intersection on '+ docId)}
	});

	for (var i = array.length - 1; i >= 0; i--) {
		var mascoFindOne = MascoKey.findOne({_id: array[i]});
			var rptFindOne = Rpt.findOne({_id: docId});

			console.log('mascoFindOne',mascoFindOne._id);
			console.log('rptFindOne',rptFindOne._id);

			var theseKeywords = mascoFindOne.keywords;
			var thisMascoCode = mascoFindOne.officialCode;
		  var mascoKeywordLength = mascoFindOne.keywords.length;
		  var rptTarget = rptFindOne.titleTags;
		  var rptArrayLength = rptFindOne.titleTags.length;
		  var intersectionValue = findIntersection(theseKeywords,rptTarget);

   	  Rpt.update({_id: rptFindOne._id}, {
   	  	$push: {
   	  	  percentMatchTitleKeywords: {
   	  	    mascoCode: thisMascoCode,
   	  	    rptArrayLength: rptArrayLength,
   	  	    mascoKeywordLength: mascoKeywordLength,
   	  	    intersectionValue: intersectionValue,
   	  	    percentVsMascoSize: intersectionValue.length/mascoKeywordLength,
   	  	    percentVsRptSize: intersectionValue.length/rptArrayLength
   	  	  }
   	  	}
   	  }, function (err,res) {
   	  	if (err) {console.log(err)} else {console.log('rpt update push COMPLETED SUCCESSFULLY')}
   	  });
	}
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
	if(!doc.parsingComplete) {
		Rpt.update({_id: doc._id}, {
			$push: {
				titleTags: doc.cleanTitle,
			},
			$set: {
				parsingComplete: 1
			}
		}, function (err,res) {
			if (err) {console.log(err)} else {console.log('titleTags updated successfully')}
		});		
	}

	if(doc.parsingComplete && !doc.bulkIntersectionTitleComplete) {
		var matches = MascoKey.find({keywords: {$in: doc.titleTags}}).fetch();
		var matchIdSet = [];
		for (var i = matches.length - 1; i >= 0; i--) {
			matchIdSet.push(matches[i]._id);
		}

		var uniques = _.uniq(matchIdSet);

		console.log('uniques count' + uniques.length);

		Rpt.update({_id: doc._id}, {
			$push: {
				titleIntersections: {
					$each: uniques
				}
			},
			$set: {
				bulkIntersectionTitleComplete: 1
			}
		}, function (err,res) {
			if (err) {console.log(err)} else {console.log('bulkTitle intersection done')}
		});
	}
	if(doc.parsingComplete && !doc.bulkIntersectionDescComplete) {
		var matches = MascoKey.find({keywords: {$in: doc.cleanDescTags}}).fetch();
		var matchIdSet = [];
		for (var i = matches.length - 1; i >= 0; i--) {
			matchIdSet.push(matches[i]._id);
		}

		var uniques = _.uniq(matchIdSet);

		console.log('uniques count' + uniques.length);

		Rpt.update({_id: doc._id}, {
			$push: {
				descIntersections: {
					$each: uniques
				}
			},
			$set: {
				bulkIntersectionDescComplete: 1
			}
		}, function (err,res) {
			if (err) {console.log(err)} else {console.log('bulkIntersectionDescComplete')}
		});
	}

	if(doc.parsingComplete && doc.bulkIntersectionTitleComplete && !doc.intersectionTitleDetailComplete) {

		var matches = doc.titleIntersections;
		var matchDetail = [];

		for (var i = matches.length - 1; i >= 0; i--) {
			var matchDetailItem = {};
			var matchingMasco = MascoKey.findOne({_id: matches[i]});

			matchDetailItem.mascoCode = matchingMasco.officialCode;
		  matchDetailItem.mascoKeywordLength = matchingMasco.keywords.length;
		  matchDetailItem.rptArrayLength = doc.titleTags.length;
		  matchDetailItem.intersectionValue = findIntersection(matchingMasco.keywords,doc.titleTags);
		  matchDetailItem.percentVsMascoSize = matchDetailItem.intersectionValue.length/matchingMasco.keywords.length;
		  matchDetailItem.percentVsRptSize = matchDetailItem.intersectionValue.length/doc.titleTags.length;

		  console.log('matchDetailItem '+ i, matchDetailItem);
		  matchDetail.push(matchDetailItem);
		}
		
		console.log(matchDetail.length + 'items in matchDetail array');

		Rpt.update({_id: doc._id}, {
			$set: {
				intersectionTitleDetailComplete: 1,
				titleIntersectionDetail: matchDetail
			}
		}, function (err,res) {
			if (err) {console.log(err)} else {console.log('intersectionTitleDetailComplete')}
		});
	}
	if(doc.parsingComplete && doc.bulkIntersectionDescComplete && !doc.intersectionDescDetailComplete) {

		var matches = doc.descIntersections;
		var matchDetail = [];

		for (var i = matches.length - 1; i >= 0; i--) {
			var matchDetailItem = {};
			var matchingMasco = MascoKey.findOne({_id: matches[i]});

			matchDetailItem.mascoCode = matchingMasco.officialCode;
		  matchDetailItem.mascoKeywordLength = matchingMasco.keywords.length;
		  matchDetailItem.rptArrayLength = doc.cleanDescTags.length;
		  matchDetailItem.intersectionValue = findIntersection(matchingMasco.keywords,doc.cleanDescTags);
		  matchDetailItem.percentVsMascoSize = matchDetailItem.intersectionValue.length/matchingMasco.keywords.length;
		  matchDetailItem.percentVsRptSize = matchDetailItem.intersectionValue.length/doc.cleanDescTags.length;

		  console.log('matchDetailItem '+ i, matchDetailItem);
		  matchDetail.push(matchDetailItem);
		}
		
		console.log(matchDetail.length + 'items in matchDetail array');

		Rpt.update({_id: doc._id}, {
			$set: {
				intersectionDescDetailComplete: 1,
				descIntersectionDetail: matchDetail
			}
		}, function (err,res) {
			if (err) {console.log(err)} else {console.log('intersectionDescDetailComplete')}
		});
	}	
}, {fetchPrevious: false});