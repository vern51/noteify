//Entries TEMPLATE
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var';
import { check } from 'meteor/check';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Tracker } from 'meteor/tracker';

//import { Entries } from '../../api/entries.js';

import './entries.html';
import './entry.html';
import './entry.js';

Template.Entries.created = function() {
  console.log("creating entries template");
  var self = this;
  self.autorun(function(){
    Meteor.subscribe('Entries');
  });
  console.log("Entries: " + Entries);
  /*let template = Template.instance();
  template.searchQuery = new ReactiveVar();
  template.searching   = new ReactiveVar( false );
  Meteor.subscribe('entries');*/
};

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

Template.Entries.helpers({
  entries: function() {
    return Entries.find({}, { sort: { dateCreated: -1 } });
  },
  currentUser: function() {
    return Meteor.userId();
  },
  searching: function() {
    return Template.instance().searching.get();
  },
  query: function() {
    return Template.instance().searchQuery.get();
  }
});

// Logic to properly handle user interaction
Template.Entries.events({
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
