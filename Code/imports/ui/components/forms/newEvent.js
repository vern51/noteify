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
import '../../../startup/routes.js';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
//import datetimepicker from 'meteor/drewy:autoform-datetimepicker'

import { Entries } from '../../../api/entries.js';
import '../../../api/entries.js'

import './newEvent.html';

// Initialize newEvent template
Template.newEvent.created = function() {
  console.log("Creating new Event form...");
  Meteor.subscribe('entries');
};

Template.newEvent.rendered = function() {
  console.log("Rendering new Event form...");
  Meteor.subscribe('entries');
}

// Implement helper methods for new_entry tempalte
Template.newEvent.helpers({
  Entries: function() {
    // This helper must be used by the new_entry template form to access
    //  Entries, else the Entries collection will be "out of the window scope"
    return Entries;
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
Template.newEvent.events({

});

AutoForm.hooks({
  newEvent: {
    before: {
      // I want the template instance or data context here like this
      insert: function(doc) {
        console.log("inserting new Event..." + doc.object);
        doc._id = Random.id();
        doc.entryType = 'event';
        return doc;
      }
    },
    after: {
      insert: function(doc) {
        //AutoForm.getValidationContext('newEvent').resetValidation();
        AutoForm.resetForm('newEvent');
        console.log("After Insert: Rerouting back to entries...");
        FlowRouter.go('/entries');
        return doc;
      }
    }
  }
});
