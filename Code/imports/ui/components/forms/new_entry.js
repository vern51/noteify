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

import './new_entry.html';
import './new_note.html';
import './new_note.js';

// Initialize new_entry template
Template.new_entry.onCreated(function new_entryOnCreated() {
  this.state = new ReactiveDict();
  this.entryType = new ReactiveVar( "note" );
  Meteor.subscribe('entries');
});

// Implement helper methods for new_entry tempalte
Template.new_entry.helpers({
  Entries(){
    // This helper must be used by the new_entry template form to access
    //  Entries, else the Entries collection will be "out of the window scope"
    return Entries;
  },
  EntryType() {
    return Template.instance().entryType.get();
  }/*,
  Options() {
    return [
      {
        options: [
          {label: "Note", value: "note"},
          {label: "Event", value: "event"},
          {label: "Task", value: "task"}
        ]
      }
    ];
  }*/
});

// Implement Event Handlers for new_entry template
Template.new_entry.events({
  'change .entryType': function( event, template ) {
    if ( $( event.target ).val() === "note" ) {
      // Here we get our template instance from the template
      // argument in our event handler.
      template.entryType.set( "note" );
    } else if ( $( event.target ).val() === "event" )  {
      template.entryType.set( "event" );
    } else if ( $( event.target ).val() === "task" )  {
      template.entryType.set( "task" );
    } else { // Default to note if null, error, etc.
      template.entryType.set( "note" );
    }
  }
});

//Implement underscore.js functions
// documentation for all options at http://underscorejs.org/
Template.registerHelper('_', function(){
  return _;
});
