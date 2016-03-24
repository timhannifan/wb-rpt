Template.uploadRpt.onCreated(function() {
  Template.instance().uploading = new ReactiveVar( false );
});

Template.uploadRpt.helpers({
  uploading: function() {
    return Template.instance().uploading.get();
  },
  uploads: function() {
    return Uploads.find().fetch();
  },
});

Template.uploadRpt.events({
  'change [name="uploadCSV"]': function( event, template ) {
  	template.uploading.set( true );

  	Papa.parse( event.target.files[0], {
  	  header: true,
  	  complete: function( results, file ) {
  	    Meteor.call( 'parseUploadRpt', results.data, function( error, response ) {
  	      if ( error ) {
  	        console.log( error.reason );
  	      } else {
  	        template.uploading.set( false );
  	        Bert.alert( 'Upload complete!', 'success', 'growl-top-right' );
  	      }
  	    });
  	  }
	  });
	}
});

Template.uploadRep.onCreated(function() {
  Template.instance().uploading = new ReactiveVar( false );
});

Template.uploadRep.helpers({
  uploading: function() {
    return Template.instance().uploading.get();
  },
  uploads: function() {
    return Uploads.find().fetch();
  },
});

Template.uploadRep.events({
  'change [name="uploadCSV"]': function( event, template ) {
    template.uploading.set( true );

    Papa.parse( event.target.files[0], {
      header: true,
      complete: function( results, file ) {
        Meteor.call( 'parseUploadRep', results.data, function( error, response ) {
          if ( error ) {
            console.log( error.reason );
          } else {
            template.uploading.set( false );
            Bert.alert( 'Upload complete!', 'success', 'growl-top-right' );
          }
        });
      }
    });
  }
});

Template.uploadMasco.onCreated(function() {
  Template.instance().uploading = new ReactiveVar( false );
});

Template.uploadMasco.helpers({
  uploading: function() {
    return Template.instance().uploading.get();
  },
  uploads: function() {
    return Uploads.find().fetch();
  },
});

Template.uploadMasco.events({
  'change [name="uploadCSV"]': function( event, template ) {
    template.uploading.set( true );

    Papa.parse( event.target.files[0], {
      header: true,
      complete: function( results, file ) {
        Meteor.call( 'parseUploadMasco', results.data, function( error, response ) {
          if ( error ) {
            console.log( error.reason );
          } else {
            template.uploading.set( false );
            Bert.alert( 'Upload complete!', 'success', 'growl-top-right' );
          }
        });
      }
    });
  }
});