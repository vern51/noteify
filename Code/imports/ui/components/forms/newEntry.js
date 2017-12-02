//Entries TEMPLATE
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var';
import { check } from 'meteor/check';
import { Template } from 'meteor/templating';
import { underscore } from 'underscore';
import { Tracker } from 'meteor/tracker';
import { Random } from 'meteor/random';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
//import datetimepicker from 'meteor/drewy:autoform-datetimepicker'

import { Entries } from '../../../api/entries.js';
import '../../../api/entries.js'

import './newEntry.html';

// Initialize new_entry template
Template.newEntry.created = function () {
  console.log("Creating new entry form...");
  console.log("Type: " + type);
  this.state = new ReactiveDict();
  this.entryTypeValue = new ReactiveVar(type);
  Session.set("Type", type);
});

Template.newEntry.onRendered(function () {

});

/*Template.newEntry.onRendered(function newEntryOnRendered() {
//  this.entryTypeValue.set(AutoForm.getFieldValue('entryType'));
  console.log(this.entryType.value);
  //Meteor.subscribe('entries');
});*/

/*Template.new_entry.onRendered(function() {
  GoogleMaps.load({ key: 'AIzaSyDdZn2reLGeLVyQn0bJr3KFeNH0izT9ha8'});
});*/

// Implement helper methods for new_entry tempalte
Template.newEntry.helpers({
  Entries: function(){
    // This helper must be used by the new_entry template form to access
    //  Entries, else the Entries collection will be "out of the window scope"
    return Entries;
  },
  /*entryType() {
    //return Template.instance().entryType.get();
    console.log("Getting entry type...");
    console.log("Entry type (field value): " + AutoForm.getFieldValue('newEntry', 'entryType'));
    console.log("Entry type (reactive var): " + Template.instance().entryType.get());
    return AutoForm.getFieldValue('entryType');
  },*/
  IsNote: function() {
    console.log('IsNote() triggered...');
    //return FlowRouter.getParam('type') === 'note';
    console.log("Entry type (field value): " + AutoForm.getFieldValue("entryType"));
    console.log("Entry type (reactive var): " + Template.instance().entryType.get());
    String type = this.entryType.value;//Template.instance().entryTypeValue.get();
    return type === 'note';
    //return Session.equals("Type", "note");
    //return Template.instance().entryTypeValue.get() == 'note';//this.entryType.value == 'note';
    //return (Template.entryTypeValue.get() == 'note');
    //return AutoForm.getFieldValue("entryType") == 'note';
    //return Template.instance().entryType.get() == 'note';
  },
  IsTask: function() {
    console.log(AutoForm.getFieldValue('entryType'));
    return AutoForm.getFieldValue('entryType') == 'task';
  },
  IsEvent: function() {
    console.log(AutoForm.getFieldValue('entryType'));
    return AutoForm.getFieldValue('entryType') == 'event';
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
Template.newEntry.events({
  'change #entryType': function( event, template ) {
    console.log("Changing entry type: " + $( event.target.val()));
    console.log("Entry type (field value): " + AutoForm.getFieldValue('newEntry', 'entryType'));
    console.log("Entry type (reactive var): " + this.entryTypeValue.get());
    console.log("Entry type (template value): " + template.entryTypeValue.get());
    //template.entryTypeValue.set(event.target.val());
    if ( this.entryType.value === 'note') {//$( event.target ).val() === "note" ) {
      Session.set("Type", "note");
      template.entryTypeValue.set( 'note' );
      //Template.instance().entryTypeValue.set( "note" );
    } else if ( $( event.target ).val() === "event" )  {
      Session.set("Type", "event");
      template.entryTypeValue.set( "event" );
    } else if ( $( event.target ).val() === "task" )  {
      Session.set("Type", "task");
      template.entryTypeValue.set( "task" );
    } else { // Default to note if null, error, etc.
      //template.entryType.set( "note" );
    }
    //return template;
  }
});

AutoForm.hooks({
  newEntry: {
    before: {
      // I want the template instance or data context here like this
      insert: function(doc) {
        doc._id = Random.id();
        return doc;
      }
    }/*,
    after: {
      insert: function(doc) {
        //AutoForm.getValidationContext('new_entry').resetValidation();
        AutoForm.resetForm('newEntry');
      }
    }*/
  }
});
