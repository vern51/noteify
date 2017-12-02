import { Meteor } from 'meteor/meteor';

//import { Entries } from '../imports/api/entries.js';
import '../imports/api/entries.js';

Meteor.publish('Entries', function(){
    return Entries.find();
});
//for detailed page
Meteor.publish('singleEntry', function(id){
    check(id, String);
    return Entries.find({_id: id})
});
