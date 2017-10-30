//Entries TEMPLATE
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { ReactiveDict } from 'meteor/reactive-dict';
import { check } from 'meteor/check';
import { Template } from 'meteor/templating';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

import { Entries } from '../../../api/entries.js';

import './new_entry.html';

Template.new_entry.onCreated(function new_entryOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('entries');
});


Template.new_entry.helpers({
  Entries(){
    // This helper must be used by the new_entry template form to access
    //  Entries, else the Entries collection will be "out of the window scope"
    return Entries;
  }
});
