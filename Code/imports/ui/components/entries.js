//Entries TEMPLATE
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var';
import { check } from 'meteor/check';
import { Template } from 'meteor/templating';

import { Entries } from '../../api/entries.js';

import './entries.html';
import './entry.html';
import './entry.js';
import './forms/newEntry.html';
//import './forms/newEntry.js';

Template.entries.onCreated(function entriesOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('entries');

  let template = Template.instance();
  template.searchQuery = new ReactiveVar();
  template.searching   = new ReactiveVar( false );
});

/*Template.entries.onRendered(function entriesOnRendered() {
  let template = Template.instance();

  template.searchQuery = new ReactiveVar();
  template.searching   = new ReactiveVar( false );

  template.autorun( () => {
    console.log("autorun searchQuery: " + template.searchQuery.get());
    console.log("userId: " + Meteor.userId());
    try {
      Meteor.subscribe('entries', template.searchQuery.get());
    } catch (e) {
      console.log("error subscribing...", e);
    }

   });
});*/

Template.entries.helpers({
  entries() {
    return Entries.find({}, { sort: { dateCreated: -1 } });
  },
  currentUser() {
    return Meteor.userId();
  },
  searching() {
    return Template.instance().searching.get();
  },
  query() {
    return Template.instance().searchQuery.get();
  }
});

// Logic to properly handle user interaction
Template.entries.events({
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
  'keyup [name="search"]' ( event, template ) {
    console.log("reading search input...");
    let value = event.target.value.trim();

    if ( value !== '' && event.keyCode === 13 ) {
      template.searchQuery.set( value );
      template.searching.set( true );
    }

    if ( value === '' ) {
      template.searchQuery.set( value );
    }
  }
});
