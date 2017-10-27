import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Entry } from '../classes/Entry.js';
import { EntryType } from '../classes/EntryType.js'

const Entries = new Mongo.Collection('entries');


// Try moving below to component
/* (Meteor.isServer) {
  // Only runs on server
  Meteor.publish('entries', function entriesPublication() {
      return Entries.find({
        $or: [
          //{ private: { $ne: true } },
          { user: this.userId },
        ],
      });
  });
}*/

Meteor.methods({
  //TODO: Add entry input for entry type, plus new methods for new entry subtypes linked to each entry
  'entries.insert'(text) {
    check(text, String);

    // Ensure user is logged in before inserting entry
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Entries.insert({
      title: text,
      //entryType: EntryType.NOTE,
      //createdAt: new Date(),
      userId: Meteor.userId(),
    });
  },
  'entries.remove'(entryId) {
    check(entryId, String);

    const entry = Entries.findOne(entryId);
    // Check if user has authority to remove entry
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Entries.remove(entryId);
  },
  'entries.setChecked'(entryId, setChecked) {
    check(entryId, String);
    check(setChecked, Boolean);

    const entry = Entries.findOne(entryId);
    // Check if user has authority to remove entry
    if (entry.private && task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Entries.update(entryId, { $set: {checked: setChecked} });
  }
});

export default Entries;
