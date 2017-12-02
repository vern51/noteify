import { Entries } from '../imports/api/entries.js';
import '../imports/api/entries.js';

Meteor.publish('entries', function(){
    return Entries.find({userId: this.userId})
});
//for detailed page
Meteor.publish('singleEntry', function(id){
    check(id, String);
    return Entries.find({_id: id})
});
