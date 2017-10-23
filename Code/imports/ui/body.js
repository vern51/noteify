import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Entries } from '../api/entries.js';
import './body.html';
import './entry.js';

// Method to set up the body
// Like a constructor in OOP
Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('entries');
});

// This is a place to store helper methods for the body of the site
// Similar to abstract helper methods for an OOP class
Template.body.helpers({
  entries() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter entries appropriately
      return Entries.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all entries
    return Entries.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Entries.find({ checked: { $ne: true } }).count();
  },
});

// This is a place for logic to properly handle user interaction
Template.body.events({
  // create new entry from form event data
  'submit .new-entry'(event) {
    // prevent default browser form submit
    event.preventDefault();

    // Get value from element
    const target = event.target;
    const text = target.text.value;

    // Insert an intry into Collection
    Meteor.call('entries.insert', text);
/*    Entries.insert({
      name: text,
      createdAt: new Date(), // set to current time
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });*/

    // clear form
    target.text.value = '';
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});
