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
insertMascoFive: function( data) {
  check( data, Array );

  for ( i = 0; i < data.length; i++ ) {
    item   = data[ i ],
    exists = MascoFive.findOne({originalTitle: data.originalTitle});
    
    if( exists ){
    	console.log('Found a mascoFive with matching originalTitle. Skipping this item.');
    } else {
    	console.log('Found a new mascoFive item. Creating original record...');
    	var item = {};
    	item.id = data[ i ].id;
    	item.originalTitle = data[ i ].description_5_digit;

    	MascoFive.insert(item, function(err,res) {
    		if (err) {console.log(err)} else {console.log('masco5 create successfull')}
    	});
    }
    
  }
}

});

MascoFive.after.insert(function (userId, doc) {
	//// ADDING CLEANTITLE, MAPTOFOUR, KEYWORDS TO TITLETAGS AND TAGSONLY
		MascoFive.update({_id: this._id}, {$set: {
		cleanTitle: cleanUp(doc.originalTitle),
		mapToFour: doc.id.substr(0, 4),
		titleTags: _.uniq(yakiSplitClean(cleanUp(doc.originalTitle))),
		tagsOnly: _.uniq(yakiSplitClean(cleanUp(doc.originalTitle)))
	}}, function (err,res) {
		if (err) {console.log(err)} else {console.log('masco5 update successful')}
	});
});

MascoFive.after.update(function (userId, doc, fieldNames, modifier, options) {

	if(!doc.titleTagBool) {
		MascoFive.update({_id: doc._id}, {
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
				MascoFive.update({_id: doc._id}, {
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


// // var doc = MascoFive.findOne({_id: this._id});
// var fourmap = doc.mapToFour;

// //// ADDING CLEANTITLE TO TITLETAGS
// if (!doc.insertSuccessBool && doc.cleanTitle) {

// }

// //// MASCO KEY: INSERTING KEYWORDS
// if (doc.insertSuccessBool && doc.mapToFour && doc.titleTags) {
// 	MascoKey.update({id: doc.mapToFour},
// 		{
// 			$push:{
// 				keywords: doc.titleTags
// 			},
// 		},
// 		function(err,res) {
// 			if (err) {console.log(err)} else {
// 				console.log('MASCOKEY keywords updated successfully');
// 				MascoFive.update({_id: doc._id},
// 				{
// 					$set:{
// 						mascoKeyUpdateSuccess: 1
// 					},
// 				});
// 			}
// 		}
// 	);		
// } 
