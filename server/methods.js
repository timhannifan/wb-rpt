
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
      exists = Rep.findOne( { masco: item.masco } );

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
      MascoFive.insert( item );
      exists = MascoFive.findOne( { id: item.id } );

      if ( !exists ) {
        MascoFive.insert( item );
      } else {
        console.warn( 'Rejected. This item already exists in MascoFive.' );
        console.log(item);      
      }
    }
  },
  parseUploadMascoFour: function( data) {
    check( data, Array );

    for ( i = 0; i < data.length; i++ ) {
      item   = data[ i ],
      MascoFour.insert( item );
      exists = MascoFour.findOne( { id: item.id } );

      if ( !exists ) {
        MascoFour.insert( item );
      } else {
        console.warn( 'Rejected. This item already exists in MascoFour.' );
        console.log(item);      
      }
    }
  },
  parseUploadMascoThree: function( data) {
    check( data, Array );

    for ( i = 0; i < data.length; i++ ) {
      item   = data[ i ],
      MascoThree.insert( item );
      exists = MascoThree.findOne( { id: item.id } );

      if ( !exists ) {
        MascoThree.insert( item );
      } else {
        console.warn( 'Rejected. This item already exists in MascoThree.' );
        console.log(item);      
      }
    }
  },  
});