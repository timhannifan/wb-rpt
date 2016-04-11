var mascoFields = {
  _id: 1, 
  officialCode: 1,
  officialTitle: 1,
  keywords: 1
};

var rptFields = {
  _id: 1, 
  cleanTitle: 1,
  cleanTitleTags: 1
};



function updateThisRptItem(rptId, rptArrayLength, mascoKeywordLength, intersectionValue, intersectionLength, mascoCode ) {
  console.log('updating :' + rptId + ' with mascoCode ' + mascoCode);
  Rpt.update({_id: rptId},{
    $push: {
      percentMatchTitleKeywords: {
        mascoCode: mascoCode,
        rptArrayLength: rptArrayLength,
        mascoKeywordLength: mascoKeywordLength,
        intersectionValue: intersectionValue,
        mascoKeywordLength: mascoKeywordLength,
        percentVsMascoSize: intersectionLength/mascoKeywordLength,
        percentVsRptSize: intersectionLength/rptArrayLength
      }
    },
    $set: {
      titleIntersectionComplete: 1
    }

  }, function (err,res) {
    if(err){console.log(err);} else {console.log('completed update on ' + rptId);}
  })
}

/// finding the intersection of two arrays
function findThisIntersection( array1, array2 ){
  return _.intersection(array1, array2 );
}

/// finding rpt matches on an array
function findRptMatches(array, mascoCode) {
  var matches = Rpt.find({ 
    cleanTitleTags: { 
      $in: array 
    },
    titleIntersectionComplete : 0 
    }, {
      sort: {
        id: 1
      },
      fields: rptFields
    }
  );
  var matchCount = 0;

  matches.forEach(function(rptDoc){
    var rptId = rptDoc._id;
    var rptTargetValue = rptDoc.cleanTitleTags;

    var rptArrayLength = rptTargetValue.length;
    var mascoKeywordLength = array.length;

    var intersectionValue = findThisIntersection(array,rptTargetValue);
    var mc = mascoCode;

    // console.log(intersectionValue);
    // console.log("cleanTitle of rptDoc " + matchCount + ": " + rptDoc.cleanTitle);
    // console.log("cleanTitleTags of rptDoc " + matchCount + ": " + rptDoc.cleanTitleTags);

    // var thisParticularIntersection = findThisIntersection(array,rptDoc.cleanTitleTags);
    // console.log('intersection value :' + thisParticularIntersection);

    updateThisRptItem(rptId, rptArrayLength, mascoKeywordLength, intersectionValue, intersectionValue.length, mc );
    matchCount += 1;
  });
}

var testTitleIntersection = function () {
  console.log('testTitleIntersection called');
  var key = MascoKey.find({}, {sort: {officialCode: 1}, limit: 5});
  var count = 0;
  key.forEach(function (doc) {
    console.log("officialTitle of doc " + count + ": " + doc.officialTitle);
    console.log("keywords of doc " + count + ": " + doc.keywords);
    console.log("officialCode of doc " + count + ": " + doc.officialCode);
    var theseKeywords = doc.keywords;
    var mascoCode = doc.officialCode;
    findRptMatches(theseKeywords, mascoCode);

    count += 1;
  });
};

var fullTitleIntersection = function (start, end, skip) {
  console.log('fullTitleIntersection called for '+start+' through '+end);
  var searchLength = end - start;

  var key = MascoKey.find({}, {
    sort: {officialCode: 1},
    limit: searchLength,
    skip: skip
  });
  var count = 0;
  key.forEach(function (doc) {
    console.log("officialTitle of doc " + count + ": " + doc.officialTitle);
    console.log("keywords of doc " + count + ": " + doc.keywords);
    console.log("officialCode of doc " + count + ": " + doc.officialCode);
    var theseKeywords = doc.keywords;
    var mascoCode = doc.officialCode;
    findRptMatches(theseKeywords, mascoCode);

    count += 1;
  });
};
// function percentMatchTitleKeywordsReset (col) {
//   var data = Rpt.find({});
//   data.forEach(function (el) {
//     Rpt.update(
//       {_id: el._id}, 
//       { 
//         $unset: { 
//           percentMatchTitleKeywords: ""
//         },
//         $set: {
//           titleIntersectionComplete: 0
//         }
//       }, function(err,res) {
//           if( err) {
//             console.log(err);
//           } else {
//             console.log('finished cleaning up : ' + el._id);
//           }
//       }
//     ); 
//   });
//   console.log('completed percentMatchTitleKeywordsReset');
// };

Meteor.methods({
  testTitleIntersection: function() {
    this.unblock();
    testTitleIntersection();
    console.log('testTitleIntersection completed');
  },
  fullTitleIntersection: function(start,end, skip) {
    this.unblock();
    fullTitleIntersection(start,end, skip);
    console.log('fullTitleIntersection completed');
  },
  // percentMatchTitleKeywordsReset: function () {
  //   percentMatchTitleKeywordsReset()
  // },
});