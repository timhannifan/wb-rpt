var mascoFields = {
  _id: 1, 
  officialCode: 1,
  officialTitle: 1,
  keywords: 1
};

var rptFields = {
  _id: 1, 
  // cleanTitle: 1,
  cleanTitleTags: 1,
  cleanDescTags: 1
};

/// finding the intersection of two arrays
function findThisIntersection( array1, array2 ){
  return _.intersection(array1, array2 );
}
/// finding rpt matches on an array
function findRptMatches(array, mascoCode) {
  var matches = Rpt.find({ 
    cleanDescTags: { 
      $in: array 
    }
  }, {
    sort: {
      id: 1
    },
    fields: rptFields
  });
  var matchCount = 0;
  var matchArray = [];

  matches.forEach(function(rptDoc){
    var rptId = rptDoc._id;
    var rptTargetValue = rptDoc.cleanDescTags;

    var rptArrayLength = rptTargetValue.length;
    var mascoKeywordLength = array.length;

    var intersectionValue = findThisIntersection(array,rptTargetValue);
    var mc = mascoCode;

    // console.log(intersectionValue);
    // console.log("cleanTitle of rptDoc " + matchCount + ": " + rptDoc.cleanTitle);
    // console.log("cleanDescTags of rptDoc " + matchCount + ": " + rptDoc.cleanDescTags);

    // var thisParticularIntersection = findThisIntersection(array,rptDoc.cleanDescTags);
    // console.log('intersection value :' + thisParticularIntersection);
    matchArray.push({
      rptId: rptDoc._id,
      rptArrayLength: rptTargetValue.length,
      mascoKeywordLength: array.length,
      intersectionValue: findThisIntersection(array,rptTargetValue)
    });

    matchCount += 1;
  });

  return matchArray;
}

var testDescIntersection = function () {
  console.log('testDescIntersection called');

  var key = MascoKey.find({}, {sort: {officialCode: 1}, limit: 10, skip: 50}, function(err,res){
    console.log('found '+ res + 'mascoKeys');
  });

  console.log('beggining loop of mascoKeys');
  var count = 0;
  key.forEach(function (doc) {
    console.log("officialTitle of doc " + count + ": " + doc.officialTitle);
    console.log("keywords of doc " + count + ": " + doc.keywords);
    console.log("officialCode of doc " + count + ": " + doc.officialCode);

    var matchArray = findRptMatches(doc.keywords, doc.officialCode);



    for (var i = matchArray.length - 1; i >= 0; i--) {
      
      var mascoCode = doc.officialCode;
      console.log('updating rpt: ' + matchArray[i].rptId + ' with masco ' + mascoCode );
      if (!matchArray[i].rptId){console.log('missing rptId, skipping.....');} else {
        Rpt.update({_id: matchArray[i].rptId},{
          $push: {
            percentMatchDescKeywords: {
              mascoCode: mascoCode,
              rptArrayLength: matchArray[i].rptArrayLength,
              mascoKeywordLength: matchArray[i].mascoKeywordLength,
              intersectionValue: matchArray[i].intersectionValue,
              mascoKeywordLength: matchArray[i].mascoKeywordLength,
              percentVsMascoSize: matchArray[i].intersectionValue.length/matchArray[i].mascoKeywordLength,
              percentVsRptSize: matchArray[i].intersectionValue.length/matchArray[i].rptArrayLength
            }
          },
          $set: {
            descIntersectionComplete: 1
          }

        }, function (err,res) {
          if(err){console.log(err);} else {console.log('update complete');}
        });
      }
    }


    // updateThisRptItem(rptId, rptArrayLength, mascoKeywordLength, intersectionValue, intersectionValue.length, mc );

    

    count += 1;

  });
  console.log('ending loop of mascoKeys');
};
var fullDescIntersection = function (start,end, skip) {
  console.log('fullDescIntersection called');

  var key = MascoKey.find({}, {sort: {officialCode: 1}}, function(err,res){
    console.log('found '+ res + 'mascoKeys');
  });

  console.log('beggining loop of mascoKeys');
  var count = 0;
  key.forEach(function (doc) {
    console.log("officialTitle of doc " + count + ": " + doc.officialTitle);
    console.log("keywords of doc " + count + ": " + doc.keywords);
    console.log("officialCode of doc " + count + ": " + doc.officialCode);

    var matchArray = findRptMatches(doc.keywords, doc.officialCode);

    // runMatches(matchArray);
    console.log('outside we have ' + matchArray.length + ' matchArray items'); 

    function updateMatches(matchArray, mascoCode) {
        console.log('inside we have ' + matchArray.length + ' matchArray items');        
      
        for (var i = matchArray.length - 1; i >= 0; i--) {

          var mascoCode = mascoCode;
          console.log('updating rpt: ' + matchArray[i].rptId + ' with masco ' + mascoCode );
          if (!matchArray[i].rptId){
            console.log('missing rptId, skipping.....');
          } else {
            Rpt.update({_id: matchArray[i].rptId},{
              $push: {
                percentMatchDescKeywords: {
                  mascoCode: mascoCode,
                  rptArrayLength: matchArray[i].rptArrayLength,
                  mascoKeywordLength: matchArray[i].mascoKeywordLength,
                  intersectionValue: matchArray[i].intersectionValue,
                  mascoKeywordLength: matchArray[i].mascoKeywordLength,
                  percentVsMascoSize: matchArray[i].intersectionValue.length/matchArray[i].mascoKeywordLength,
                  percentVsRptSize: matchArray[i].intersectionValue.length/matchArray[i].rptArrayLength
                }
              },
              $set: {
                descIntersectionComplete: 1
              }

            }, function (err,res) {
              if(err){console.log(err);} else {console.log('update complete');}
            });
          }
        }
    }

    updateMatches(matchArray, doc.officialCode);




    // updateThisRptItem(rptId, rptArrayLength, mascoKeywordLength, intersectionValue, intersectionValue.length, mc );

    

    count += 1;

  });
  console.log('ending loop of mascoKeys');
};
var fullDescIntersectionTwo = function (start,end, skip) {
  console.log('fullTitleIntersectionTwo called for '+start+' through '+end);
  var searchLength = end - start;

  var key = MascoKey.find({}, {
    sort: {officialCode: 1},
    limit: searchLength,
    skip: skip
  });

  var count = 0;
  key.forEach(function (keyDoc) {
    var mascoCode = keyDoc.officialCode;
    var mascoKeywords = keyDoc.keywords;
    var matches = Rpt.find({ cleanDescTags: { $in: mascoKeywords }}, 
      { sort: {id: 1},
        fields: rptFields
      }
    );
    console.log('working on masco: ' + mascoCode);

    matches.forEach(function(rptDoc){
      var rptId = rptDoc._id;
      var rptTargetValue = rptDoc.cleanDescTags;
      var rptArrayLength = rptDoc.cleanDescTags.length;
      var mascoKeywordLength = mascoKeywords.length;
      var intersectionValue = _.intersection(mascoKeywords,rptTargetValue);

      Rpt.update({_id: rptId},{ $push: {
          percentMatchDescKeywords: {
            mascoCode: mascoCode,
            rptArrayLength: rptArrayLength,
            mascoKeywordLength: mascoKeywordLength,
            intersectionValue: intersectionValue,
            mascoKeywordLength: mascoKeywordLength,
            percentVsMascoSize: intersectionValue.length/mascoKeywordLength,
            percentVsRptSize: intersectionValue.length/rptArrayLength
          }
        }
      }, function (err,res) {
        if(err){console.log(err);} else {console.log('update percentMatchDescKeywords complete');}
      });
    });
    count += 1;
  });
  console.log('fullTitleIntersectionTwo completed for '+start+' through '+end);  
  console.log(count + 'items through loop');
};
var fullTitleIntersectionTwo = function (start,end, skip) {
  console.log('fullTitleIntersectionTwo called for '+start+' through '+end);
  var searchLength = end - start;

  var key = MascoKey.find({}, {
    sort: {officialCode: 1},
    limit: searchLength,
    skip: skip
  });

  var count = 0;
  key.forEach(function (keyDoc) {
    var mascoCode = keyDoc.officialCode;
    console.log(mascoCode);
    var mascoKeywords = keyDoc.keywords;
    var matches = Rpt.find({ cleanTitleTags: { $in: mascoKeywords }}, 
      { sort: {id: 1},
        fields: rptFields
      }
    );
    console.log('working on masco: ' + mascoCode);

    matches.forEach(function(rptDoc){
      var rptId = rptDoc._id;
      var rptTargetValue = rptDoc.cleanTitleTags;
      var rptArrayLength = rptDoc.cleanTitleTags.length;
      var mascoKeywordLength = mascoKeywords.length;
      var intersectionValue = _.intersection(mascoKeywords,rptTargetValue);

      Rpt.update({_id: rptId},{ $push: {
          percentMatchTitleKeywords: {
            mascoCode: mascoCode,
            rptArrayLength: rptArrayLength,
            mascoKeywordLength: mascoKeywordLength,
            intersectionValue: intersectionValue,
            mascoKeywordLength: mascoKeywordLength,
            percentVsMascoSize: intersectionValue.length/mascoKeywordLength,
            percentVsRptSize: intersectionValue.length/rptArrayLength
          }
        }
      }, function (err,res) {
        if(err){console.log(err);} else {console.log('update percentMatchTitleKeywords complete');}
      });
    });
    count += 1;
  });
  console.log('fullTitleIntersectionTwo completed for '+start+' through '+end);  
  console.log(count + 'items through loop');
};

function percentMatchDescKeywordsReset (col) {
  var data = Rpt.find({});

  data.forEach(function (el) {
    Rpt.update(
      {_id: el._id}, 
      { 
        $unset: { 
          percentMatchDescKeywords: ""
        }
      }, function(err,res) {
          if( err) {
            console.log(err);
          } else {
            console.log('finished percentMatchDescKeywordsReset clean');
          }
      }
    ); 
  });
  console.log('completed percentMatchDescKeywordsReset');
};
function percentMatchTitleKeywordsReset () {
  var data = Rpt.find({});

  data.forEach(function (el) {
    Rpt.update(
      {_id: el._id}, 
      { 
        $unset: { 
          percentMatchTitleKeywords: ""
        }
      }, function(err,res) {
          if( err) {
            console.log(err);
          } else {
            console.log('finished percentMatchTitleKeywordsReset clean');
          }
      }
    ); 
  });
  console.log('completed percentMatchTitleKeywordsReset');
};

Meteor.methods({
testDescIntersection: function() {
  this.unblock();
  testDescIntersection();
  console.log('testDescIntersection completed');
},

fullTitleIntersectionTwo: function(start,end, skip) {
  // this.unblock();
  fullTitleIntersectionTwo(start,end, skip);
  // fullTitleIntersectionTwo();
  console.log('fullTitleIntersectionTwo completed');
},

fullDescIntersectionTwo: function(start,end, skip) {
  // this.unblock();
  fullDescIntersectionTwo(start,end, skip);
  // fullDescIntersectionTwo();
  console.log('fullDescIntersectionTwo completed');
},  

percentMatchDescKeywordsReset: function () {
  percentMatchDescKeywordsReset();
},

percentMatchTitleKeywordsReset: function () {
  percentMatchTitleKeywordsReset();
}
});