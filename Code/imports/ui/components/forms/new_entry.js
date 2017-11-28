//Entries TEMPLATE
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var'
import { check } from 'meteor/check';
import { Template } from 'meteor/templating';
import { underscore } from 'underscore';
import { Tracker } from 'meteor/tracker';
import { Random } from 'meteor/random'
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
//import datetimepicker from 'meteor/drewy:autoform-datetimepicker'

import { Entries } from '../../../api/entries.js';

import './new_entry.html';

// Initialize new_entry template
Template.new_entry.onCreated(function new_entryOnCreated() {
  this.state = new ReactiveDict();
  this.entryType = new ReactiveVar( "note" );
  Meteor.subscribe('entries');
});

/*Template.new_entry.onRendered(function() {
  GoogleMaps.load({ key: 'AIzaSyDdZn2reLGeLVyQn0bJr3KFeNH0izT9ha8'});
});*/

// Implement helper methods for new_entry tempalte
Template.new_entry.helpers({
  Entries(){
    // This helper must be used by the new_entry template form to access
    //  Entries, else the Entries collection will be "out of the window scope"
    return Entries;
  },
  EntryType() {
    return Template.instance().entryType.get();
  },
  optsGoogleplace: function() {
    return {
      type: 'googleUI',
      stopTimeoutOnKeyup: false,
      googleOptions: {
         componentRestrictions: { country:'us' }
      }
    }
  }
});

// Implement Event Handlers for new_entry template
Template.new_entry.events({
  'change .entryType': function( event, template ) {
    if ( $( event.target ).val() === "note" ) {
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

AutoForm.hooks({
  new_entry: {
    before: {
      // I want the template instance or data context here like this
      insert: function(doc) {
        doc._id = Random.id();
        return doc;
      }
  }
}});
