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

  let template = Template.instance();

  template.searchQuery = new ReactiveVar();
  template.searching   = new ReactiveVar( false );

  template.autorun( () => {
    console.log("autorun searchQuery: " + template.searchQuery.get());
    console.log("userId: " + Meteor.userId());
    try {
      console.log("Searching with query: " + template.searchQuery.get());
      Meteor.subscribe('Entries', template.searchQuery.get());
    } catch (e) {
      console.log("error subscribing...", e);
    }

   });

  //var self = this;
  /*self.autorun(function(){
    Meteor.subscribe('Entries');
  });*/
  //console.log("Entries: " + Entries);
  /*let template = Template.instance();
  template.searchQuery = new ReactiveVar();
  template.searching   = new ReactiveVar( false );
  Meteor.subscribe('entries');*/
};

Template.Entries.rendered = function() {

};

Template.Entries.helpers({
  entries: function() {
    //return Entries.find();
    let search = Template.instance().searchQuery.get();
    console.log("helper searchQuery: " + search);
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
    let value = event.target.value.trim();
    console.log("reading search input..." + value);

    if ( value !== '' && event.keyCode === 13 ) {
      template.searchQuery.set( value );
      template.searching.set( true );
    }

    if ( value === '' ) {
      template.searchQuery.set( value );
    }
  }
});
