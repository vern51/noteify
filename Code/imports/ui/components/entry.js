import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Mongo } from 'meteor/mongo';
import { ReactiveDict } from 'meteor/reactive-dict';
import { check } from 'meteor/check';
import Entries from '../../api/entries.js';
import './entries.html';
import './entry.js';
import './entries.js';
import './entry.html';

/*Template.entry.onCreated(function entryOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('entries');
});*/

Template.entry.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.entry.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('entries.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('entries.remove', this._id);
  }
});
