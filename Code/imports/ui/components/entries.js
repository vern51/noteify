//Entries TEMPLATE
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { ReactiveDict } from 'meteor/reactive-dict';
import { check } from 'meteor/check';
import { Template } from 'meteor/templating';

import Entries from '../../api/entries.js';

import './entries.html';


/*if (Meteor.isServer) {
  // Only runs on the server
  // Only publish tasks that belong to current user
  Meteor.publish('entries', function entriesPublication() {
    return Entries.find({
      $or: [
        { owner: this.userId },
      ],
    });
  });
}*/

Template.entries.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('entries');
});

Template.entries.helpers({
  entries() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter entries appropriately
      return Entries.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all entries
    return Entries.find({}, { sort: { createdAt: -1 } });
  }
});

// Logic to properly handle user interaction
Template.entries.events({
  // TODO: Handle event to add multiple input types
  // create new entry from form event data
  'submit .new-entry'(event) {
    // prevent default browser form submit
    event.preventDefault();
    console.log("event: ", event);
    console.log("submitting ", target);

    // Get value from element
    const target = event.target;
    const title = target.text.value;
    check(title, String);
    // Insert an intry into Collection
    Meteor.call('entries.insert', title);

    // clear form
    target.text.value = '';
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});


/*Meteor.methods({
  'entries.insert'(title) {
    check(title, String);
    console.log("inserting: ", title);
    // Make sure user is logged in before inserting entry
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Entries.insert({
      title,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'entries.remove'(entryId) {
    check(entryId, String);

    const entry = Entries.findOne(entryId);
    if (entries.owner !== this.userId) {
      // Ensure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Entries.remove(entryId);
  },
  'entries.setChecked'(entryId, setChecked) {
    check(entryId, String);
    check(setChecked, Boolean);

    const entry = Entries.findOne(entryId);
    if (entry.owner !== this.userId) {
      // If the entry is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Entrie.update(entryId, { $set: { checked: setChecked } });
  }
});*/
