import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var';
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
  this.editing = new ReactiveVar( false );
  Meteor.subscribe('Entries');
};

Template.entry.helpers({
  getDate: function() {
    //return this.date.format('MMMM Do YYYY, h:mm:ss a')
  },
  edit: function() {
    return Template.instance().editing.get();
  },
  updateEntryId: function() {
    return this._id;
  },
  isOwner: function() {
    return this.userId === Meteor.userId();
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

Template.entry.events({
  'click .toggle-menu': function() {
    Meteor.call('toggleMenuItem', this._id, this.inMenu);
  },
  'click .fa-trash': function() {
    Meteor.call('entries.remove', this._id);
  },
  'click .fa-pencil': function() {
    Session.set('editMode', !Session.get('editMode'));
    //this.editing.set( !this.editing.get() ); //!Template.instance().editing.get()
  }
});
