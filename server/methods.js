var stopwords = [];
stopwords.push('and','or','of');

function cleanUpTitle(string) {
  return string.toLowerCase().replace(',','').replace('/',' ').replace('&','and').replace('+','and').replace('-',' ').replace('(','').replace(')','').replace(' / ',' ').replace(' /',' ').replace('/ ',' ').trim();
}
function insertMascoFour(data) {

  check( data, Object );

  var title = data.description_4_digit,
  officialCode = data.id,
  cleanTitle = cleanUpTitle(data.description_4_digit),
  titleTags = Yaki(cleanTitle).split().clean();

  titleTags.push(cleanTitle);
  
  var cleanTags = _.uniq(_.reject(titleTags, function(el){
   return (el == 'and' || el == 'or' || el == 'of'|| el == 'not'|| el == 'elsewhere'|| el == 'other'|| el == '');
  }));

  console.log('cleanTags', cleanTags);

  function insertNewFour (id, title, tags) {
    MascoFour.insert({
      id: id,
      cleanTitle: title,
      titleTags: tags
    });
  }
  insertNewFour( officialCode, cleanTitle, cleanTags);

  console.log('completed mascoFour insert');
}
function insertMascoFive(data) {
  check( data, Object );

  var title = data.description_5_digit,
  officialCode = data.id,
  cleanTitle = cleanUpTitle(data.description_5_digit),
  mapToFour = officialCode.substr(0, 4),
  titleTags = Yaki(cleanTitle).split().clean();
  console.log('insertMasco5 cleanTitle ' + cleanTitle);


  titleTags.push(cleanTitle);
  var cleanTags = _.uniq(_.reject(titleTags, function(el){
   return (el == 'and' || el == 'or' || el == 'of'|| el == 'not'|| el == 'elsewhere'|| el == 'other'|| el == '');
  }));
  console.log('insertMasco5 cleantags ' + cleanTags);
  
  function insertMascoFive (id, mapToFour, title, tags) {
    MascoFive.insert({
      id: id,
      mapToFour: mapToFour,
      cleanTitle: title,
      titleTags: tags

    });
  }

  insertMascoFive( officialCode, mapToFour, cleanTitle, cleanTags);

  console.log('completed mascoFive insert');
}
function insertRep(data) {
  check( data, Object );

  var item= {};

  item.title = data.job1_position;
  item.employer = data.job1_employer;
  item.acad1_name = data.acad1_name;
  item.acad1_fos = data.acad1_fos;
  item.acad1_qual = data.acad1_qual;
  item.id = data.id;
  item.mapToFour = data.masco_4;

  if (item.title) {
    item.cleanTitle = cleanUpTitle(item.title);
    item.titleTags = Yaki(item.cleanTitle).split().clean();
  }
  if(item.titleTags && item.cleanTitle) {
    item.titleTags.push(item.cleanTitle);
    item.cleanTags = _.uniq(_.reject(item.titleTags, function(el){
     return (el == 'and' || el == 'or' || el == 'of'|| el == 'not'|| el == 'elsewhere'|| el == 'other'|| el == '');
    }));    
  }

  function insertCallback (item) {
    console.log('inserting REP item: ' + item);
    Rep.insert(item);
  }

  insertCallback( item );
}
function insertMasterFour(data) {
  // check( data, Object );
  console.log('called insertMasterFour');
  var title = data.description_4_digit,
  officialCode = data.id,
  cleanTitle = cleanUpTitle(data.description_4_digit),
  titleTags = Yaki(cleanTitle).split().clean();

  titleTags.push(cleanTitle);

  var cleanTags = _.uniq(_.reject(titleTags, function(el){
   return (el == 'and' || el == 'or' || el == 'of'|| el == 'not'|| el == 'elsewhere'|| el == 'other'|| el == '');
  }));

  var insert = {
    officialCode: data.id,
    officialTitle: cleanTitle,
    keywords: cleanTags
  };
  MascoKey.insert(insert);

  console.log('inserted new mascoKey item');
}
function insertMasterFive(data) {
  check( data, Object );

  var title = data.description_5_digit,
  officialCode = data.id,
  cleanTitle = cleanUpTitle(data.description_5_digit),
  mapToFour = officialCode.substr(0, 4),
  titleTags = Yaki(cleanTitle).split().clean();

  titleTags.push(cleanTitle);

  var cleanTags = _.uniq(_.reject(titleTags, function(el){
   return (el == 'and' || el == 'or' || el == 'of'|| el == 'not'|| el == 'elsewhere'|| el == 'other'|| el == '');
  }));

  var lookupFourDigitKey = MascoKey.findOne({officialCode: mapToFour});

  for (var i = cleanTags.length - 1; i >= 0; i--) {

    console.log('mapToFour ' + mapToFour );
    // console.log('lookupFourDigitKey ' + lookupFourDigitKey._id );

    MascoKey.update({officialCode: mapToFour},
      {
        $push: {
          keywords: cleanTags[i]
        }
      }
    );
  }
}
function insertMasterRep(data) {
  check( data, Object );

  var title = data.job1_position,
  employer = data.job1_employer,
  acad1_name = data.acad1_name,
  acad1_fos = data.acad1_fos,
  acad1_qual = data.acad1_qual,
  id = data.id,
  mapToFour = data.masco_4;

  if (title && mapToFour){
    var lookupFourDigitKey = MascoKey.findOne({officialCode: mapToFour});

    cleanTitle = cleanUpTitle(title);
    titleTags = Yaki(cleanTitle).split().clean();
    titleTags.push(cleanTitle);

    var cleanTags = _.uniq(_.reject(titleTags, function(el){
      return (el == 'and' || el == 'or' || el == 'of'|| el == 'not'|| el == 'elsewhere'|| el == 'other'|| el == '');
    }));

    for (var i = cleanTags.length - 1; i >= 0; i--) {
      console.log('mapToFour REP ' + mapToFour );
      MascoKey.update({officialCode: mapToFour},
        {
          $push: {
            keywords: cleanTags[i]
          }
        }
      );
    }
  }
}
function findUniqueMascoKeywords(argument) {
  var data = MascoKey.find({});

  function updateUniques (array, _id) {
    MascoKey.update({_id: _id}, { $unset: { keywords: ""}}, function(err,res) {
        if( err) {
          console.log(err);
        } else {
          console.log(res + ' items remove by updateUniques...adding new unique array');
          MascoKey.update({_id: _id}, {$set: {keywords: array}}, function (error, res2){
            if(error) {
              console.log(error);
            } else {
              console.log('successfully completed updateUniques ' + res2);
            }
          });
        }
      }
    );
  }

  data.forEach(function (el) {
    var id = el._id,
    tags = el.keywords;

    if ( tags && id ) {
      updateUniques(_.uniq(tags), id);
    }
  });
}
var runExactTitleMatch = function () {
  var data = MascoKey.find({}).fetch();

  function updateMatches(array, mascoCode) {
    var matches = array;

    for (var i = matches.length - 1; i >= 0; i--) {
      console.log('updating ' +matches[i]._id+ ' with masco code: '+ mascoCode + ' for exactTitleMatch');
      
      Rpt.update({_id: matches[i]._id }, 
        {
          $push: { 
            exactTitleMatch: mascoCode 
          }
        }
      );
    }
  }

  // using mongo $in to select for strong equality on array match
  function findMatches(array) {
    return Rpt.find({ titleTags: { $in: array } }).fetch();
  }
  

  for (var i = data.length - 1; i >= 0; i--) {
    
    var self = data[i],
    _id = data[i]._id,
    keywords = data[i].keywords,
    officialTitle = data[i].officialTitle;
    officialCode = data[i].officialCode;

    if (officialTitle && officialCode){
      var found = findMatches([officialTitle]);
      updateMatches(found, data[i].officialCode);
      console.log('found an exactTitleMatch on masco ' + officialCode + ': ' + officialTitle);
    }
      
  }
};

var runRoughTest = function () {
  var data = MascoKey.find({}).fetch();

  function updateMatches(array, mascoCode) {
    var matches = array;

    for (var i = matches.length - 1; i >= 0; i--) {
      console.log('updating ' +matches[i]._id+ ' with masco code: '+ mascoCode + ' for runRoughTest');
      
      Rpt.update({_id: matches[i]._id }, 
        {
          $push: { 
            roughTestMatch: mascoCode 
          }
        }
      );
    }
  }

  // using mongo $in to select for strong equality on array match
  function findMatches(array) {
    return Rpt.find({ titleTags: { $in: array } }).fetch();
  }
  

  for (var i = data.length - 1; i >= 0; i--) {
    
    var self = data[i],
    _id = data[i]._id,
    keywords = data[i].keywords,
    officialTitle = data[i].officialTitle;
    officialCode = data[i].officialCode;

    if (officialTitle && officialCode && keywords){
      var found = findMatches(keywords);
      updateMatches(found, data[i].officialCode);
      console.log('found an exactTitleMatch on masco ' + officialCode + ': ' + officialTitle);
    }
      
  }
};
var percentMatch = function () {
  var mascoData = MascoKey.find({}).fetch();
  var rptData = Rpt.find({}).fetch();

  function findMatches(array) {
    return Rpt.find({ titleTags: { $in: array } }).fetch();
  }
  function findSimilarMascoKeys(keywordArray) {
    return MascoKey.find({ keywords: { $in: keywordArray } }).fetch();
  }
  function findTitleIntersections(idArray, rptKeywordArray, rptId) {
    check(idArray, Array);
    check(rptKeywordArray, Array);

    var data = idArray;

    for (var i = data.length - 1; i >= 0; i--) {
      var mascoItem =  MascoKey.findOne({ _id: data[i]._id });
      var mascoKeys = mascoItem.keywords;
      var mascoCode = mascoItem.officialCode;

      // console.log('inside intersection keywords', mascoItem._id);
      // console.log('inside intersection keywords', mascoItem.keywords);

      if (rptKeywordArray && mascoKeys && mascoCode) {
        var intersect = _.intersection(rptKeywordArray,mascoKeys);
        if(intersect) {
          if (intersect.length = 10){
            console.log('10 match on Rpt._id'+ rptId);
            Rpt.update({_id: rptId }, 
              {
                $push: { 
                  nGTE10: mascoCode
                  // intersect: intersect
                }
              }
            );
          }
          if (intersect.length = 9){
            console.log('9 match on Rpt._id'+ rptId);
            Rpt.update({_id: rptId }, 
              {
                $push: { 
                  nE9: mascoCode 
                }
              }
            );
          } 
          if (intersect.length = 8){
            console.log('8 match on Rpt._id'+ rptId);
            Rpt.update({_id: rptId }, 
              {
                $push: { 
                  nE8: mascoCode 
                }
              }
            );
          } 
          if (intersect.length = 7){
            console.log('7 match on Rpt._id'+ rptId);
            Rpt.update({_id: rptId }, 
              {
                $push: { 
                  nE7: mascoCode 
                }
              }
            );
          } 
          if (intersect.length = 6){
            console.log('6 match on Rpt._id'+ rptId);
            Rpt.update({_id: rptId }, 
              {
                $push: { 
                  nE6: mascoCode 
                }
              }
            );
          } 
          if (intersect.length = 5){
            console.log('5 match on Rpt._id'+ rptId);
            Rpt.update({_id: rptId }, 
              {
                $push: { 
                  nE5: mascoCode 
                }
              }
            );
          }  
          if (intersect.length = 4){
            console.log('4 match on Rpt._id'+ rptId);
            Rpt.update({_id: rptId }, 
              {
                $push: { 
                  nE4: mascoCode 
                }
              }
            );
          }
          if (intersect.length = 3){
            console.log('3 match on Rpt._id'+ rptId);
            Rpt.update({_id: rptId }, 
              {
                $push: { 
                  nE3: mascoCode 
                }
              }
            );
          }
          if (intersect.length = 2){
            console.log('2 match on Rpt._id'+ rptId);
            Rpt.update({_id: rptId }, 
              {
                $push: { 
                  nE2: mascoCode 
                }
              }
            );
          }
          // if (intersect.length = 2){
          //   console.log('2 match on Rpt._id'+ rptId);
          //   Rpt.update({_id: rptId }, 
          //     {
          //       $push: { 
          //         nE2: mascoCode 
          //       }
          //     }
          //   );
          // }                              
        // console.log('rptKeywordArray', rptKeywordArray.length);
        // console.log('mascoKeysArray', mascoKeys.length);
        // console.log('intersection', _.intersection(rptKeywordArray,mascoKeys));
        }
      }
    }
  } 

  for (var i = rptData.length - 1; i >= 0; i--) {
    var self = rptData[i],
        titleTags = self.cleanTitleTags,
        descTags = self.cleanDescTags,
        _id = self._id;

    if( titleTags && descTags && _id) {

      var simTitleTagArray = findSimilarMascoKeys(titleTags);

      findTitleIntersections(simTitleTagArray, titleTags, _id);
      // var simDescTagArray = findSimilarMascoKeys(descTags);
    }
    
  }
};
Meteor.methods({
  parseUploadRpt: function( data) {
    check( data, Array );

    for ( i = 0; i < data.length; i++ ) {
      item   = data[ i ],
      exists = Rpt.findOne( { id: item.id } );

      if ( !exists ) {
        Rpt.insert( item );
      } else {
        console.warn( 'Rejected. This item already exists in Rpt.' );
        console.log(item);      
      }
    }
  },

  parseUploadMascoFive: function( data) {
    check( data, Array );

    for ( i = 0; i < data.length; i++ ) {
      item   = data[ i ],
      exists = MascoFive.findOne( { description_5_digit: item.description_5_digit } );

      if ( !exists ) {
        insertMascoFive(item);
        insertMasterFive(item);
      
      } else {
        console.warn( 'Rejected. This item already exists in MascoFive.' );
      }
    }
  },
  parseUploadMascoFour: function( data) {
    check( data, Array );

    for ( i = 0; i < data.length; i++ ) {
      item   = data[ i ],
      exists = MascoFour.findOne( { id: item.id } );

      if ( !exists ) {
      
        insertMascoFour(item);
        insertMasterFour(item);
      } else {
        console.warn( 'Rejected. This item already exists in MascoFour.' );  
      }
    }
  },
  parseUploadRep: function( data) {
    check( data, Array );

    for ( i = 0; i < data.length; i++ ) {
      item   = data[ i ],
      exists = Rep.findOne( { id: item.id } );

      if ( !exists ) {
      
        insertRep(item);
        insertMasterRep(item);
      } else {
        console.warn( 'Rejected. This item already exists in MascoFour.' );  
      }
    }
  },
  findUniqueMascoKeywords: function () {
    findUniqueMascoKeywords();
  },
  runExactTitleMatch: function() {
    runExactTitleMatch();
  },
  runRoughTest: function() {
    runRoughTest();
  },
  percentMatch: function() {
    percentMatch();
  }
});