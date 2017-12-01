// Meteor.subscribe('recipes');
import './NewRecipe.html';
import { Recipes } from '../../api/Recipes.js';

Template.RecipeSingle.onCreated(function() {
  var self = this;
  self.autorun(function(){
    var id = FlowRouter.getParam('id');
    self.subscribe('singleRecipe', id);
  });
});

Template.RecipeSingle.helpers({
  recipe: ()=> {
    var id = FlowRouter.getParam('id');
    return Recipes.findOne({_id: id});
  }
});
