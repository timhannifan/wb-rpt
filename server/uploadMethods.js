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
function insertRptCallback (item) {
  Rpt.insert(item, function(err,res) {
    if (err) {
      console.log(err);
    } else{
      console.log('successfully inserted new Rpt item');
    }
  });
}
function insertMascoFour(data) {

  check( data, Object );

  var title = data.description_4_digit,
  officialCode = data.id,
  cleanTitle = cleanUp(data.description_4_digit),
  tagsOnly = yakiSplitClean(cleanTitle),
  titleTags = yakiSplitClean(cleanTitle);

  titleTags.push(cleanTitle);
  
  var cleanTags = _.uniq(_.reject(titleTags, function(el){
   return (el == 'and' || el == 'or' || el == 'of'|| el == 'not'|| el == 'elsewhere'|| el == 'other'|| el == ''|| el == '1'|| el == '2'|| el == '3'|| el == '4'|| el == '5'|| el == '6'|| el == 'br');
  }));

  var cleanTagsOnly = _.uniq(_.reject(tagsOnly, function(el){
   return (el == 'and' || el == 'or' || el == 'of'|| el == 'not'|| el == 'elsewhere'|| el == 'other'|| el == ''|| el == '1'|| el == '2'|| el == '3'|| el == '4'|| el == '5'|| el == '6'|| el == 'br');
  }));

  function insertNewFour (id, title, tags, tagsOnly) {
    MascoFour.insert({
      id: id,
      cleanTitle: title,
      tagsOnly: tagsOnly,
      titleTags: tags
    });
  }
  insertNewFour( officialCode, cleanTitle, cleanTags, cleanTagsOnly);

  console.log('completed mascoFour insert');
}
function insertMascoFive(data) {
  check( data, Object );

  var title = data.description_5_digit,
  officialCode = data.id,
  cleanTitle = cleanUp(data.description_5_digit),
  mapToFour = officialCode.substr(0, 4),
  tagsOnly = yakiSplitClean(cleanTitle),
  titleTags = yakiSplitClean(cleanTitle);

  titleTags.push(cleanTitle);

  var cleanTags = _.uniq(_.reject(titleTags, function(el){
   return (el == 'and' || el == 'or' || el == 'of'|| el == 'not'|| el == 'elsewhere'|| el == 'other'|| el == ''|| el == '1'|| el == '2'|| el == '3'|| el == '4'|| el == '5'|| el == '6'|| el == 'br');
  }));

  var cleanTagsOnly = _.uniq(_.reject(tagsOnly, function(el){
   return (el == 'and' || el == 'or' || el == 'of'|| el == 'not'|| el == 'elsewhere'|| el == 'other'|| el == ''|| el == '1'|| el == '2'|| el == '3'|| el == '4'|| el == '5'|| el == '6'|| el == 'br');
  }));
  
  function insertMascoFive (id, mapToFour, title, tags, cleanTags) {
    MascoFive.insert({
      id: id,
      mapToFour: mapToFour,
      cleanTitle: title,
      titleTags: tags,
      tagsOnly: cleanTags
    });
  }

  insertMascoFive( officialCode, mapToFour, cleanTitle, cleanTags, cleanTagsOnly);

  console.log('completed mascoFive insert');
}
function insertMasterFour(data) {
  // check( data, Object );
  console.log('called insertMasterFour');
  var title = data.description_4_digit,
  officialCode = data.id,
  cleanTitle = cleanUp(data.description_4_digit),
  titleTags = yakiSplitClean(cleanTitle);

  titleTags.push(cleanTitle);

  var cleanTags = _.uniq(_.reject(titleTags, function(el){
   return (el == 'and' || el == 'or' || el == 'of'|| el == 'not'|| el == 'elsewhere'|| el == 'other'|| el == ''|| el == '1'|| el == '2'|| el == '3'|| el == '4'|| el == '5'|| el == '6'|| el == 'br');
  }));

  var insert = {
    officialCode: data.id,
    officialTitle: cleanTitle,
    keywords: cleanTags
  };
  MascoKey.insert(insert);

  console.log('inserted new mascoKey item');
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
    item.cleanTitle = cleanUp(item.title);
    item.titleTags = yakiSplitClean(item.cleanTitle);
    item.tagsOnly = yakiSplitClean(item.cleanTitle);
  }

  if(item.titleTags && item.tagsOnly) {
    item.titleTags.push(item.cleanTitle);
    item.cleanTags = _.uniq(_.reject(item.titleTags, function(el){
     return (el == 'and' || el == 'or' || el == 'of'|| el == 'not'|| el == 'elsewhere'|| el == 'other'|| el == ''|| el == '1'|| el == '2'|| el == '3'|| el == '4'|| el == '5'|| el == '6'|| el == 'br');
    })); 
    item.cleanTagsOnly = _.uniq(_.reject(item.tagsOnly, function(el){
     return (el == 'and' || el == 'or' || el == 'of'|| el == 'not'|| el == 'elsewhere'|| el == 'other'|| el == ''|| el == '1'|| el == '2'|| el == '3'|| el == '4'|| el == '5'|| el == '6'|| el == 'br');
    }));        
  }

  function insertCallback (item) {
    console.log('inserting REP item: ' + item);
    Rep.insert(item);
  }

  insertCallback( item );
}
function insertRpt(data) {
  check( data, Object );

  var item= {};
  item.id = data.id;
  item.occ_title = data.occ_title;
  item.occ_desc = data.occ_desc;
  item.firm_name = data.firm_name;
  item.sector = data.sector;
  // item.educ_fos = data.educ_fos;

  if (item.occ_title) {
    item.cleanTitle = cleanUp(item.occ_title);
  }
  if (item.cleanTitle) {
    item.titleTags = yakiSplitClean(item.cleanTitle);
    item.tagsOnly = yakiSplitClean(item.cleanTitle);
  }
  if (item.occ_desc) {
    item.cleanDesc = cleanUp(item.occ_desc);
  }  
  if (item.cleanDesc) {
    item.descTags = yakiSplitClean(item.cleanDesc);
  }

  if(item.titleTags && item.tagsOnly) {
    item.titleTags.push(item.cleanTitle);
    item.cleanTitleTags = _.uniq(_.reject(item.titleTags, function(el){
     return (el == 'and' || el == 'or' || el == 'of'|| el == 'not'|| el == 'elsewhere'|| el == 'other'|| el == ''|| el == '1'|| el == '2'|| el == '3'|| el == '4'|| el == '5'|| el == '6'|| el == 'br');
    }));
    item.cleanTagsOnly = _.uniq(_.reject(item.tagsOnly, function(el){
     return (el == 'and' || el == 'or' || el == 'of'|| el == 'not'|| el == 'elsewhere'|| el == 'other'|| el == ''|| el == '1'|| el == '2'|| el == '3'|| el == '4'|| el == '5'|| el == '6'|| el == 'br');
    }));        
  }

  if(item.descTags) {
    item.descTags.push(item.cleanDesc);
    item.cleanDescTags = _.uniq(_.reject(item.descTags, function(el){
     return (el == 'and' || el == 'or' || el == 'of'|| el == 'not'|| el == 'elsewhere'|| el == 'other'|| el == ''|| el == '1'|| el == '2'|| el == '3'|| el == '4'|| el == '5'|| el == '6'|| el == 'br');
    }));    
  }

  insertRptCallback( item );
}
function insertMasterFive(data) {
  check( data, Object );

  var title = data.description_5_digit,
  officialCode = data.id,
  cleanTitle = cleanUp(data.description_5_digit),
  mapToFour = officialCode.substr(0, 4),
  titleTags = yakiSplitClean(item.cleanTitle);

  titleTags.push(cleanTitle);

  var cleanTags = _.uniq(_.reject(titleTags, function(el){
   return (el == 'and' || el == 'or' || el == 'of'|| el == 'not'|| el == 'elsewhere'|| el == 'other'|| el == ''|| el == '1'|| el == '2'|| el == '3'|| el == '4'|| el == '5'|| el == '6'|| el == 'br');
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

    cleanTitle = cleanUp(title);
    titleTags = yakiSplitClean(cleanTitle);
    titleTags.push(cleanTitle);

    var cleanTags = _.uniq(_.reject(titleTags, function(el){
      return (el == 'and' || el == 'or' || el == 'of'|| el == 'not'|| el == 'elsewhere'|| el == 'other'|| el == ''|| el == '1'|| el == '2'|| el == '3'|| el == '4'|| el == '5'|| el == '6'|| el == 'br');
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
  parseUploadRpt: function( data) {
    check( data, Array );

    for ( i = 0; i < data.length; i++ ) {
      item   = data[ i ],
      exists = Rpt.findOne( { id: item.id } );

      if ( !exists ) {
        insertRpt( item );
      } else {
        console.warn( 'Rejected. This item already exists in Rpt: ' + item.id );
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
  findUniqueMascoKeywords: function () {
    findUniqueMascoKeywords();
  },
});