import { Template } from 'meteor/templating';
import { Entries } from '../api/entries.js';
import './entry.html';

Template.entry.helpers({
  isOwner() {
    return this.owner() === Meteor.userId();
  },
});

Template.entry.events({
  'click .toggle-checked'() {
    // Set checked property to opposite of current value
    Meteor.call('entries.setChecked', this._id, !this.checked)
  },
  'click .delete'() {
    // remove entry
    Meteor.call('entries.remove', this._id);
  }
});
