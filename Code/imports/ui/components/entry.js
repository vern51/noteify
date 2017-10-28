import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './entry.html';

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
