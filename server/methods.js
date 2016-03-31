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
  }
});