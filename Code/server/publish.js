import { Meteor } from 'meteor/meteor';

//import { Entries } from '../imports/api/entries.js';
import '../imports/api/entries.js';

/*Meteor.publish('Entries', function(){
    return Entries.find();
});*/

Meteor.publish('Entries', function(search){
    //console.log("publishing entries on server... search: " + search);
    let query      = {},
    projection = { limit: 10, sort: { dateCreated: -1 } };

    if ( search ) {
      let regex = new RegExp( search, 'i' );
      //console.log("setting up query: " + search);
      query = {
        $or: [
          { userId: this.userId },
          { title: regex },
          //{ entryType: regex },
          //{ dateCreated: regex },
        ]
      };

      projection.limit = 100;
    }
    try {
      //throw new Meteor.Error('Publication error', 'api/entries.js')
      //console.log("finding entries...");
      return Entries.find( query, projection );
    } catch (e) {
      console.log("Publication error in api/entries.js", e)
      //this.error(e)
    }
});
//for detailed page
Meteor.publish('singleEntry', function(id){
    check(id, String);
    return Entries.find({_id: id})
});
