import './Menu.html';
//import { Recipes } from '../../api/Recipes.js';
import { Template } from 'meteor/templating';
import { Entries } from '../../api/entries.js';

Template.Menu.onCreated(function() {
  var self = this;
  self.autorun(function(){
    self.subscribe('entries');
  });
});

Template.Menu.helpers({
  entries: ()=> {
    return Entries.find({inMenu: true});
  }
});
