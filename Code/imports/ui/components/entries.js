//Entries TEMPLATE
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { ReactiveDict } from 'meteor/reactive-dict';
import { check } from 'meteor/check';
import { Template } from 'meteor/templating';

import { Entries } from '../../api/entries.js';

import './entries.html';
import './entry.html';
import './entry.js';
import './forms/new_entry.html';
import './forms/new_entry.js';

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

Template.entries.onCreated(function entriesOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('entries');
});

Template.entries.helpers({
  entries() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter entries appropriately
      return Entries.find({ checked: { $ne: true } }, { sort: { dateCreated: -1 } });
    }
    // Otherwise, return all entries
    return Entries.find({}, { sort: { dateCreated: -1 } });
  }
});

// Logic to properly handle user interaction
Template.entries.events({
  // create new entry from form event data
  'submit .new_entry'(event) {
    // prevent default browser form submit
    event.preventDefault();
    console.log("event: ", event);
    console.log("submitting ", target);

    // Get value from element
    const target = event.target;
    const title = target.text.value;
    const entry = target.object.value;
    //const entryType = target.entryType.value;
    check(title, String);
    // Insert an intry into Collection
    Meteor.call('entries.insert', title, entryType, entry);

    // clear form
    target.text.value = '';
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});

Meteor.methods({
  'insertEntry': function(doc) {
    console.log("inserting (ui/components): ", doc.title);

    Meteor.call('entries.insert', doc);
    return doc;
  },
});
