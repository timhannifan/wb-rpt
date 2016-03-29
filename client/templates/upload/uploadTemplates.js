Template.uploadMascoFive.onCreated(function() {
  Template.instance().uploading = new ReactiveVar( false );
});

Template.uploadMascoFive.helpers({
  uploading: function() {
    return Template.instance().uploading.get();
  }
});

Template.uploadMascoFive.events({
  'change [name="uploadCSV"]': function( event, template ) {
    template.uploading.set( true );

    Papa.parse( event.target.files[0], {
      header: true,
      complete: function( results, file ) {
        Meteor.call( 'parseUploadMascoFive', results.data, function( error, response ) {
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

Template.uploadMascoFour.onCreated(function() {
  Template.instance().uploading = new ReactiveVar( false );
});

Template.uploadMascoFour.helpers({
  uploading: function() {
    return Template.instance().uploading.get();
  }
});

Template.uploadMascoFour.events({
  'change [name="uploadCSV"]': function( event, template ) {
    template.uploading.set( true );

    Papa.parse( event.target.files[0], {
      header: true,
      complete: function( results, file ) {
        Meteor.call( 'parseUploadMascoFour', results.data, function( error, response ) {
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

Template.uploadMascoThree.onCreated(function() {
  Template.instance().uploading = new ReactiveVar( false );
});

Template.uploadMascoThree.helpers({
  uploading: function() {
    return Template.instance().uploading.get();
  }
});

Template.uploadMascoThree.events({
  'change [name="uploadCSV"]': function( event, template ) {
    template.uploading.set( true );

    Papa.parse( event.target.files[0], {
      header: true,
      complete: function( results, file ) {
        Meteor.call( 'parseUploadMascoThree', results.data, function( error, response ) {
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