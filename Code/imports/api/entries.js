import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Entries = new Mongo.Collection('entries');

if (Meteor.isServer) {
  // Only runs on server
  Meteor.publish('entries', function entriesPublication() {
      return Entries.find({
        $or: [
          { private: { $ne: true } },
          { owner: this.userId },
        ],
      });
  });
}

Meteor.methods({
  'entries.insert'(text) {
    check(text, String);

    // Ensure user is logged in before inserting entry
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Entries.insert({
      name: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
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
  },
  'entries.setPrivate'(entryId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const entry = Entries.findOne(entryId);

    // Ensure only owner can make entry private
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(entryId, { $set: { private: setToPrivate} });
  },
});
