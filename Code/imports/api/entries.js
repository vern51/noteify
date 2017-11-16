// Entries COLLECTION
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Entries = new Mongo.Collection('entries');

Entries.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 100
  },
  entryType: {
    type: String,
    autoform: {
    type: "select",
    options: function () {
      return [
        {label: "Note", value: "note"},
        {label: "Task", value: "task"},
        {label: "Event", value: "event"}
      ];
    }
  }
  },
  externalEntryId: {
    type: String,
    //regex: SimpleSchema.Regex.Id,
  },
  dateCreated: {
    type: Date,
    autoValue: function () {
      return new Date();
    }
  },
  //Start Note Properties
  /*description: {
    type: String,
    label: "Description"
    autoform: {
         type: 'textarea'
    }
  },*/

  /*,
  locationCreated: {

  },
  entryId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },*/


}, { tracker: Tracker }));

if (Meteor.isServer) {
  // Only runs on the server
  // Only publish tasks that belong to current user
  Meteor.publish('entries', function entriesPublication() {
    return Entries.find({
      $or: [
        { userId: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'entries.insert'(title, entryType) {
    check(title, String);
    check(entryType, String);
    console.log("inserting: ", title);
    // Make sure user is logged in before inserting entry
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Entries.insert({
      title: title,
      entryType: entryType,
      //dateCreated: ,
      //locationCreated: ,
      userId: this.userId,
    });
  },
  'entries.remove': function(entryId) {
    check(entryId, String);

    const entry = Entries.findOne(entryId);
    if (entry.owner !== this.userId) {
      // Ensure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Entries.remove(entryId);
  },
  'entries.setChecked': function(entryId, setChecked) {
    check(entryId, String);
    check(setChecked, Boolean);

    const entry = Entries.findOne(entryId);
    if (entry.owner !== this.userId) {
      // Enure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Entries.update(entryId, { $set: { checked: setChecked } });
  }
});

export default Entries;
