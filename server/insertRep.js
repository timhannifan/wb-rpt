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
insertRep: function( data) {
  check( data, Array );

  for ( i = 0; i < data.length; i++ ) {
    item   = data[ i ],
    exists = Rep.findOne({id: data.id});
    
    if( exists ){
    	console.log('Found a REP with matching id. Skipping this item.');
    } else {
    	console.log('Found a new REP item. Creating original record...');
    	var item = {};
    	item.id = data[ i ].id;
    	item.job1_position = data[ i ].job1_position;
    	item.masco_4 = data[ i ].masco_4;
    	item.job1_employer = data[ i ].job1_employer;

    	Rep.insert(item, function(err,res) {
    		if (err) {console.log(err)} else {console.log('REP create successfull')}
    	});
    }
    
  }
}

});

Rep.after.insert(function (userId, doc) {
	//// ADDING CLEANTITLE, MAPTOFOUR, KEYWORDS TO TITLETAGS AND TAGSONLY
		Rep.update({_id: this._id}, {$set: {
		cleanTitle: cleanUp(doc.job1_position),
		mapToFour: doc.masco_4,
		titleTags: _.uniq(yakiSplitClean(cleanUp(doc.job1_position))),
		tagsOnly: _.uniq(yakiSplitClean(cleanUp(doc.job1_position)))
	}}, function (err,res) {
		if (err) {console.log(err)} else {console.log('REP update successful')}
	});
});

Rep.after.update(function (userId, doc, fieldNames, modifier, options) {

	if(!doc.titleTagBool) {
		Rep.update({_id: doc._id}, {
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
	if(!doc.addedToKey) {
		MascoKey.update({officialCode: doc.mapToFour},
			{
				$addToSet:{
					keywords: {$each: doc.titleTags}
				}
			}, function (err,res) {
			if (err) {console.log(err)} else {
				Rep.update({_id: doc._id}, {
					$set: {
						addedToKey: 1
					}
				}, function (err,res) {
					if (err) {console.log(err)} else {console.log('addedToKey updated')}
				});		
			}
		});
	}

}, {fetchPrevious: false});
