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
          percentMatchTitleDenomMasco: ""
        }
      }, function(err,res) {
          if( err) {
            console.log(err);
          } else {
            console.log('successfully completed resetting percentMatchTitleDenomMasco. ' + res + 'items removed');
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
resetRptTitleEqTitle: function () {
  resetRptTitleEqTitle();
},
resetRptTitleInKeywords: function () {
  resetRptTitleInKeywords();
},
resetRptTitleIntersection: function () {
  resetRptTitleIntersection();
},
resetRpt: function () {
  Rpt.remove({});
},
resetRep: function () {
  Rep.remove({});
},
resetMascoKey: function () {
  MascoKey.remove({});
},
resetMascoFour: function () {
  MascoFour.remove({});
},
resetMascoFive: function () {
  MascoFive.remove({});
},
resetrepTitleTagMatchStrong: function () {
  var data = Rpt.find({});
  var count = 0;
  data.forEach(function (el) {
    count += 1;
    Rpt.update({_id: el._id}, {$set: { repTitleTagMatchStrong: []}}, 
      function(err,res){
      if (err) {console.log(err)}
        else{
          console.log('repTitleTagMatchStrong delete successful');
        }
    }
    );
  });

  console.log('updated # of items ' + count );
},
resetrepTitleTagMatchWeak: function () {
  var data = Rpt.find({});
  var count = 0;
  data.forEach(function (el) {
    count += 1;
    Rpt.update({_id: el._id}, {$set: { repTitleTagMatchWeak: []}}, 
      function(err,res){
      if (err) {console.log(err)}
        else{
          console.log('repTitleTagMatchWeak delete successful');
        }
    }
    );
  });

  console.log('updated # of items ' + count );
},
resetmascoTitleTagFourWeak: function () {
  var data = Rpt.find({});
  var count = 0;
  data.forEach(function (el) {
    count += 1;
    Rpt.update({_id: el._id}, {$set: { mascoTitleTagFourWeak: []}}, 
      function(err,res){
      if (err) {console.log(err)}
        else{
          console.log('mascoTitleTagFourWeak delete successful');
        }
    }
    );
  });

  console.log('updated # of items ' + count );
},
resetmascoTitleTagFourStrong: function () {
  var data = Rpt.find({});
  var count = 0;
  data.forEach(function (el) {
    count += 1;
    Rpt.update({_id: el._id}, {$set: { mascoTitleTagFourStrong: []}}, 
      function(err,res){
      if (err) {console.log(err)}
        else{
          console.log('mascoTitleTagFourStrong delete successful');
        }
    }
    );
  });

 console.log('resetmascoTitleTagFourStrong complete');
},
resetmascoTitleTagFiveStrong: function () {
  var data = Rpt.find({});
  var count = 0;
  data.forEach(function (el) {
    count += 1;
    Rpt.update({_id: el._id}, {$set: { mascoTitleTagFiveStrong: []}}, 
      function(err,res){
      if (err) {console.log(err)}
        else{
          console.log('mascoTitleTagFiveStrong delete successful');
        }
    }
    );
  });

  console.log('resetmascoTitleTagFiveStrong complete');
}
});