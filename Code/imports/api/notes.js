// Notes COLLECTION
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

import Entries from './entries.js';

export const Notes = new Mongo.Collection('notes');

Notes.attachSchema((new SimpleSchema([Entries, {
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  noteId: {
    type: String,
  }
  entryId: {
    type: String,
    //regEx: SimpleSchema.RegEx.Id,
  },
  userId: {
    type: String,
    //regEx: SimpleSchema.RegEx.Id,
  },
  description: {
    type: String,
    label: "Description",
    autoform: {
         type: 'textarea'
    },
  },
}])));

if (Meteor.isServer) {
  // Only runs on the server
  // Only publish tasks that belong to current user
  Meteor.publish('notes', function notesPublication() {
    return Notes.find({
      $or: [
        { owner: this.userId },
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
  }
});

export default Notes;
