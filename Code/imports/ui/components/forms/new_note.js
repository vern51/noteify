//Entries TEMPLATE
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var'
import { check } from 'meteor/check';
import { Template } from 'meteor/templating';
import { underscore } from 'underscore';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

import { Entries } from '../../../api/entries.js';
import { Notes } from '../../../api/notes.js';

import './new_note.html';

// Initialize new_entry template
Template.new_note.onCreated(function new_noteOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('entries');
  Meteor.subscribe('notes');
});

// Implement helper methods for new_entry tempalte
Template.new_note.helpers({
  Notes(){
    // This helper must be used by the new_entry template form to access
    //  Entries, else the Entries collection will be "out of the window scope"
    return Entries;
  }
});

// Implement Event Handlers for new_entry template
Template.new_note.events({
});

//Implement underscore.js functions
// documentation for all options at http://underscorejs.org/
Template.registerHelper('_', function(){
  return _;
});
