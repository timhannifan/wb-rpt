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
/// mascoTitleTagFiveStrong
var mascoTitleTagFiveStrong = function () {
  console.log('inside fivestrong');
  var mascoFetch = MascoFive.find({}).fetch();

  function updateFiveMatches(array, masco4Code, masco5Code) {
    var data = array;

    for (var i = data.length - 1; i >= 0; i--) {
      console.log('updating Rpt _id ' +data[i]._id+ ' with masco code: '+ masco4Code + ' for mascoTitleTagFiveStrong');
      
      Rpt.update({_id: data[i]._id }, 
        {
          $set: { 
            mascoTitleTagFiveStrong: masco4Code,
            mascoFiveCompleteFlag: 1,
            mascoFiveStrongMatch:  masco5Code
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
    
    // var self = mascoFetch[i],
    // tags = mascoFetch[i].tagsOnly,
    // _id = mascoFetch[i]._id,
    // id = mascoFetch[i].mapToFour;

    console.log('searching for masco5Tags: ' + mascoFetch[i].tagsOnly);
    updateFiveMatches(findMatches(mascoFetch[i].tagsOnly),  mascoFetch[i].mapToFour,  mascoFetch[i].id);

  }
};
/// repTitleTagMatchStrong 
var repTitleTagMatchStrong = function () {
  var keyFetch = Rep.find({}).fetch();
   function updateRepMatches(array, mascoCode, repmatchid) {
      var data = array;

      for (var i = data.length - 1; i >= 0; i--) {
        console.log('updating Rpt _id ' +data[i]._id+ ' with masco code: '+ mascoCode + ' for repTitleTagMatchStrong');
        
        Rpt.update({_id: data[i]._id }, {
            $push: { 
              repTitleTagMatchStrong: {
                mascoCode: mascoCode,
                repTitleTagMatch: repmatchid
              }
            }
          });
      }
  }

  function findMatches(tagArray) {
    return Rpt.find({ cleanTagsOnly: {  $all: tagArray } }).fetch();
  }
  
  for (var i = keyFetch.length - 1; i >= 0; i--) {
    console.log('searching for REP tags: ' + keyFetch[i].cleanTagsOnly);

    updateRepMatches(_.uniq(findMatches(keyFetch[i].cleanTagsOnly)),  keyFetch[i].mapToFour,  keyFetch[i]._id);

  }
};

Meteor.methods({

runTitleEqTitle: function() {
  runTitleEqTitle();
},

runTitleInKeywords: function() {
  runTitleInKeywords();
},

mascoTitleTagFiveStrong: function() {
  mascoTitleTagFiveStrong();
},

mascoTitleTagFourStrong: function() {
  mascoTitleTagFourStrong();
},

mascoTitleTagFiveWeak: function() {
  mascoTitleTagFiveWeak();
},

mascoTitleTagFourWeak: function() {
  mascoTitleTagFourWeak();
},

repTitleTagMatchWeak: function() {
  repTitleTagMatchWeak();
},

repTitleTagMatchStrong: function() {
  repTitleTagMatchStrong();
}    

});