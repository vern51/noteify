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

import './newNote.html';

// Initialize newNote template
Template.newNote.created = function() {
  console.log("Creating new note form...");
  Meteor.subscribe('entries');
};

Template.newNote.rendered = function() {
  console.log("Rendering new note form...");
  Meteor.subscribe('entries');
}

// Implement helper methods for new_entry tempalte
Template.newNote.helpers({
  Entries: function() {
    // This helper must be used by the new_entry template form to access
    //  Entries, else the Entries collection will be "out of the window scope"
    return Entries;
  }
});

// Implement Event Handlers for new_entry template
Template.newNote.events({

});

AutoForm.hooks({
  newNote: {
    before: {
      // I want the template instance or data context here like this
      insert: function(doc) {
        console.log("inserting new note..." + doc.object);
        doc._id = Random.id();
        doc.entryType = 'note';
        return doc;
      }
    },
    after: {
      insert: function(doc) {
        //AutoForm.getValidationContext('newNote').resetValidation();
        AutoForm.resetForm('newNote');
        console.log("After Insert: Rerouting back to entries...");
        FlowRouter.go('/entries');
        return doc;
      }
    }
  }
});
