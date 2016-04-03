
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
var runTitleIntersection = function () {
  var mascoData = MascoKey.findOne({});//.fetch();
  var rptData = Rpt.find({}).fetch();

  var findMatches = function (array) {
    return Rpt.find({ titleTags: { $in: array } }).fetch();
  };
  // accepts an array of keywords from each rpt item
  // return an array of MK items with keywords matching anything in the passed in array
  var findKeywordOverlap = function (keywordArray) {
    return MascoKey.find({ keywords: { $in: keywordArray } }).fetch();
  };
  // 
  var findTitleIntersections = function (similarMascItems, rptKeywordArray, rptId) {
    check(similarMascItems, Array);
    check(rptKeywordArray, Array);

    var data = similarMascItems;

    for (var i = data.length - 1; i >= 0; i--) {
      var mascoItem =  MascoKey.findOne({ _id: data[i]._id });
      var mascoKeys = mascoItem.keywords;
      var mascoCode = mascoItem.officialCode;

      if (rptKeywordArray && mascoKeys && mascoCode) {
        var intersect = function(arg1,arg2) {
          return _.intersection(arg1,arg2);
          // return _.intersection(rptKeywordArray,mascoKeys);
        };

        var info = intersect(rptKeywordArray,mascoKeys);

        console.log('masco:' + mascoCode);
        console.log('rptId:' + rptId);
        console.log('number of intersecting items: ' + info.length);
        console.log('number of mascoKeywords: ' + mascoKeys.length);
        console.log('percent Match with masco: ' + (info.length/rptKeywordArray.length)*100);
        console.log('intersecting keyword:' + info);

      }
    }
  }; 

  for (var i = rptData.length - 1; i >= 0; i--) {
    var self = rptData[i],
        titleTags = self.cleanTitleTags,
        _id = self._id;

    if( titleTags) {

      var similarMascoItems = findKeywordOverlap(titleTags);

      findTitleIntersections(similarMascoItems, titleTags, _id);
    }
    
  }
};
var runDescIntersection = function () {
  var mascoData = MascoKey.find({}).fetch();
  var rptData = Rpt.find({}).fetch();

  var findMatches = function (array) {
    return Rpt.find({ titleTags: { $in: array } }).fetch();
  };
  // accepts an array of keywords from each rpt item
  // return an array of MK items with keywords matching anything in the passed in array
  var findKeywordOverlap = function (keywordArray) {
    return MascoKey.find({ keywords: { $in: keywordArray } }).fetch();
  };
  // 
  var findTitleIntersections = function (similarMascItems, rptKeywordArray, rptId) {
    check(similarMascItems, Array);
    check(rptKeywordArray, Array);

    var data = similarMascItems;

    for (var i = data.length - 1; i >= 0; i--) {
      var mascoItem =  MascoKey.findOne({ _id: data[i]._id });
      var mascoKeys = mascoItem.keywords;
      var mascoCode = mascoItem.officialCode;

      if (rptKeywordArray && mascoKeys && mascoCode) {
        var intersect = function(arg1,arg2) {
          return _.intersection(arg1,arg2);
          // return _.intersection(rptKeywordArray,mascoKeys);
        };

        var info = intersect(rptKeywordArray,mascoKeys);

        console.log('masco:' + mascoCode);
        console.log('rptId:' + rptId);
        console.log('number of intersecting DESCRIPTION items: ' + info.length);
        console.log('number of mascoKeywords: ' + mascoKeys.length);
        console.log('percent Match with masco: ' + (info.length/mascoKeys.length)*100);
        console.log('intersecting keyword:' + info);

      }
    }
  }; 

  for (var i = rptData.length - 1; i >= 0; i--) {
    var self = rptData[i],
        titleTags = self.cleanDescTags,
        _id = self._id;

    if( titleTags) {

      var similarMascoItems = findKeywordOverlap(titleTags);

      findTitleIntersections(similarMascoItems, titleTags, _id);
    }
    
  }
};
function resetRptTitleEqTitle (col) {
  var data = Rpt.find();
  var removeData = function(_id) {
    Rpt.update(
      {_id: _id}, 
      { 
        $unset: { 
          titleEqTitle: ""
        }
      }, function(err,res) {
          if( err) {
            console.log(err);
          }
      }
    );  
  }

  data.forEach(function (el) {
    var id = el._id;

    if ( id ) {
      removeData(id);
    }
  });
};
function resetRptTitleInKeywords (col) {
  var data = Rpt.find();
  var removeData = function(_id) {
    Rpt.update(
      {_id: _id}, 
      { 
        $unset: { 
          titleInKeywords: ""
        }
      }, function(err,res) {
          if( err) {
            console.log(err);
          } else {
            console.log('successfully completed resetting titleInKeywords. ' + res + 'items removed');
          }
      }
    );  
  }

  data.forEach(function (el) {
    var id = el._id;

    if ( id ) {
      removeData(id);
    }
  });
};
function resetRptTitleIntersection (col) {
  var data = Rpt.find();
  var removeData = function(_id) {
    Rpt.update(
      {_id: _id}, 
      { 
        $unset: { 
          titleInKeywords: ""
        }
      }, function(err,res) {
          if( err) {
            console.log(err);
          } else {
            console.log('successfully completed resetting titleInKeywords. ' + res + 'items removed');
          }
      }
    );  
  }

  data.forEach(function (el) {
    var id = el._id;

    if ( id ) {
      removeData(id);
    }
  });
};
function resetRptDesIntersection (col) {
  var data = Rpt.find();
  var removeData = function(_id) {
    Rpt.update(
      {_id: _id}, 
      { 
        $unset: { 
          titleInKeywords: "",
        }
      }, function(err,res) {
          if( err) {
            console.log(err);
          } else {
            console.log('successfully completed resetting titleInKeywords. ' + res + 'items removed');
          }
      }
    );  
  }

  data.forEach(function (el) {
    var id = el._id;

    if ( id ) {
      removeData(id);
    }
  });
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
  resetRptTitleEqTitle: function () {
    resetRptTitleEqTitle();
  },
  resetRptTitleInKeywords: function () {
    resetRptTitleInKeywords();
  }
});