/// title == title
var runTitleEqTitle = function () {
  var data = MascoKey.find({}).fetch();
  updateRptMatches = function(array, mascoCode) {
    var matches = array;

    for (var i = matches.length - 1; i >= 0; i--) {
      console.log('updating ' +matches[i]._id+ ' with masco code: '+ mascoCode + ' for titleEqTitle');
      
      Rpt.update({_id: matches[i]._id }, 
        {
          $push: { 
            titleEqTitle: mascoCode 
          }
        }
      );
    }
  },
  // we pass in an array containing the MascoKey's title.
  // we return an array containing all rpt item _ids where their cleanTitle is equal to the mascoKey's title.
  findMatches =function (array) {
   return Rpt.find({ cleanTitle: { $in: array } }).fetch();
  };

  // for each mascoKey _id, get the keywords, official title, and offical code
  for (var i = data.length - 1; i >= 0; i--) {
    var self = data[i],
    _id = data[i]._id,
    keywords = data[i].keywords,
    officialCode = data[i].officialCode,
    officialTitle = data[i].officialTitle;

    // with the keywords from each mascoKey
    if (officialTitle && officialCode){
      // find and return an array of _ids with exact tile matches against these keywords
      var found = findMatches([officialTitle]);
      // update each one of these matches, pushing the official code into titleEqTitle
      updateRptMatches(found, officialCode);
    }
      
  }
};
/// title $in keywords
var runTitleInKeywords = function () {
  var data = MascoKey.find({}).fetch();
  updateRptMatches = function(array, mascoCode) {
    var matches = array;

    for (var i = matches.length - 1; i >= 0; i--) {
      console.log('updating ' +matches[i]._id+ ' with masco code: '+ mascoCode + ' for runTitleInKeywords');
      
      Rpt.update({_id: matches[i]._id }, 
        {
          $push: { 
            titleInKeywords: mascoCode 
          }
        }
      );
    }
  },
  // we pass in an array containing all of the MascoKey's keywords, which contains the corresponding masco titles.
  // we return an array containing all rpt item _ids where their cleanTitle is contained in the masco keyword array.
  findMatches =function (array) {
   return Rpt.find({ cleanTitle: { $in: array } }).fetch();
  };

  // for each mascoKey _id, get the keywords, official title, and offical code
  for (var i = data.length - 1; i >= 0; i--) {
    var self = data[i],
    _id = data[i]._id,
    keywords = data[i].keywords,
    officialCode = data[i].officialCode;

    // with the keywords from each mascoKey
    if (keywords && officialCode){
      // find and return an array of _ids with exact tile matches against these keywords
      var found = findMatches(keywords);
      // update each one of these matches, pushing the official code into runTitleInKeywords
      updateRptMatches(found, data[i].officialCode);
    }
      
  }
};
/// title % intersection
var runTitleIntersection = function () {
  var mascoData = MascoKey.find({}).fetch();
  var rptData = Rpt.find({}).fetch();

  var findMatches = function (array) {
    return Rpt.find({ cleanTitleTags: { $in: array } }).fetch();
  };
  // accepts an array of keywords from each rpt item
  // return an array of MK items with keywords matching anything in the passed in array
  var findKeywordOverlap = function (keywordArray) {
    return MascoKey.find({ keywords: { $in: keywordArray } }).fetch();
  };
  // 
  var findIntersections = function (similarMascItems, rptKeywordArray, rptId) {
    check(similarMascItems, Array);
    check(rptKeywordArray, Array);

    var data = similarMascItems;

    for (var i = data.length - 1; i >= 0; i--) {
      var mascoItem =  MascoKey.findOne({ _id: data[i]._id });
      var mascoItemId = mascoItem._id;
      var mascoKeys = mascoItem.keywords;
      var mascoCode = mascoItem.officialCode;

      if (rptKeywordArray && mascoKeys && mascoCode && mascoItemId) {
        var intersect = function(arg1,arg2) {
          return _.intersection(arg1,arg2);
        },
        insertData = function(info, mascoCode, rptId, rptArrayL, mascoArrayL, intersectionL){
          Rpt.update({_id: rptId},
          {
            $push: { 
              percentMatchTitleKeywords: {
                mascoCode: mascoCode,
                rptArrayL: rptArrayL,
                intersection: info,
                intersectionL: intersectionL,
                mascoArrayL: mascoArrayL,
                percentVsMascoRptSize: intersectionL/mascoArrayL,
                percentVsRptSize: intersectionL/rptArrayL
              }
             }
           },
            function(err, res) {
              if( err) {
                console.log(err);
              } else {
                console.log('title intersection complete on rpt _id ' + rptId + ' vs mascoKey' + mascoCode);
              }

            }
          );
        },
        info = intersect(rptKeywordArray,mascoKeys),
        interesectL = info.length,
        rptArrayL = rptKeywordArray.length,
        intersectionL = info.length,
        mascoArrayL = mascoKeys.length;

        insertData(info, mascoCode, rptId, rptArrayL, mascoArrayL, intersectionL);
      }
    }
  }; 

  for (var i = rptData.length - 1; i >= 0; i--) {
    var self = rptData[i],
        tags = self.cleanTitleTags,
        _id = self._id;

    if( tags) {

      var similarMascoItems = findKeywordOverlap(tags);

      findIntersections(similarMascoItems, tags, _id);
    }
    
  }
};
/// description % intersection
var runDescIntersection = function () {
  var mascoData = MascoKey.findOne({});//.fetch();
  var rptData = Rpt.find({}).fetch();

  var findMatches = function (array) {
    return Rpt.find({ cleanDescTags: { $in: array } }).fetch();
  };
  // accepts an array of keywords from each rpt item
  // return an array of MK items with keywords matching anything in the passed in array
  var findKeywordOverlap = function (keywordArray) {
    return MascoKey.find({ keywords: { $in: keywordArray } }).fetch();
  };
  // 
  var findIntersections = function (similarMascItems, rptKeywordArray, rptId) {
    check(similarMascItems, Array);
    check(rptKeywordArray, Array);

    var data = similarMascItems;

    for (var i = data.length - 1; i >= 0; i--) {
      var mascoItem =  MascoKey.findOne({ _id: data[i]._id });
      var mascoItemId = mascoItem._id;
      var mascoKeys = mascoItem.keywords;
      var mascoCode = mascoItem.officialCode;

      if (rptKeywordArray && mascoKeys && mascoCode && mascoItemId) {
        var intersect = function(arg1,arg2) {
          return _.intersection(arg1,arg2);
        },
        insertData = function(info, mascoCode, rptId, rptArrayL, mascoArrayL, intersectionL){
          Rpt.update({_id: rptId},
          {
            $push: { 
              percentMatchDescKeywords: {
                mascoCode: mascoCode,
                rptArrayL: rptArrayL,
                intersection: info,
                intersectionL: intersectionL,
                mascoArrayL: mascoArrayL,
                percentVsMascoRptSize: intersectionL/mascoArrayL,
                percentVsRptSize: intersectionL/rptArrayL
              }
             }
           },
            function(err, res) {
              if( err) {
                console.log(err);
              } else {
                console.log('title intersection complete on rpt _id ' + rptId + ' vs mascoKey' + mascoCode);
              }

            }
          );
        },
        info = intersect(rptKeywordArray,mascoKeys),
        interesectL = info.length,
        rptArrayL = rptKeywordArray.length,
        intersectionL = info.length,
        mascoArrayL = mascoKeys.length;

        insertData(info, mascoCode, rptId, rptArrayL, mascoArrayL, intersectionL);
      }
    }
  }; 

  for (var i = rptData.length - 1; i >= 0; i--) {
    var self = rptData[i],
        tags = self.cleanDescTags,
        _id = self._id;

    if( tags) {

      var similarMascoItems = findKeywordOverlap(tags);

      findIntersections(similarMascoItems, tags, _id);
    }
    
  }
};
/// mascoTitleTagFourWeak
var mascoTitleTagFourWeak = function () {
  var mascoFetch = MascoFour.find({}).fetch();

  function updateMatches(array, mascoCode) {
    var data = array;

    for (var i = data.length - 1; i >= 0; i--) {
      console.log('updating Rpt _id ' +data[i]._id+ ' with masco code: '+ mascoCode + 'for mascoTitleTagFourWeak');
      
      Rpt.update({_id: data[i]._id }, 
        {
          $push: { 
            mascoTitleTagFourWeak: mascoCode 
          }
        }
      );
    }
  }

  function findMatches(tagArray) {
    return Rpt.find({ cleanTagsOnly: { $in: tagArray } }).fetch();
  }
  
  for (var i = mascoFetch.length - 1; i >= 0; i--) {
    
    var self = mascoFetch[i],
    tags = mascoFetch[i].tagsOnly,
    _id = mascoFetch[i]._id,
    id = mascoFetch[i].id;

    var found = findMatches(tags);
    updateMatches(found, id);

  }
};
/// mascoTitleTagFourStrong
var mascoTitleTagFourStrong = function () {
  var mascoFetch = MascoFour.find({}).fetch();

  function updateMatches(array, mascoCode) {
    var data = array;
    
    for (var i = data.length - 1; i >= 0; i--) {
      console.log('updating Rpt _id ' +data[i]._id+ ' with masco code: '+ mascoCode + ' for mascoTitleTagFourStrong');
      
      Rpt.update({_id: data[i]._id }, 
        {
          $push: { 
            mascoTitleTagFourStrong: mascoCode 
          }
        }
      );
    }
  }

  // using mongo $eq to select for strong equality on array match
  function findMatches(tagArray) {
    return Rpt.find({ cleanTagsOnly: {  $all: tagArray } }).fetch();
  }
  
  for (var i = mascoFetch.length - 1; i >= 0; i--) {
    
    var self = mascoFetch[i],
    tags = mascoFetch[i].tagsOnly,
    _id = mascoFetch[i]._id,
    id = mascoFetch[i].id;

    var found = findMatches(tags);
    updateMatches(found, id);

  }
};
/// mascoTitleTagFiveWeak
var mascoTitleTagFiveWeak = function () {
  var mascoFetch = MascoFive.find({}).fetch();

  function updateMatches(array, mascoCode) {
    var data = array;

    for (var i = data.length - 1; i >= 0; i--) {
      console.log('updating Rpt _id ' +data[i]._id+ ' with masco code: '+ mascoCode + 'for mascoTitleTagFiveWeak');
      
      Rpt.update({_id: data[i]._id }, 
        {
          $push: { 
            mascoTitleTagFiveWeak: mascoCode 
          }
        }
      );
    }
  }

  function findMatches(tagArray) {
    return Rpt.find({ cleanTagsOnly: { $in: tagArray } }).fetch();
  }
  
  for (var i = mascoFetch.length - 1; i >= 0; i--) {
    
    var self = mascoFetch[i],
    tags = mascoFetch[i].tagsOnly,
    _id = mascoFetch[i]._id,
    id = mascoFetch[i].mapToFour;

    var found = findMatches(tags);
    updateMatches(found, id);

  }
};
/// mascoTitleTagFiveStrong
var mascoTitleTagFiveStrong = function () {
  console.log('inside fivestrong');
  var mascoFetch = MascoFive.find({}).fetch();

  function updateMatches(array, mascoCode) {
    var data = array;

    for (var i = data.length - 1; i >= 0; i--) {
      console.log('updating Rpt _id ' +data[i]._id+ ' with masco code: '+ mascoCode + ' for mascoTitleTagFiveStrong');
      
      Rpt.update({_id: data[i]._id }, 
        {
          $push: { 
            mascoTitleTagFiveStrong: mascoCode 
          }
        }
      );
    }
  }

  // using mongo $eq to select for strong equality on array match
  function findMatches(tagArray) {
    return Rpt.find({ cleanTagsOnly: {  $all: tagArray } }).fetch();
  }
  

  for (var i = mascoFetch.length - 1; i >= 0; i--) {
    
    var self = mascoFetch[i],
    tags = mascoFetch[i].tagsOnly,
    _id = mascoFetch[i]._id,
    id = mascoFetch[i].mapToFour;

    var found = findMatches(tags);
    updateMatches(found, id);

  }
};
/// repTitleTagMatchWeak
var repTitleTagMatchWeak = function () {
  var keyFetch = Rep.find({}).fetch(),
  updateMatches = function(array, mascoCode) {
    var data = array,
    code = mascoCode;

    if(data && code) {
      for (var i = data.length - 1; i >= 0; i--) {
        console.log('updating Rpt _id ' +data[i]._id+ ' with masco code: '+ mascoCode + 'for repTitleTagMatchStrong');
        
        Rpt.update({_id: data[i]._id }, 
          {
            $push: { 
              repTitleTagMatchStrong: code 
            }
          }
        );
      }
    }
  },
  findMatches = function(tagArray) {
    return Rpt.find({ cleanTagsOnly: {  $all: tagArray } }).fetch();
  };
  
  for (var i = keyFetch.length - 1; i >= 0; i--) {
    
    var self = keyFetch[i],
    tags = keyFetch[i].tagsOnly,
    _id = keyFetch[i]._id,
    id = keyFetch[i].mapToFour;

    if (tags && id && _id){
      var found = findMatches(tags);
      if(found) {
        updateMatches(found, id); 
      }
    }
  }
  console.log('repTitleTagMatchWeak complete');
};
/// repTitleTagMatchStrong 
var repTitleTagMatchStrong = function () {
  var keyFetch = Rep.find({}).fetch(),
  updateMatches = function(array, mascoCode) {
    var data = array,
    code = mascoCode;

    if(data && code) {
      for (var i = data.length - 1; i >= 0; i--) {
        console.log('updating Rpt _id ' +data[i]._id+ ' with masco code: '+ mascoCode + 'for repTitleTagMatchStrong');
        
        Rpt.update({_id: data[i]._id }, 
          {
            $push: { 
              repTitleTagMatchStrong: code 
            }
          }
        );
      }
    }
  },
  findMatches = function(tagArray) {
    return Rpt.find({ cleanTagsOnly: {  $in: tagArray } }).fetch();
  };
  
  for (var i = keyFetch.length - 1; i >= 0; i--) {
    
    var self = keyFetch[i],
    tags = keyFetch[i].tagsOnly,
    _id = keyFetch[i]._id,
    id = keyFetch[i].mapToFour;

    if (tags && id && _id){
      var found = findMatches(tags);
      if(found) {
        updateMatches(found, id); 
      }
    }
  }
  console.log('repTitleTagMatchStrong complete');
};

Meteor.methods({
  runTitleEqTitle: function() {
    runTitleEqTitle();
  },
  runTitleInKeywords: function() {
    runTitleInKeywords();
  },
  runTitleIntersection: function() {
    runTitleIntersection();
  },
  runDescIntersection: function() {
    runDescIntersection();
  },
  // strong matches using $all
  mascoTitleTagFiveStrong: function() {
    mascoTitleTagFiveStrong();
  },
    // strong matches using $all
  repTitleTagMatchStrong: function() {
    repTitleTagMatchStrong();
  },
    // strong matches using $all
  mascoTitleTagFourStrong: function() {
    mascoTitleTagFourStrong();
  },
  // weak matches using $in
  mascoTitleTagFiveWeak: function() {
    mascoTitleTagFiveWeak();
  },
  mascoTitleTagFourWeak: function() {
    mascoTitleTagFourWeak();
  },
  repTitleTagMatchWeak: function() {
    repTitleTagMatchWeak();
  }  
});
