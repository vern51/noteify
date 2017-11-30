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

Template.entry.onCreated(function entryOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('entries');
});

Template.entry.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
  isNote(type) {
    return type == 'note';
  },
  isTask(type) {
    return type == 'task';
  },
  isEvent(type) {
    return type == 'event';
  },
  entryType() {
    if (this.entryType === 'note') {
      return 'note';
    } else if (this.entryType === 'task') {
      return 'task';
    } else if (this.entryType === 'event') {
      return 'event';
    }
  },
  getMapUrl(location) {
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
  }
});
