import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import '../../startup/routes.js';
import '../components/entries.html';
//import '../../collections/entries.js'
import Entries from '../../collections/entries.js';
import Users from '../../collections/users.js';

import './body.html';




// Method to set up the body
// Like a constructor in OOP
Template.body.onCreated(function bodyOnCreated() {
  console.log("body template created");
  //Meteor.subscribe('users');
  //if (Meteor.userId() > 0) {
//console.log("showing entries...");
    //FlowRouter.go('Entries.show');
  //}
  //body.display();
});

// This is a place to store helper methods for the body of the site
// Similar to abstract helper methods for an OOP class
Template.Body.helpers({
  currentUser() {
    console.log("Userid: ", this.userId());
    return this.userId() === Meteor.userId();
  },
  'display': function() {
    console.log("display");
    //if (Meteor.userid()) {
      //console.log("user logged in, displaying entries...");
      FlowRouter.go('Entries.show');
    //}
  },
});

// This is a place for logic to properly handle user interaction
Template.Body.events({

});
