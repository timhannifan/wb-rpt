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
	resetRepTitleTagFourStrong: function () {
	  var data = Rpt.find({});
	  var count = 0;
	  data.forEach(function (el) {
	    count += 1;
	    Rpt.update({_id: el._id}, {$unset: { repTitleTagFourStrong: ""}}, 
	      function(err,res){
	      if (err) {console.log(err)}
	        else{
	          console.log('delete successful');
	        }
	    }
	    );
	  });

	  console.log('updated # of items ' + count );
	}
})