import './Menu.html';
//import { Recipes } from '../../api/Recipes.js';
import { Template } from 'meteor/templating';
import { Entries } from '../../api/entries.js';

Template.Menu.onCreated(function() {
  var self = this;
  self.autorun(function(){
    self.subscribe('Entries');
  });
});

Template.Menu.helpers({
  entries: function() {
    return Entries.find({inMenu: true});
  }
});
