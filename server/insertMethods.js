
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
function runRejectedTags(array) {
  return _.reject(array, function(el){
     return (el == 'and' || el == 'or' || el == 'of'|| el == 'not'|| el == 'elsewhere'|| el == 'other'|| el == ''|| el == '1'|| el == '2'|| el == '3'|| el == '4'|| el == '5'|| el == '6'|| el == 'br');
    });
}
function findUniques(array){
  return _.uniq(array);
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
findUniqueMascoFiveKeywords: function () {
  findUniqueMascoKeywords();
},
});
