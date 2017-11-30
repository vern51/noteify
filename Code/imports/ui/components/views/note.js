import './entry.js';

Template.note.onCreated(function noteOnCreated() {
  Meteor.subscribe('entries');
});
