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
import './forms/new_entry.html';
import './forms/new_entry.js';
import './forms/searchBox.html';
import './forms/searchBox.js';

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
    /*const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter entries appropriately
      return Entries.find({ checked: { $ne: true } }, { sort: { dateCreated: -1 } });
    }
    // Otherwise, return all entries
    return Entries.find({}, { sort: { dateCreated: -1 } });*/
    /*let entries = Entries.find();
    if ( entries ) {
      return entries;
    }*/
    let search = Template.instance().searchQuery.get();
    console.log("autorun searchQuery: " + search);
    console.log("userId: " + Meteor.userId());

    let query      = {},
        projection = { limit: 10, sort: { dateCreated: -1 } };

    if ( search ) {
      let regex = new RegExp( search, 'i' );
      console.log("setting up query...");
      query = {
        $or: [
          { userId: this.userId },
          { title: regex },
          { entryType: regex },
          { dateCreated: regex },
        ]
      };

      projection.limit = 100;
    }
    try {
      //throw new Meteor.Error('Publication error', 'api/entries.js')
      console.log("finding entries...");
      return Entries.find( query, projection );
    } catch (e) {
      console.log("Error finding entries...", e)
      //this.error(e)
    }
    /*try {
      //Meteor.subscribe('entries', Template.instance().searchQuery.get());

    } catch (e) {
      console.log("error subscribing...", e);
    }*/
  },
  currentUser() {
    return Meteor.userId();
  },
  searching() {
    return Template.instance().searching.get();
  },
  query() {
    return Template.instance().searchQuery.get();
  },
  entriesIndex: () => EntriesIndex,
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
