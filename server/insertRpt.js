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
	Rpt.update({_id: this._id}, { $set: {
			cleanTitle: cleanUp(doc.occ_title),
			cleanDesc: cleanUp(doc.occ_desc),
			cleanSector: cleanUp(doc.sector),
			titleTags: _.uniq(yakiSplitClean(cleanUp(doc.occ_title))),
			tagsOnly: _.uniq(yakiSplitClean(cleanUp(doc.occ_title))),
			descTags: _.uniq(yakiSplitClean(cleanUp(doc.occ_desc))),
	}}, function (err,res) {
		if (err) {
			console.log(err);
		} else {

			/// if title has not been added to titleTags, add it, then mark parsing process complete
			if(!doc.parsingComplete) {
				Rpt.update({_id: doc._id}, {
					$push: {
						titleTags: doc.cleanTitle,
					},
					$set: {
						parsingComplete: 1
					}
				}, function (err,res) {
					if (err) {console.log(err)} else {console.log('parsing process complete')}
				});		
				var parsedDoc = Rpt.findOne({_id:doc._id});
				/// parsing is complete, start intersection work
				if(parsedDoc.parsingComplete){
					/// if no title intersection work done, add title _ids in bulk, then mark bulkIntersectionTitleComplete complete
					if(!parsedDoc.bulkIntersectionTitleComplete) {
						var matches = MascoKey.find({keywords: {$in: parsedDoc.titleTags}}).fetch();
						var matchIdSet = [];
						for (var i = matches.length - 1; i >= 0; i--) {
							matchIdSet.push(matches[i]._id);
						}

						var uniques = _.uniq(matchIdSet);

						Rpt.update({_id: parsedDoc._id}, {
							$push: {
								titleIntersections: {
									$each: uniques
								}
							},
							$set: {
								bulkIntersectionTitleComplete: 1
							}
						});
						/// bulk title _ids have been added, find detail, then mark intersectionTitleDetailComplete complete
						var intersectionsTitleDoc =  Rpt.findOne({_id:doc._id});
						var matches = intersectionsTitleDoc.titleIntersections;
						var matchDetail = [];

						for (var i = matches.length - 1; i >= 0; i--) {
							var matchDetailItem = {};
							var matchingMasco = MascoKey.findOne({_id: matches[i]});

							matchDetailItem.mascoCode = matchingMasco.officialCode;
						  matchDetailItem.mascoKeywordLength = matchingMasco.keywords.length;
						  matchDetailItem.rptArrayLength = intersectionsTitleDoc.titleTags.length;
						  matchDetailItem.intersectionValue = findIntersection(matchingMasco.keywords,intersectionsTitleDoc.titleTags);
						  matchDetailItem.percentVsMascoSize = matchDetailItem.intersectionValue.length/matchingMasco.keywords.length;
						  matchDetailItem.percentVsRptSize = matchDetailItem.intersectionValue.length/intersectionsTitleDoc.titleTags.length;

						  matchDetail.push(matchDetailItem);
						}

						Rpt.update({_id: intersectionsTitleDoc._id}, {
							$set: {
								intersectionTitleDetailComplete: 1,
								titleIntersectionDetail: matchDetail
							}
						});

					}
					/// if no desc intersection work done, add desc _ids in bulk, , then mark bulkIntersectionDescComplete complete
					if(!parsedDoc.bulkIntersectionDescComplete) {

						var matches = MascoKey.find({keywords: {$in: parsedDoc.cleanDescTags}}).fetch();
						var matchIdSet = [];
						for (var i = matches.length - 1; i >= 0; i--) {
							matchIdSet.push(matches[i]._id);
						}

						var uniques = _.uniq(matchIdSet);

						Rpt.update({_id: parsedDoc._id}, {
							$push: {
								descIntersections: {
									$each: uniques
								}
							},
							$set: {
								bulkIntersectionDescComplete: 1
							}
						});
						
						/// bulk title _ids have been added, find detail, then mark intersectionDescDetailComplete complete
						var intersectionsDescDoc =  Rpt.findOne({_id:doc._id});
						var matches = intersectionsDescDoc.titleIntersections;
						var matchDetail = [];

						for (var i = matches.length - 1; i >= 0; i--) {
							var matchDetailItem = {};
							var matchingMasco = MascoKey.findOne({_id: matches[i]});

							matchDetailItem.mascoCode = matchingMasco.officialCode;
						  matchDetailItem.mascoKeywordLength = matchingMasco.keywords.length;
						  matchDetailItem.rptArrayLength = intersectionsDescDoc.cleanDescTags.length;
						  matchDetailItem.intersectionValue = findIntersection(matchingMasco.keywords,intersectionsDescDoc.cleanDescTags);
						  matchDetailItem.percentVsMascoSize = matchDetailItem.intersectionValue.length/matchingMasco.keywords.length;
						  matchDetailItem.percentVsRptSize = matchDetailItem.intersectionValue.length/intersectionsDescDoc.cleanDescTags.length;

						  matchDetail.push(matchDetailItem);
						}

						Rpt.update({_id: parsedDoc._id}, {
							$set: {
								intersectionDescDetailComplete: 1,
								descIntersectionDetail: matchDetail
							}
						});	
					}
				}
			}
		}
	});
});