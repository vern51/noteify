import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';
import { ReactiveDict } from 'meteor/reactive-dict';
import { check } from 'meteor/check';

import { Entries } from '../../api/entries.js';
import { Note } from '../../api/entries.js';
import { Task } from '../../api/entries.js';
import { Event } from '../../api/entries.js';

import './entries.html';
import './entry.html';
import './views/note.html';
import './views/task.html';
import './views/event.html';

Template.entry.created = function() {
  this.state = new ReactiveDict();
  Meteor.subscribe('Entries');
};

Template.entry.helpers({
  updateEntryId: function() {
    return this._id;
  },
  isOwner: function() {
    return this.owner === Meteor.userId();
  },
  isNote: function(type) {
    return type == 'note';
  },
  isTask: function(type) {
    return type == 'task';
  },
  isEvent: function(type) {
    return type == 'event';
  },
  entryType: function() {
    if (this.entryType === 'note') {
      return 'note';
    } else if (this.entryType === 'task') {
      return 'task';
    } else if (this.entryType === 'event') {
      return 'event';
    }
  },
  getMapUrl: function(location) {
    if (location != null) {
      return "<a href=\"https://www.google.com/maps/?q=place_id:" + location.placeId +"\" target=\"_blank\">"
            + location.fullAddress + "</a>";
    } else {
      return "";
    }
  }
});

Template.entry.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('entries.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('entries.remove', this._id);
  },
  'click .toggle-menu': function() {
    Meteor.call('toggleMenuItem', this._id, this.inMenu);
  },
  'click .fa-trash': function() {
    Meteor.call('entries.remove', this._id);
  },
  'click .fa-pencil': function() {
    Session.set('editMode', !Session.get('editMode'));
  }
});
