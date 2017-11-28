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
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});
