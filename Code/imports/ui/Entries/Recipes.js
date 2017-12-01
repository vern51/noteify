// Meteor.subscribe('recipes');
import './NewRecipe.html';
import { Recipes } from '../../api/Recipes.js';

Template.Recipes.onCreated(function() {
  var self = this;
  self.autorun(function(){
    self.subscribe('recipes');
  });
});

Template.Recipes.helpers({
  recipes: ()=> {
    return Recipes.find({});
  }
});
