var stopwords = [];
stopwords.push('and','or','of');

function insertMascoFour(data) {

  check( data, Object );

  var title = data.description_4_digit,
  officialCode = data.id,
  cleanTitle = title.trim().toLowerCase().replace(',','').replace('/',' '),
  titleTags = Yaki(cleanTitle).split();

  titleTags.push(cleanTitle);
  
  var cleanTags = _.reject(titleTags, function(el){
   return (el == 'and' || el == 'or' || el == 'of');
  });

  console.log('cleanTags', cleanTags);

  function insertNewFour (id, title, tags) {
    MascoFour.insert({
      id: id,
      cleanTitle: title,
      titleTags: tags
    });
  }
  // if (ti)
  insertNewFour( officialCode, cleanTitle, cleanTags);

  console.log('completed mascoFour insert');
}
function insertMascoFive(data) {
  check( data, Object );
  // console.log('called insertMascoFive');
  var title = data.description_5_digit,
  officialCode = data.id,
  cleanTitle = data.description_5_digit.trim().toLowerCase().replace(',','').replace('/',' '),
  mapToFour = officialCode.substr(0, 4),
  titleTags = Yaki(cleanTitle).split();
  console.log('insertMasco5 cleanTitle ' + cleanTitle);


  titleTags.push(cleanTitle);
  var cleanTags = _.reject(titleTags, function(el){
     return (el == 'and' || el == 'or' || el == 'of');
  });
  console.log('insertMasco5 cleantags ' + cleanTags);

  // if (title){
  //   mapToFour = officialCode.substr(0,4);
  //   console.log('insertMasco5 maptoFour ' + mapToFour);
  // }
  
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

function insertMasterFour(data) {
  // check( data, Object );
  console.log('called insertMasterFour');
  var title = data.description_4_digit,
  officialCode = data.id,
  cleanTitle = title.trim().toLowerCase().replace(',','').replace('/',' '),
  titleTags = Yaki(cleanTitle).split();

  titleTags.push(cleanTitle);

  var cleanTags = _.reject(titleTags, function(el){
   return (el == 'and' || el == 'or' || el == 'of');
  });

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
  cleanTitle = title.trim().toLowerCase().replace(',','').replace('/',' '),
  mapToFour = officialCode.substr(0, 4),
  titleTags = Yaki(cleanTitle).split();

  titleTags.push(cleanTitle);

  var cleanTags = _.reject(titleTags, function(el){
   return (el == 'and' || el == 'or' || el == 'of');
  });

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
  parseUploadRep: function( data) {
    check( data, Array );

    for ( i = 0; i < data.length; i++ ) {
      item   = data[ i ],
      exists = Rep.findOne( { id: item.id } );

      if ( !exists ) {
        Rep.insert( item );
      } else {
        console.warn( 'Rejected. This item already exists in Rep.' );
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
  }
});