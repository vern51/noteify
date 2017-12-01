import './Menu.html';
import { Recipes } from '../../api/Recipes.js';

Template.Menu.onCreated(function() {
  var self = this;
  self.autorun(function(){
    self.subscribe('recipes');
  });
});

Template.Menu.helpers({
  recipes: ()=> {
    return Recipes.find({inMenu: true});
  }
});
